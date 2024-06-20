import fs from 'fs'
import { execSync } from 'child_process'

// List of branches to skip
const branchesToSkip = ['master', 'main', 'develop', 'staging', 'test']

// Get the current branch name
const branchName = execSync('git symbolic-ref --short HEAD').toString().trim()

// Check if the branch is in the skip list
if (branchesToSkip.includes(branchName)) {
  process.exit(0) // Exit without making changes
}

// Extract the ticket ID from the branch name
const ticketMatch = branchName.match(/CU-([a-zA-Z0-9]{4,})/)
const ticketId = ticketMatch ? ticketMatch[1] : null

// If no ticket ID is found, exit without making changes
if (!ticketId) {
  process.exit(0)
}

// Path to the commit message file
const commitMsgFile = process.argv[2]

// Read the commit message
const commitMsg = fs.readFileSync(commitMsgFile, 'utf8')

// Prepend the ticket ID to the commit message
const newCommitMsg = `[${ticketId}] ${commitMsg}`

// Write the new commit message back to the file
fs.writeFileSync(commitMsgFile, newCommitMsg)
