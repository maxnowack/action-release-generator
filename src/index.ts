import * as core from '@actions/core'
import * as github from '@actions/github'
import getLatestRelease from 'src/getLatestRelease'
import createRelease from './createRelease'
import octokit from './octokit'

const { repo, owner } = github.context.repo

async function getBaseBranch() {
  const branch = core.getInput('branch', { required: false, trimWhitespace: true })
  if (branch) return branch
  const { data: { default_branch: defaultBranch } } = await octokit.repos.get({ repo, owner })
  return defaultBranch
}

async function promoteVersion() {
  const latestRelease = await getLatestRelease(owner, repo)
  const baseBranch = await getBaseBranch()
  const { data: { object: { sha: masterSha } } } = await octokit.git.getRef({
    repo, owner, ref: `heads/${baseBranch}`,
  })

  if (latestRelease) {
    const { data: { object: { sha: releaseSha } } } = await octokit.git.getRef({ repo, owner, ref: `tags/${latestRelease}` })

    if (masterSha === releaseSha) {
      const msg = `No changes for a new release of ${repo} available`
      console.log(msg)
      return msg
    }
  }

  return createRelease(masterSha, owner, repo, baseBranch).then(({ newVersion, commits }) => {
    const msg = `Released ${newVersion} of ${repo} (${commits.length} commits)`
    console.log(msg)
    return msg
  })
}

promoteVersion().catch((err: Error) => {
  core.setFailed(err)
})
