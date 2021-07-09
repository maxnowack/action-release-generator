import core from '@actions/core'
import github from '@actions/github'

const token = core.getInput('repo_token', { required: true })
const octokit = github.getOctokit(token).rest

export default octokit
