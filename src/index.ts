import * as core from '@actions/core'
import * as github from '@actions/github'
import getLatestRelease from './getLatestRelease'
import createRelease from './createRelease'
import octokit from './octokit'

const { repo, owner } = github.context.repo

async function getDefaultBranch() {
  const { data: { default_branch: defaultBranch } } = await octokit.repos.get({ repo, owner })
  return defaultBranch
}

function getBaseBranch() {
  const branch = core.getInput('branch', { required: false, trimWhitespace: true })
  if (!branch) return undefined
  return branch
}

function getRef() {
  const ref = core.getInput('ref', { required: false, trimWhitespace: true })
  if (!ref) return undefined
  return ref.replace('refs/', '')
}

function getUseNameFromRef() {
  const useNameFromRef = core.getInput('useNameFromRef', { required: false, trimWhitespace: true })
  return Boolean(useNameFromRef)
}

async function promoteVersion() {
  const latestRelease = await getLatestRelease(owner, repo)
  const defaultBranch = await getDefaultBranch()
  const baseBranch = getBaseBranch() || defaultBranch
  const ref = getRef() || `heads/${baseBranch}`
  const useNameFromRef = getUseNameFromRef()

  const { data: { object: { sha: masterSha } } } = await octokit.git.getRef({
    repo, owner, ref,
  })

  if (latestRelease) {
    const { data: { object: { sha: releaseSha } } } = await octokit.git.getRef({ repo, owner, ref: `tags/${latestRelease}` })

    if (masterSha === releaseSha) {
      const msg = `No changes for a new release of ${repo} available`
      console.log(msg)
      return msg
    }
  }

  return createRelease({
    target: masterSha,
    ref,
    owner,
    repo,
    baseBranch,
    useNameFromRef,
  }).then(({ newVersion, commits }) => {
    const msg = `Released ${newVersion} of ${repo} (${commits.length} commits)`
    console.log(msg)
    return msg
  })
}

promoteVersion().catch((err: Error) => {
  core.setFailed(err)
})
