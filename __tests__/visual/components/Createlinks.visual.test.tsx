/// <reference types="jest" />
import React from 'react'
import CreateLinks from '@/app/home/space/components/CreateLinks/CreateLinks'
import { renderComponentToImage, initBrowser, closeBrowser, renderComponentToImageSimple } from '../helpers/render-to-image'
import { mockGroups } from '../helpers/mock-data'

/**
 * Visual Regression Tests for CreateLinks Component.
 * 
 * These tests capture visual snapshots of the CreateLinks component 
 * (batch link creation) in different states and compare them against baseline images. 
*/

describe('CreateLinks Visual Regression', () => { 
    beforeAll(async () => { 
        await initBrowser()
    })

    afterAll(async () => { 
        await closeBrowser()
    })

    it('renders default batch form correctly', async () => {
        // here we create component instance 
        const component = (
            <CreateLinks
                groupInfo={ mockGroups }
                onSubmit={ jest.fn() }
                onCancel={ jest.fn() }
            />
        )

        // here we invoke render function render component into object
        // then convert the object into image 
        const image = await renderComponentToImage(component, {
            width: 900,
            height: 700,
        })

        expect(image).toMatchImageSnapshot({
            customSnapshotIdentifier: 'CreateLinks-default',
            failureThreshold: 0.01,
            failureThresholdType: 'percent'
        })
    })

    it('renders with default group selected', async () => {
        const component = (
        <CreateLinks
            groupInfo={mockGroups}
            defaultGid="group1"
            onSubmit={jest.fn()}
            onCancel={jest.fn()}
        />
        )

        const image = await renderComponentToImage(component, {
        width: 900,
        height: 700,
        })

        expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: 'CreateLinks-with-default-group',
        failureThreshold: 0.01,
        failureThresholdType: 'percent',
        })
    })
})