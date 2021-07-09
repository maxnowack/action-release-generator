import { format } from 'date-fns'
import { AsyncReturnType } from './utils/typescript'
import octokit from './octokit'
import getLatestRelease from './getLatestRelease'

const parseVersion = (version: string) => {
  const matches = /v([0-9]+)\.([0-9]+)\.([0-9]+)/.exec(version)
  if (!matches) throw new Error(`Cannot parse version '${version}'`)
  const year = parseInt(matches[1], 10)
  const month = parseInt(matches[2], 10)
  const num = parseInt(matches[3], 10)

  return { year, month, num }
}

const incrementVersion = (version: string) => {
  const parsedVersion = parseVersion(version)
  const year = parseInt(format(new Date(), 'YY'), 10)
  const month = parseInt(format(new Date(), 'M'), 10)

  const num = parsedVersion.year === year && parsedVersion.month === month
    ? parsedVersion.num + 1
    : 0

  return `v${year}.${month}.${num}`
}

const badwords = (msg: string) => {
  const str = msg.toLowerCase()
  const words = [
    'updated translation',
    'merge branch',
    'merge pull request',
    'linting',
  ]
  return words.reduce((failed, word) => failed || str.indexOf(word) >= 0, false)
}

type Commits = AsyncReturnType<typeof octokit.repos.compareCommitsWithBasehead>['data']['commits']
const getReleaseNotes = (commits: Commits) => commits
  .filter(commit => !badwords(commit.commit.message))
  .map(commit => `* ${commit.sha} ${commit.commit.message.split('\n')[0]}`).join('\r\n')

const createRelease = async (target = 'master', owner: string, repo: string) => {
  const latestRelease = await getLatestRelease(owner, repo)
  if (!latestRelease) throw new Error('Cannot find previous release')
  const newVersion = incrementVersion(latestRelease)

  const { data: { commits } } = await octokit.repos.compareCommitsWithBasehead({
    owner,
    repo,
    basehead: `${latestRelease}...master`,
  })

  if (!commits.length) return { commits }
  const releaseNotes = getReleaseNotes(commits)
  await octokit.repos.createRelease({
    owner,
    repo,
    tag_name: newVersion,
    target_commitish: target,
    name: newVersion,
    body: releaseNotes,
  })
  return {
    newVersion,
    commits,
  }
}

export default createRelease
