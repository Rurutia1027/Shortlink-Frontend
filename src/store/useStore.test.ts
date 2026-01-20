/// <reference types="jest" />
import { renderHook, act } from "@testing-library/react";
import { useStore, useDomain, useUI, useUser, useGroups, useModals } from './useStore'; 
import type { User, Group } from '@/src/api/types'; 
import { stat } from "fs";

describe('useStore Hook', () => { 
    beforeEach(() => { 
        // Reset store to initial state before each test 
        const store = useStore.getState()
        store.setDomain('shortlink.tus')
        store.setSidebarOpen(true)
        store.setUser(null)
        store.setGroups([])
        store.setSelectedGroupId(null)
        // Reset modals
        Object.keys(store.modals).forEach((item) => { 
            store.closeModal(item)
        })
    })


  // ============================================
  // Domain State
  // ============================================

    describe('Domain State', () => { 
        it('has default domain value', () => { 
            const { result } = renderHook(() => useStore((state) => state.domain))
            expect(result.current).toBe('shortlink.tus')
        })

        it('sets domain correctly', () => { 
            const { result } = renderHook(() => useStore((state) => state.setDomain))

            act(() => { 
                result.current('new-domain.com')
            })

            const domainResult = renderHook(() => useStore((state) => state.domain))
            expect(domainResult.result.current).toBe('new-domain.com')
        })

        it('useDomain selector returns domain and setDomain', () => { 
            const { result } = renderHook(() => useDomain())
            expect(result.current.domain).toBe('shortlink.tus')
            expect(typeof result.current.setDomain).toBe('function')

            act(() => { 
                result.current.setDomain('custom-domain.com')
            })

            expect(result.current.domain).toBe('custom-domain.com')
        })
    })

    // ============================================
    // UI State (Sidebar)
    // ============================================
    describe('UI State', () => { 
        it('has default sidebarOpen value', () => { 
            const { result } = renderHook(() => useStore((state) => state.sidebarOpen))
            expect(result.current).toBe(true)
        })

        it('sets sidebarOpen correctly', () => { 
            const { result } = renderHook(() => useStore((state) => state.setSidebarOpen))

            act(() => { 
                result.current(false)
            })

            const sidebarResult = renderHook(() => useStore((state) => state.sidebarOpen))
            expect(sidebarResult.result.current).toBe(false)
        })

        it('toggles sidebar correctly', () => { 
            const { result } = renderHook(() => useStore((state) => state.toggleSidebar))

            // initial state is true 
            let sidebarState = renderHook(() => useStore((state) => state.sidebarOpen))
            expect(sidebarState.result.current).toBe(true)

            act(() => { 
                result.current()
            })

            sidebarState = renderHook(() => useStore((state) => state.sidebarOpen))
            expect(sidebarState.result.current).toBe(false)

            act(() => { 
                result.current()
            })

            sidebarState = renderHook(() => useStore((state) => state.sidebarOpen))
            expect(sidebarState.result.current).toBe(true)
        })

        it('useUI selector returns UI state and functions', () => {
            const { result } = renderHook(() => useUI())

            expect(result.current.sidebarOpen).toBe(true)
            expect(typeof result.current.setSidebarOpen).toBe('function')
            expect(typeof result.current.toggleSidebar).toBe('function')
        })
    })


})