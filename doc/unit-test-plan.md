# Unit Test Plan - Decomposed into Small Sets

**Goal:** Create comprehensive unit tests for all components and utilities  
**Approach:** Break into small, manageable sets (15-30 minutes each)

---

## 📦 Test Set 1: Utility Functions (Easiest - Start Here!)

**Estimated Time:** 30-45 minutes  
**File:** `src/lib/utils.test.ts`

### Tests to Write:
- [ ] **Set 1.1: `truncateText()` function**
  - [ ] Truncates text longer than maxLength
  - [ ] Returns original text if shorter than maxLength
  - [ ] Handles empty string
  - [ ] Handles null/undefined

- [ ] **Set 1.2: `getTodayFormatDate()` function**
  - [ ] Returns today's date in correct format (YYYY-MM-DD)
  - [ ] Returns string type
  - [ ] Format is consistent

- [ ] **Set 1.3: `getLastWeekFormatDate()` function**
  - [ ] Returns date 7 days ago
  - [ ] Returns correct format (YYYY-MM-DD)
  - [ ] Calculates correctly

**Why Start Here:** Simple functions, no React dependencies, builds confidence!

---

## 📦 Test Set 2: CreateLink Component - Basic Rendering

**Estimated Time:** 20-30 minutes  
**File:** `app/home/space/components/CreateLink/CreateLink.test.tsx`

### Tests to Write:
- [ ] **Set 2.1: Component Renders**
  - [ ] Renders form container
  - [ ] Renders URL input field
  - [ ] Renders description textarea
  - [ ] Renders group select dropdown
  - [ ] Renders validity period radio buttons
  - [ ] Renders submit and cancel buttons

- [ ] **Set 2.2: Form Fields Display**
  - [ ] URL input has correct placeholder
  - [ ] Description textarea has correct placeholder
  - [ ] Group select shows options from props
  - [ ] Default group is selected when provided

**Why This Set:** Basic rendering tests are straightforward, good warm-up!

---

## 📦 Test Set 3: CreateLink Component - Form Validation

**Estimated Time:** 30-40 minutes  
**File:** `app/home/space/components/CreateLink/CreateLink.test.tsx`

### Tests to Write:
- [ ] **Set 3.1: URL Validation**
  - [ ] Shows error when URL is empty
  - [ ] Shows error when URL doesn't start with http:// or https://
  - [ ] Accepts valid http:// URL
  - [ ] Accepts valid https:// URL
  - [ ] Shows error for invalid URL format
  - [ ] Shows error when exceeds max rows (100)

- [ ] **Set 3.2: Description Validation**
  - [ ] Shows error when description is empty
  - [ ] Shows error when exceeds max rows (100)
  - [ ] Accepts valid description
  - [ ] Shows row count correctly

- [ ] **Set 3.3: Group Selection Validation**
  - [ ] Shows error when no group selected
  - [ ] Accepts valid group selection

**Why This Set:** Validation is critical, test edge cases!

---

## 📦 Test Set 4: CreateLink Component - User Interactions

**Estimated Time:** 25-35 minutes  
**File:** `app/home/space/components/CreateLink/CreateLink.test.tsx`

### Tests to Write:
- [ ] **Set 4.1: Input Changes**
  - [ ] URL input updates value on change
  - [ ] Description textarea updates value on change
  - [ ] Group select updates value on change
  - [ ] Row count updates when URL changes
  - [ ] Row count updates when description changes

- [ ] **Set 4.2: Validity Period Toggle**
  - [ ] Default is "Permanent" (value 0)
  - [ ] Can switch to "Custom" (value 1)
  - [ ] Date picker appears when "Custom" selected
  - [ ] Date picker hidden when "Permanent" selected

- [ ] **Set 4.3: Date Picker**
  - [ ] Date picker renders when validDateType is 1
  - [ ] Past dates are disabled
  - [ ] Date shortcuts work (1 Day, 7 Days, 30 Days)
  - [ ] Selected date updates correctly

**Why This Set:** Tests user interactions, ensures UI works!

---

## 📦 Test Set 5: CreateLink Component - Auto-fetch Title

**Estimated Time:** 20-30 minutes  
**File:** `app/home/space/components/CreateLink/CreateLink.test.tsx`

### Tests to Write:
- [ ] **Set 5.1: Auto-fetch Behavior**
  - [ ] Fetches title when URL is valid and description is empty
  - [ ] Does NOT fetch if description already has value
  - [ ] Does NOT fetch if URL is invalid
  - [ ] Debounces API call (waits 1 second)

- [ ] **Set 5.2: Loading State**
  - [ ] Shows loading spinner while fetching
  - [ ] Hides loading spinner after fetch completes
  - [ ] Hides loading spinner on error

- [ ] **Set 5.3: API Integration**
  - [ ] Calls `queryTitle` API with correct URL
  - [ ] Updates description field with fetched title
  - [ ] Handles API errors gracefully (no error shown to user)

**Why This Set:** Tests async behavior and API integration!

---

## 📦 Test Set 6: CreateLink Component - Form Submission

**Estimated Time:** 30-40 minutes  
**File:** `app/home/space/components/CreateLink/CreateLink.test.tsx`

### Tests to Write:
- [ ] **Set 6.1: Successful Submission**
  - [ ] Calls `addSmallLink` API with correct data
  - [ ] Shows success message
  - [ ] Resets form after success
  - [ ] Calls `onSubmit` callback
  - [ ] Disables submit button during submission

- [ ] **Set 6.2: Error Handling**
  - [ ] Shows error message on API failure
  - [ ] Shows warning for specific error code (A000001)
  - [ ] Keeps form data on error (doesn't reset)
  - [ ] Re-enables submit button on error

- [ ] **Set 6.3: Form Data Structure**
  - [ ] Sends correct data format to API
  - [ ] Includes originUrl
  - [ ] Includes describe
  - [ ] Includes gid
  - [ ] Includes validDate when custom date selected
  - [ ] Includes validDateType
  - [ ] Formats date correctly (YYYY-MM-DD HH:mm:ss)

**Why This Set:** Critical for form functionality!

---

## 📦 Test Set 7: CreateLink Component - Cancel & Reset

**Estimated Time:** 15-20 minutes  
**File:** `app/home/space/components/CreateLink/CreateLink.test.tsx`

### Tests to Write:
- [ ] **Set 7.1: Cancel Button**
  - [ ] Calls `onCancel` callback when clicked
  - [ ] Resets form fields
  - [ ] Resets validity period to permanent

- [ ] **Set 7.2: Form Reset**
  - [ ] Resets all input fields
  - [ ] Resets group selection
  - [ ] Resets date picker
  - [ ] Resets row counts

**Why This Set:** Quick set, ensures cleanup works!

---

## 📦 Test Set 8: CreateLinks Component - Basic Rendering

**Estimated Time:** 20-30 minutes  
**File:** `app/home/space/components/CreateLinks/CreateLinks.test.tsx`

### Tests to Write:
- [ ] **Set 8.1: Component Renders**
  - [ ] Renders form container
  - [ ] Renders URLs textarea (not single input)
  - [ ] Renders descriptions textarea
  - [ ] Renders group select
  - [ ] Renders validity period options
  - [ ] Renders submit and cancel buttons

- [ ] **Set 8.2: Row Count Display**
  - [ ] Shows URL row count (e.g., "5/100")
  - [ ] Shows description row count (e.g., "5/100")
  - [ ] Updates when URLs change
  - [ ] Updates when descriptions change

**Why This Set:** Similar to CreateLink, but batch version!

---

## 📦 Test Set 9: CreateLinks Component - Validation

**Estimated Time:** 30-40 minutes  
**File:** `app/home/space/components/CreateLinks/CreateLinks.test.tsx`

### Tests to Write:
- [ ] **Set 9.1: URL Validation**
  - [ ] Shows error when URLs are empty
  - [ ] Validates each URL line
  - [ ] Shows error for invalid URLs
  - [ ] Shows error when exceeds 100 rows
  - [ ] Accepts multiple valid URLs (one per line)

- [ ] **Set 9.2: Description Validation**
  - [ ] Shows error when descriptions are empty
  - [ ] Shows error when description count doesn't match URL count
  - [ ] Shows error for empty lines in descriptions
  - [ ] Shows error when exceeds 100 rows
  - [ ] Accepts matching count of descriptions

- [ ] **Set 9.3: Row Count Matching**
  - [ ] Validates URL rows match description rows
  - [ ] Shows specific error message when counts don't match
  - [ ] Accepts when counts match

**Why This Set:** Batch validation is more complex, needs thorough testing!

---

## 📦 Test Set 10: CreateLinks Component - Submission & Download

**Estimated Time:** 30-40 minutes  
**File:** `app/home/space/components/CreateLinks/CreateLinks.test.tsx`

### Tests to Write:
- [ ] **Set 10.1: Form Submission**
  - [ ] Converts URLs string to array
  - [ ] Converts descriptions string to array
  - [ ] Calls `addLinks` API with correct data structure
  - [ ] Handles ArrayBuffer response

- [ ] **Set 10.2: Excel Download**
  - [ ] Triggers download when API succeeds
  - [ ] Creates blob with correct MIME type
  - [ ] Extracts filename from Content-Disposition header
  - [ ] Creates download link and clicks it
  - [ ] Cleans up download link after click

- [ ] **Set 10.3: Success Handling**
  - [ ] Shows success message
  - [ ] Resets form after success
  - [ ] Calls `onSubmit` callback
  - [ ] Handles download errors gracefully

**Why This Set:** Excel download is unique feature, needs special testing!

---

## 📦 Test Set 11: EditLink Component - Pre-fill & Rendering

**Estimated Time:** 25-35 minutes  
**File:** `app/home/space/components/EditLink/EditLink.test.tsx`

### Tests to Write:
- [ ] **Set 11.1: Form Pre-filling**
  - [ ] Pre-fills URL from editData
  - [ ] Pre-fills description from editData
  - [ ] Pre-fills group selection from editData
  - [ ] Pre-fills validity period from editData
  - [ ] Pre-fills date picker when validDate exists
  - [ ] Calculates initial row counts

- [ ] **Set 11.2: Component Renders**
  - [ ] Renders all form fields
  - [ ] Shows pre-filled values
  - [ ] Renders date picker if validDateType is 1
  - [ ] Hides date picker if validDateType is 0

**Why This Set:** Pre-filling is key feature of EditLink!

---

## 📦 Test Set 12: EditLink Component - Update Functionality

**Estimated Time:** 30-40 minutes  
**File:** `app/home/space/components/EditLink/EditLink.test.tsx`

### Tests to Write:
- [ ] **Set 12.1: Form Updates**
  - [ ] Allows editing URL
  - [ ] Allows editing description
  - [ ] Allows changing group
  - [ ] Allows changing validity period
  - [ ] Allows changing date

- [ ] **Set 12.2: API Submission**
  - [ ] Calls `editSmallLink` API with correct data
  - [ ] Includes id from editData
  - [ ] Includes fullShortUrl from editData
  - [ ] Includes originGid (original group ID)
  - [ ] Shows success message on success
  - [ ] Calls `onSubmit` and `onUpdatePage` callbacks

- [ ] **Set 12.3: Error Handling**
  - [ ] Shows error message on API failure
  - [ ] Handles validation errors
  - [ ] Keeps form data on error

**Why This Set:** Update functionality is core feature!

---

## 📦 Test Set 13: ChartsInfo Component - Modal & Tabs

**Estimated Time:** 25-35 minutes  
**File:** `app/home/space/components/ChartsInfo/ChartsInfo.test.tsx`

### Tests to Write:
- [ ] **Set 13.1: Modal Display**
  - [ ] Modal opens when `isVisible()` called
  - [ ] Modal closes when `unVisible()` called
  - [ ] Modal shows correct title
  - [ ] Modal renders tabs (访问数据, 历史记录)

- [ ] **Set 13.2: Tab Navigation**
  - [ ] Default tab is "访问数据"
  - [ ] Can switch to "历史记录" tab
  - [ ] Tab content changes when switching

- [ ] **Set 13.3: Date Range Picker**
  - [ ] Renders date range picker
  - [ ] Default range is last week to today
  - [ ] Date shortcuts work (Today, Yesterday, Last 7 Days, Last 30 Days)
  - [ ] Calls `onChangeTime` when date changes

**Why This Set:** Modal and tabs are UI foundation!

---

## 📦 Test Set 14: ChartsInfo Component - Charts Display

**Estimated Time:** 30-40 minutes  
**File:** `app/home/space/components/ChartsInfo/ChartsInfo.test.tsx`

### Tests to Write:
- [ ] **Set 14.1: Chart Components Render**
  - [ ] Renders BarChart when data provided
  - [ ] Renders LineChart when data provided
  - [ ] Renders ProgressLine components
  - [ ] Renders ProgressPie components
  - [ ] Renders KeyValue components

- [ ] **Set 14.2: Data Transformation**
  - [ ] Transforms API data for BarChart
  - [ ] Transforms API data for LineChart
  - [ ] Transforms API data for ProgressLine
  - [ ] Transforms API data for ProgressPie
  - [ ] Handles missing data gracefully

- [ ] **Set 14.3: Group vs Single Link**
  - [ ] Shows different charts for group analytics
  - [ ] Shows different charts for single link analytics
  - [ ] Hides/shows components based on isGroup prop

**Why This Set:** Charts are complex, need thorough testing!

---

## 📦 Test Set 15: ChartsInfo Component - Access Logs Table

**Estimated Time:** 25-35 minutes  
**File:** `app/home/space/components/ChartsInfo/ChartsInfo.test.tsx`

### Tests to Write:
- [ ] **Set 15.1: Table Display**
  - [ ] Renders access logs table
  - [ ] Shows table columns correctly
  - [ ] Displays data from tableInfo prop
  - [ ] Handles empty table

- [ ] **Set 15.2: Pagination**
  - [ ] Renders pagination component
  - [ ] Shows correct current page
  - [ ] Shows correct page size
  - [ ] Shows correct total count
  - [ ] Calls `onChangePage` when page changes
  - [ ] Calls `onChangePage` when page size changes

**Why This Set:** Table and pagination are important features!

---

## 📦 Test Set 16: Auth Utilities

**Estimated Time:** 20-30 minutes  
**File:** `src/lib/auth.test.ts`

### Tests to Write:
- [ ] **Set 16.1: Token Management**
  - [ ] `setToken()` stores token in localStorage
  - [ ] `getToken()` retrieves token from localStorage
  - [ ] `getToken()` returns null when no token
  - [ ] Token persists across function calls

- [ ] **Set 16.2: Username Management**
  - [ ] `getUsername()` retrieves username
  - [ ] `getUsername()` returns null when no username
  - [ ] Username stored correctly

- [ ] **Set 16.3: Token Removal**
  - [ ] `removeToken()` removes token from localStorage
  - [ ] Token is cleared correctly

**Why This Set:** Auth utilities are critical, simple to test!

---

## 📊 Summary: Test Sets Overview

| Set # | Component/Feature | Tests | Time | Difficulty |
|-------|------------------|-------|------|------------|
| 1 | Utility Functions | 8-10 | 30-45 min | ⭐ Easy |
| 2 | CreateLink - Rendering | 6-8 | 20-30 min | ⭐ Easy |
| 3 | CreateLink - Validation | 9-12 | 30-40 min | ⭐⭐ Medium |
| 4 | CreateLink - Interactions | 8-10 | 25-35 min | ⭐⭐ Medium |
| 5 | CreateLink - Auto-fetch | 6-8 | 20-30 min | ⭐⭐ Medium |
| 6 | CreateLink - Submission | 9-12 | 30-40 min | ⭐⭐⭐ Hard |
| 7 | CreateLink - Cancel | 4-6 | 15-20 min | ⭐ Easy |
| 8 | CreateLinks - Rendering | 6-8 | 20-30 min | ⭐ Easy |
| 9 | CreateLinks - Validation | 9-12 | 30-40 min | ⭐⭐ Medium |
| 10 | CreateLinks - Download | 6-8 | 30-40 min | ⭐⭐⭐ Hard |
| 11 | EditLink - Pre-fill | 6-8 | 25-35 min | ⭐⭐ Medium |
| 12 | EditLink - Update | 9-12 | 30-40 min | ⭐⭐ Medium |
| 13 | ChartsInfo - Modal | 8-10 | 25-35 min | ⭐⭐ Medium |
| 14 | ChartsInfo - Charts | 9-12 | 30-40 min | ⭐⭐⭐ Hard |
| 15 | ChartsInfo - Table | 6-8 | 25-35 min | ⭐⭐ Medium |
| 16 | Auth Utilities | 6-8 | 20-30 min | ⭐ Easy |

**Total Estimated Time:** 6-8 hours  
**Total Test Cases:** ~120-150 tests

---

## 🎯 Recommended Order

### Morning (Start Easy):
1. **Set 1** - Utility Functions (builds confidence)
2. **Set 2** - CreateLink Rendering (warm-up)
3. **Set 7** - CreateLink Cancel (quick win)
4. **Set 16** - Auth Utilities (simple)

### Afternoon (Medium Complexity):
5. **Set 3** - CreateLink Validation
6. **Set 4** - CreateLink Interactions
7. **Set 5** - CreateLink Auto-fetch
8. **Set 8** - CreateLinks Rendering

### Later (More Complex):
9. **Set 6** - CreateLink Submission
10. **Set 9** - CreateLinks Validation
11. **Set 10** - CreateLinks Download
12. **Set 11** - EditLink Pre-fill
13. **Set 12** - EditLink Update
14. **Set 13** - ChartsInfo Modal
15. **Set 15** - ChartsInfo Table
16. **Set 14** - ChartsInfo Charts (most complex, save for last)

---

## 💡 Tips for Each Set

1. **Start with Set 1** - Easiest, no React, builds momentum
2. **Copy QRCode.test.tsx pattern** - Use as template
3. **Test one thing at a time** - Don't try to test everything in one test
4. **Mock API calls** - Use `jest.mock()` for API functions
5. **Use `data-testid`** - All components have them ready!
6. **Run tests frequently** - `npm test -- --watch`

---

## ✅ Completion Checklist

After each set:
- [ ] All tests pass
- [ ] Tests are readable and well-named
- [ ] Mocks are properly set up
- [ ] Edge cases covered
- [ ] Run `npm test` to verify

---

**Ready to start! Begin with Set 1 (Utility Functions) - it's the easiest! 🚀**
