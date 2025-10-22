import { computed, ref, watch, type Ref } from 'vue'

export interface UsePaginationOptions {
  pageSize?: number
  initialPage?: number
}

export interface UsePaginationReturn<T> {
  paginatedItems: Ref<T[]>
  currentPage: Ref<number>
  pageSize: Ref<number>
  totalCount: Ref<number>
  totalPages: Ref<number>
  setPage: (page: number) => void
  resetPagination: () => void
}

/**
 * Generic pagination composable for client-side pagination
 * @param items - Ref containing the array of items to paginate
 * @param options - Configuration options for pagination
 * @returns Pagination state and controls
 */
export function usePagination<T>(
  items: Ref<T[]>,
  options: UsePaginationOptions = {},
): UsePaginationReturn<T> {
  const { pageSize: defaultPageSize = 10, initialPage = 1 } = options

  const currentPage = ref<number>(initialPage)
  const pageSize = ref<number>(defaultPageSize)

  const totalCount = computed(() => items.value.length)

  const totalPages = computed(() => Math.ceil(totalCount.value / pageSize.value))

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return items.value.slice(start, end)
  })

  function setPage(page: number): void {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  function resetPagination(): void {
    currentPage.value = 1
  }

  // Reset to first page when items change (e.g., after search)
  watch(
    () => items.value.length,
    () => {
      if (currentPage.value > totalPages.value && totalPages.value > 0) {
        currentPage.value = 1
      }
    },
  )

  return {
    paginatedItems,
    currentPage,
    pageSize,
    totalCount,
    totalPages,
    setPage,
    resetPagination,
  }
}
