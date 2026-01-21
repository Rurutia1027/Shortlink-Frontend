#!/usr/bin/env node

/**
 * Baseline Tagging Script
 * 
 * Tag current baseline snapshots with a version
 * Usage: npm run baseline:tag -- v1.0-alpha
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

function tagBaseline(version) {
  if (!version) {
    console.error('❌ Error: Version required')
    console.error('Usage: npm run baseline:tag -- v1.0-alpha')
    process.exit(1)
  }

  const tagName = `${version}-baseline`
  
  console.log(`\n🏷️  Tagging baseline: ${tagName}\n`)
  
  // Check if snapshots exist
  const snapshotsDir = path.join(__dirname, '../__tests__/__image_snapshots__')
  if (!fs.existsSync(snapshotsDir)) {
    console.error('❌ Error: No baseline snapshots found')
    console.error('   Generate baselines first: npm run baseline:generate')
    process.exit(1)
  }
  
  // Count snapshots
  const snapshotCount = countSnapshots(snapshotsDir)
  console.log(`📊 Found ${snapshotCount} baseline snapshots`)
  
  // Create tag
  const tagMessage = `Visual baseline for ${version} release

Total Snapshots: ${snapshotCount}
Date: ${new Date().toISOString().split('T')[0]}

Generated from: ${process.cwd()}
`
  
  try {
    execSync(`git tag -a ${tagName} -m "${tagMessage}"`, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    })
    
    console.log(`\n✅ Baseline tagged: ${tagName}`)
    console.log(`\n📋 Next: Push tag to remote`)
    console.log(`   git push origin ${tagName}`)
  } catch (error) {
    console.error(`\n❌ Error creating tag`)
    console.error(`   Tag might already exist. Use -f to force update.`)
    process.exit(1)
  }
}

function countSnapshots(dir) {
  let count = 0
  const files = fs.readdirSync(dir, { recursive: true })
  for (const file of files) {
    if (file.endsWith('.png')) {
      count++
    }
  }
  return count
}

// Parse version from command line
const version = process.argv[2]
tagBaseline(version)
