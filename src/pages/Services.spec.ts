import { vi, describe, it, expect, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import Services from '@/pages/Services.vue'
import servicesData from '../../mocks/services'
import { createTestRouter } from '@/utils/test-utils'

// Mock the API service
vi.mock('@/services/api/services.api', () => ({
  getServices: vi.fn(),
}))

import { getServices } from '@/services/api/services.api'

describe('Services page', () => {
  let router: ReturnType<typeof createTestRouter>

  beforeEach(() => {
    // Create a fresh pinia instance and router for each test
    setActivePinia(createPinia())
    router = createTestRouter()
    vi.clearAllMocks()
  })

  it('shows the search input', async () => {
    vi.mocked(getServices).mockResolvedValueOnce(servicesData as any)

    const wrapper = mount(Services, {
      global: {
        plugins: [router],
        stubs: {
          KInput: true,
          KButton: true,
          KEmptyState: true,
          KPagination: true,
          KModal: true,
          KBadge: true,
          ServiceCard: true,
          ServiceCardSkelton: true,
          ServiceDetailsModal: true,
        },
      },
    })

    // Wait for component to mount and potentially fetch
    await flushPromises()

    expect(wrapper.find('[data-testid="search-input"]').exists()).toBe(true)
  })

  it('properly handles no services returned from the API', async () => {
    vi.mocked(getServices).mockResolvedValueOnce([])

    const wrapper = mount(Services, {
      global: {
        plugins: [router],
        stubs: {
          KInput: true,
          KButton: true,
          KEmptyState: true,
          KPagination: true,
          KModal: true,
          KBadge: true,
          ServiceCard: true,
          ServiceCardSkelton: true,
          ServiceDetailsModal: true,
        },
      },
    })

    // Wait for the store to update
    await flushPromises()

    expect(wrapper.find('[data-testid="no-results"]').exists()).toBe(true)
  })
})
