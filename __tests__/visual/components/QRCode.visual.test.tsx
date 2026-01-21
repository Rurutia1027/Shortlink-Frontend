/// <reference types="jest" />
import React from 'react'
import QRCode from '@/app/home/space/components/QRCode/QRCode'
import { renderComponentToImage, initBrowser, closeBrowser } from '../helpers/render-to-image'

/**
 * Visual Regression Tests for QRCode Component
 * 
 * These tests capture visual snapshots of the QRCode modal component
 * in different states and compare them against baseline images.
 */

describe('QRCode Visual Regression', () => {
    beforeAll(async () => {
        await initBrowser()
    })

    afterAll(async () => {
        await closeBrowser()
    })

    it('renders QR code modal correctly', async () => {
        const component = (
        <QRCode
            url="https://example.com/test-url"
            visible={true}
            onClose={jest.fn()}
        />
        )

        const image = await renderComponentToImage(component, {
        width: 500,
        height: 500,
        usePortal: true,
        })

        expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: 'QRCode-modal-open',
        failureThreshold: 0.01,
        failureThresholdType: 'percent',
        })
    })

    it('renders QR code with custom size', async () => {
        const component = (
        <QRCode
            url="https://shortlink.tus/abc123"
            visible={true}
            onClose={jest.fn()}
            size={300}
        />
        )

        const image = await renderComponentToImage(component, {
        width: 600,
        height: 600,
        usePortal: true,
        })

        expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: 'QRCode-modal-large',
        failureThreshold: 0.01,
        failureThresholdType: 'percent',
        })
    })

    it('renders QR code with long URL', async () => {
        const longUrl = 'https://example.com/very/long/url/path/that/might/wrap/in/the/modal'
        const component = (
        <QRCode
            url={longUrl}
            visible={true}
            onClose={jest.fn()}
        />
        )

        const image = await renderComponentToImage(component, {
        width: 500,
        height: 600,
        usePortal: true,
        })

        expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: 'QRCode-long-url',
        failureThreshold: 0.01,
        failureThresholdType: 'percent',
        })
    })
})
