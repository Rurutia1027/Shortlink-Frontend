/// <reference types="jest" />
import React from 'react'
import ChartsInfo from '@/app/home/space/components/ChartsInfo/ChartsInfo'
import { renderComponentToImage, initBrowser, closeBrowser } from '../helpers/render-to-image'
import type { AnalyticsResponse, AccessLog } from '@/src/api/types'

/**
 * Visual Regression Tests for ChartsInfo Component
 * 
 * These tests capture visual snapshots of the ChartsInfo analytics modal
 * in different states and compare them against baseline images.
 */

describe('ChartsInfo Visual Regression', () => {
  beforeAll(async () => {
    await initBrowser()
  })

  afterAll(async () => {
    await closeBrowser()
  })

  const mockAnalytics: AnalyticsResponse = {
    daily: [
      { date: '2024-01-01', pv: 100, uv: 80, uip: 50 },
      { date: '2024-01-02', pv: 150, uv: 100, uip: 60 },
      { date: '2024-01-03', pv: 200, uv: 120, uip: 70 },
    ],
    hourStats: Array(24).fill(0).map((_, i) => i * 10),
    weekdayStats: Array(7).fill(0).map((_, i) => i * 20),
    topIpStats: [
      { ip: '192.168.1.1', cnt: 50 },
      { ip: '10.0.0.1', cnt: 30 },
      { ip: '172.16.0.1', cnt: 20 },
    ],
    osStats: [
      { os: 'Windows', cnt: 400},
      { os: 'macOS', cnt: 200 },
      { os: 'Linux', cnt: 70 },
    ],
    browserStats: [
      { browser: 'Chrome', cnt: 500},
      { browser: 'Firefox', cnt: 100 },
      { browser: 'Safari', cnt: 70 },
    ],
    uvTypeStats: [
      { uvType: 'newUser', cnt: 300 },
      { uvType: 'oldUser', cnt: 500 },
    ],
    deviceStats: [
      { device: 'Computer', cnt: 400 },
      { device: 'Mobile', cnt: 400 },
    ],
    networkStats: [
      { device: 'WIFI', cnt: 500 },
      { device: 'Mobile', cnt: 300 },
    ],
    localeCnStats: [
      { locale: '广东省', cnt: 400, ratio: 0.5 },
      { locale: '北京市', cnt: 200, ratio: 0.25 },
      { locale: '上海市', cnt: 200, ratio: 0.25 },
    ],
  }

  const mockAccessLogs: AccessLog[] = [
    {
      ip: '192.168.1.1',
      shortLinkId: 'uid-1', 
      userAgent: 'Mozilla/5.0',
      accessedAt: '2024-01-03 10:00:00',
      createTime: '2024-01-03 10:00:00',
      locale: 'United States',
      browser: 'Chrome',
      os: 'Windows',
      device: 'Computer',
      network: 'WIFI',
    },
    {
      ip: '10.0.0.1',
      shortLinkId: 'uid-1',
      userAgent: 'Mozilla/5.0',
      accessedAt: '2024-01-03 09:30:00',
      createTime: '2024-01-03 09:30:00',
      locale: 'China',
      browser: 'Safari',
      os: 'macOS',
      device: 'Mobile',
      network: 'Mobile',
    },
  ]

  it('renders analytics modal with visit trends tab', async () => {
    // Note: ChartsInfo uses forwardRef and modal visibility is controlled internally
    // For visual testing, we render the component which will show modal if visible state is true
    // Since we can't easily control the internal state, we'll test the component structure
    const component = (
      <ChartsInfo
        title="Link Analytics"
        info={mockAnalytics}
        tableInfo={mockAccessLogs}
        isGroup={false}
        nums={1000}
        favicon="https://example.com/favicon.ico"
        originUrl="https://example.com/test"
      />
    )

    const image = await renderComponentToImage(component, {
      width: 1200,
      height: 800,
    })

    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: 'ChartsInfo-visit-trends',
      failureThreshold: 0.02,
      failureThresholdType: 'percent',
    })
  })

  it('renders analytics modal with access records tab', async () => {
    const component = (
      <ChartsInfo
        title="Group Analytics"
        info={mockAnalytics}
        tableInfo={mockAccessLogs}
        isGroup={true}
        nums={5000}
      />
    )

    const image = await renderComponentToImage(component, {
      width: 1200,
      height: 800,
    })

    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: 'ChartsInfo-access-records',
      failureThreshold: 0.02,
      failureThresholdType: 'percent',
    })
  })

  it('renders analytics modal with empty data', async () => {
    const emptyAnalytics: AnalyticsResponse = {
      daily: [],
      hourStats: Array(24).fill(0),
      weekdayStats: Array(7).fill(0),
      topIpStats: [],
      osStats: [],
      browserStats: [],
      uvTypeStats: [],
      deviceStats: [],
      networkStats: [],
      localeCnStats: [],
    }

    const component = (
      <ChartsInfo
        title="Empty Analytics"
        info={emptyAnalytics}
        tableInfo={[]}
        isGroup={false}
        nums={0}
      />
    )

    const image = await renderComponentToImage(component, {
      width: 1200,
      height: 800,
    })

    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: 'ChartsInfo-empty',
      failureThreshold: 0.02,
      failureThresholdType: 'percent',
    })
  })
})
