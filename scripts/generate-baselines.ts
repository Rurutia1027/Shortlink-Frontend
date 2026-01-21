#!/usr/bin/env node

/**
 * Batch Baseline Generation Script
 * 
 * Generate all visual regression baselines at once
 * Perfect for initial/alpha version release
 * 
 * Usage: npm run baseline:generate:all
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

console.log('🚀 Starting batch baseline generation...\n')

// Check if visual tests exist
const visualTestDir = path.join(process.cwd(), '__tests__/visual')
if (!fs.existsSync(visualTestDir)) {
  console.error('❌ Error: Visual tests directory not found')
  console.error('   Create visual tests first in __tests__/visual/')
  process.exit(1)
}

// Generate all baselines
console.log('📸 Generating all visual baselines...')
try {
  execSync('npm run test:visual:update', { stdio: 'inherit' })
  console.log('\n✅ All baselines generated successfully!')
} catch (error) {
  console.error('\n❌ Error generating baselines')
  process.exit(1)
}

// Check generated snapshots
const snapshotsDir = path.join(process.cwd(), '__tests__/__image_snapshots__')
if (fs.existsSync(snapshotsDir)) {
  const snapshotCount = countSnapshots(snapshotsDir)
  console.log(`\n📊 Generated ${snapshotCount} baseline snapshots`)
  console.log(`   Location: __tests__/__image_snapshots__/`)
} else {
  console.warn('\n⚠️  Warning: No snapshots directory found')
}

console.log('\n📋 Next Steps:')
console.log('   1. Review generated snapshots')
console.log('   2. Verify baseline quality')
console.log('   3. Commit baselines: git add __tests__/__image_snapshots__/')
console.log('   4. Tag baseline version: git tag -a v1.0-alpha-baseline')

function countSnapshots(dir: string): number {
  let count = 0
  const files = fs.readdirSync(dir, { recursive: true })
  for (const file of files) {
    if (typeof file === 'string' && file.endsWith('.png')) {
      count++
    }
  }
  return count
}
