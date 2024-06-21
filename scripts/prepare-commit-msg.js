#!/usr/bin/env node

import childProcess from 'child_process'
import fs from 'fs'
import path from 'path'

const scriptName = 'prepare-commit-msg'

const excludedBranches = ['main', 'master', 'develop', 'staging', 'test']

const pathToHead = (folder) => path.resolve(path.join(folder, '.git', 'HEAD'))
const pathToParentFolder = (folder) => path.resolve(path.join(folder, '..'))
const isRepositoryRoot = (folder) => fs.existsSync(pathToHead(folder))

let repositoryRoot = process.cwd()
while (!isRepositoryRoot(repositoryRoot)) {
  const parent = pathToParentFolder(repositoryRoot)
  if (parent == repositoryRoot) {
    console.error(`${scriptName} was unable to find the root of the Git repository.`)
    process.exit(1)
  }
  repositoryRoot = parent
}

const head = fs.readFileSync(pathToHead(repositoryRoot)).toString()
const branchNameMatch = head.match(/^ref: refs\/heads\/(.*)/)
if (!branchNameMatch) process.exit()

const branchName = branchNameMatch[1]
if (!branchName) process.exit()

// Check if the branch name is in the excluded list
if (excludedBranches.includes(branchName)) process.exit()

const identifierMatch = branchName.match(/CU-([a-zA-Z0-9]{4,})/)
if (!identifierMatch) process.exit()

const identifier = identifierMatch[0]
if (!identifier) process.exit()

const commitMessageFile = process.argv[2]
if (!commitMessageFile) {
  console.error(`${scriptName} requires the name of the file containing the commit log message as first argument.`)
  process.exit(1)
}

const pathToCommitMessageFile = path.resolve(path.join(repositoryRoot, commitMessageFile))
if (!fs.existsSync(pathToCommitMessageFile)) {
  console.error(`${pathToCommitMessageFile} is not a file.`)
  process.exit(1)
}

const content = fs.readFileSync(pathToCommitMessageFile).toString()
if (content.indexOf(identifier) === -1) fs.writeFileSync(pathToCommitMessageFile, `${content.trim()} (${identifier})`)
