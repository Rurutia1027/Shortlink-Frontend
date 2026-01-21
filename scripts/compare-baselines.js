#!/usr/bin/env node

/**
 * Baseline Comparison Script
 * 
 * Compare visual baselines across different versions
 * Usage: npm run baseline:compare -- v1.0 v1.1 latest
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

function getAllSnapshots(dir) {
  if (!fs.existsSync(dir)) {
    return []
  }
  
  const snapshots = []
  const files = fs.readdirSync(dir, { recursive: true })
  
  for (const file of files) {
    if (file.endsWith('.png')) {
      snapshots.push(file)
    }
  }
  
  return snapshots
}

function compareVersions(version1, version2) {
  console.log(`\n🔍 Comparing baselines: ${version1} vs ${version2}\n`)
  
  const baseline1Dir = path.join(__dirname, '../__tests__/__image_snapshots__')
  const baseline2Dir = path.join(__dirname, '../__tests__/__image_snapshots__')
  
  // Checkout version 1 if not latest
  if (version1 !== 'latest') {
    console.log(`📥 Checking out ${version1} baseline...`)
    try {
      execSync(`git checkout ${version1}-baseline -- __tests__/__image_snapshots__/`, {
        stdio: 'inherit',
        cwd: path.join(__dirname, '..'),
      })
    } catch (error) {
      console.error(`❌ Error: Tag ${version1}-baseline not found`)
      console.error(`   Create baseline tag first: git tag -a ${version1}-baseline`)
      process.exit(1)
    }
  }
  
  // Get snapshots from version 1
  const snapshots1 = getAllSnapshots(baseline1Dir)
  
  // Checkout version 2 if not latest
  if (version2 !== 'latest') {
    console.log(`📥 Checking out ${version2} baseline...`)
    try {
      execSync(`git checkout ${version2}-baseline -- __tests__/__image_snapshots__/`, {
        stdio: 'inherit',
        cwd: path.join(__dirname, '..'),
      })
    } catch (error) {
      console.error(`❌ Error: Tag ${version2}-baseline not found`)
      console.error(`   Create baseline tag first: git tag -a ${version2}-baseline`)
      process.exit(1)
    }
  } else {
    // Generate latest baselines
    console.log(`📸 Generating latest baselines...`)
    execSync('npm run test:visual:update', {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    })
  }
  
  // Get snapshots from version 2
  const snapshots2 = getAllSnapshots(baseline2Dir)
  
  // Compare
  console.log(`\n📊 Comparison Results:`)
  console.log(`   ${version1}: ${snapshots1.length} snapshots`)
  console.log(`   ${version2}: ${snapshots2.length} snapshots`)
  
  const common = snapshots1.filter(s => snapshots2.includes(s))
  const onlyV1 = snapshots1.filter(s => !snapshots2.includes(s))
  const onlyV2 = snapshots2.filter(s => !snapshots1.includes(s))
  
  console.log(`\n   ✅ Common snapshots: ${common.length}`)
  if (onlyV1.length > 0) {
    console.log(`   ⚠️  Only in ${version1}: ${onlyV1.length}`)
    onlyV1.slice(0, 5).forEach(s => console.log(`      - ${s}`))
  }
  if (onlyV2.length > 0) {
    console.log(`   ⚠️  Only in ${version2}: ${onlyV2.length}`)
    onlyV2.slice(0, 5).forEach(s => console.log(`      - ${s}`))
  }
  
  console.log(`\n✅ Comparison complete!`)
}

// Parse command line arguments
const versions = process.argv.slice(2)

if (versions.length < 2) {
  console.error('Usage: npm run baseline:compare -- v1.0 v1.1 latest')
  console.error('Example: npm run baseline:compare -- v1.0 latest')
  process.exit(1)
}

const [version1, version2] = versions
compareVersions(version1, version2)
