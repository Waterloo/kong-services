import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { usePagination } from './usePagination'

describe('usePagination', () => {
  it('should paginate items correctly', () => {
    const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const { paginatedItems, currentPage, totalPages } = usePagination(items, {
      pageSize: 3,
    })

    expect(paginatedItems.value).toEqual([1, 2, 3])
    expect(currentPage.value).toBe(1)
    expect(totalPages.value).toBe(4)
  })

  it('should navigate to next page', () => {
    const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const { paginatedItems, setPage } = usePagination(items, { pageSize: 3 })

    setPage(2)
    expect(paginatedItems.value).toEqual([4, 5, 6])
  })

  it('should not navigate beyond total pages', () => {
    const items = ref([1, 2, 3, 4, 5])
    const { currentPage, setPage, totalPages } = usePagination(items, { pageSize: 3 })

    setPage(10)
    expect(currentPage.value).toBe(1) // Should stay on page 1
    expect(totalPages.value).toBe(2)
  })

  it('should reset to page 1', () => {
    const items = ref([1, 2, 3, 4, 5, 6])
    const { currentPage, setPage, resetPagination } = usePagination(items, { pageSize: 2 })

    setPage(3)
    expect(currentPage.value).toBe(3)

    resetPagination()
    expect(currentPage.value).toBe(1)
  })

  it('should calculate total count correctly', () => {
    const items = ref([1, 2, 3, 4, 5])
    const { totalCount } = usePagination(items, { pageSize: 2 })

    expect(totalCount.value).toBe(5)
  })

  it('should reset to first page when items count decreases below current page', async () => {
    const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9])
    const { currentPage, setPage } = usePagination(items, { pageSize: 3 })

    setPage(3) // Go to page 3
    expect(currentPage.value).toBe(3)

    // Reduce items so page 3 no longer exists
    items.value = [1, 2, 3]

    // Wait for Vue's reactivity to process
    await new Promise(resolve => setTimeout(resolve, 0))

    // Should auto-reset to page 1
    expect(currentPage.value).toBe(1)
  })

  it('should handle empty items array', () => {
    const items = ref<number[]>([])
    const { paginatedItems, totalCount, totalPages } = usePagination(items, { pageSize: 3 })

    expect(paginatedItems.value).toEqual([])
    expect(totalCount.value).toBe(0)
    expect(totalPages.value).toBe(0)
  })

  it('should use custom initial page', () => {
    const items = ref([1, 2, 3, 4, 5, 6])
    const { currentPage, paginatedItems } = usePagination(items, {
      pageSize: 2,
      initialPage: 2,
    })

    expect(currentPage.value).toBe(2)
    expect(paginatedItems.value).toEqual([3, 4])
  })
})
