/// <reference types="jest" />
import React from 'react'
import dayjs from 'dayjs'
import EditLink from '@/app/home/space/components/EditLink/EditLink'
import { renderComponentToImage, initBrowser, closeBrowser } from '../helpers/render-to-image'
import { mockGroups, mockShortLink } from '../helpers/mock-data'

/**
 * Visual Regression Tests for EditLink Component 
 * 
 * These tests capture visual snapshots of the EditLink component 
 * in different states and compare them against baseline images. 
*/

describe('EditLink Visual Regression', () => {
    beforeAll(async () => {
        await initBrowser()
    })

    afterAll(async () => { 
        await closeBrowser()
    })

    it('renders default edit form correctly', async () => { 
        const component = (
            <EditLink
                groupInfo={ mockGroups }
                editData={ mockShortLink }
                onSubmit={ jest.fn() }
                onCancel={ jest.fn() }
            />
        )

        const image = await renderComponentToImage(component, {
            width: 900, 
            height: 700, 
        })

        expect(image).toMatchImageSnapshot({
            customSnapshotIdentifier: 'EditLink-default',
            failureThreshold: 0.01, 
            failureThresholdType: 'percent', 
        })
    })
    
    it('renders with custom date selected', async () => {
        // Create editData with custom date
        const editDataWithDate = {
        ...mockShortLink,
        validDateType: 1, // Custom date
        validDate: dayjs().add(7, 'days').format('YYYY-MM-DD'),
        }

        const component = (
        <EditLink
            groupInfo={mockGroups}
            editData={editDataWithDate}
            onSubmit={jest.fn()}
            onCancel={jest.fn()}
        />
        )

        const image = await renderComponentToImage(component, {
        width: 900,
        height: 700,
        })

        expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: 'EditLink-with-date',
        failureThreshold: 0.01,
        failureThresholdType: 'percent',
        })
    })
})

