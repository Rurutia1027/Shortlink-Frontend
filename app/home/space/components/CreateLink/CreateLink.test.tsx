/// <reference types="jest" />
import { render, screen } from '@testing-library/react'
import CreateLink from './CreateLink'
import { addSmallLink, queryTitle } from '@/src/api'
import type { Group } from '@/src/api/types'

// Mock API functions 
jest.mock('@/src/api', () => ({ 
    addSmallLink: jest.fn(),
    queryTitle: jest.fn()
}))

// Mock Ant Design message 
jest.mock('antd', () => { 
    const antd = jest.requireActual('antd')
    return {
        ...antd,
        message: {
            success: jest.fn(),
            error: jest.fn(),
            warning: jest.fn()
        }
    }
})

// Mock dayjs to have consistent dates in tests
jest.mock('dayjs', () => { 
    const originalDayjs = jest.requireActual('dayjs')
    return originalDayjs
})

describe('CreateLink Component - Basic Rendering', () => { 
    const mockGroups: Group[] = [
        { gid: 'group1', name: 'Group 1', title: 'Group 1'}, 
        { gid: 'group2', name: 'Group 2', title: 'Group 2'},
        { gid: 'group3', name: 'Group 3', title: 'Group 3'}
    ]

    const mockOnSubmit = jest.fn()
    const mockOnCancel = jest.fn()

    beforeEach(() => { 
        jest.clearAllMocks()
            ; (addSmallLink as jest.Mock).mockResolvedValue({
                data: {
                    success: true
                },
            }
            )
            ; (queryTitle as jest.Mock).mockRejectedValue({
                data: {
                    data: 'Mocked Title'
                }, 
            })
    })

    // ============================================
    // Set 2.1: Component Renders
    // ============================================
    describe('Set 2.1: Component Renders', () => { 
        it('renders form container', () => { 
            render(<CreateLink groupInfo={ mockGroups } />)
            const formContainer = screen.getByTestId('component-create-link')
            expect(formContainer).toBeInTheDocument()
        })

        it('renders URL input field', () => { 
            render(<CreateLink groupInfo={ mockGroups } />)
            const urlInput = screen.getByTestId('input-origin-url')
            expect(urlInput).toBeInTheDocument()
        })

        it('renders description textarea', () => { 
            render(<CreateLink groupInfo={ mockGroups } />)
            const descriptionTextarea = screen.getByTestId('textarea-describe')
            expect(descriptionTextarea).toBeInTheDocument
        })

        it('renders group select dropdown', () => { 
            render(<CreateLink groupInfo={ mockGroups } />)
            const groupSelect = screen.getByTestId('select-group')
            expect(groupSelect).toBeInTheDocument()
        })

        it('renders validity period radio buttons', () => { 
            render(<CreateLink groupInfo={ mockGroups } />)
            const radioGroup = screen.getByTestId('radio-valid-date-type')
            expect(radioGroup).toBeInTheDocument()

            // Check for both radio options
        })
    })
})

