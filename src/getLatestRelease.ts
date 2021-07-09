import octokit from './octokit'

export default async function getLatestRelease(owner: string, repo: string) {
  try {
    const {
      data: { tag_name: latestRelease },
    } = await octokit.repos.getLatestRelease({ repo, owner })

    return latestRelease
  } catch (e) {
    return undefined
  }
}
