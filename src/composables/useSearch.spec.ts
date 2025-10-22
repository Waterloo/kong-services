import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useSearch } from './useSearch'
import type { Service } from '@/types/models/services'

describe('useSearch', () => {
  const mockServices = ref<Service[]>([
    {
      id: '1',
      name: 'Payment API',
      description: 'Handle payment processing',
      type: 'REST',
      published: true,
      configured: true,
      versions: [],
      metrics: { latency: 45, uptime: 99.9, requests: 1200, errors: 0.1 },
    },
    {
      id: '2',
      name: 'Authentication Service',
      description: 'User authentication and authorization',
      type: 'REST',
      published: true,
      configured: true,
      versions: [],
      metrics: { latency: 30, uptime: 99.99, requests: 5000, errors: 0.01 },
    },
    {
      id: '3',
      name: 'Payment Gateway',
      description: 'Gateway for payment transactions',
      type: 'REST',
      published: true,
      configured: true,
      versions: [],
      metrics: { latency: 50, uptime: 99.8, requests: 800, errors: 0.2 },
    },
  ] as Service[])

  it('should return all items when query is empty', () => {
    const query = ref('')
    const { results } = useSearch(mockServices, query)

    expect(results.value).toEqual(mockServices.value)
  })

  it('should filter items based on search query', () => {
    const query = ref('payment')
    const { results } = useSearch(mockServices, query)

    expect(results.value.length).toBe(2)
    expect(results.value.some(s => s.name === 'Payment API')).toBe(true)
    expect(results.value.some(s => s.name === 'Payment Gateway')).toBe(true)
  })

  it('should search by name field', () => {
    const query = ref('Authentication')
    const { results } = useSearch(mockServices, query)

    expect(results.value.length).toBe(1)
    expect(results.value[0].name).toBe('Authentication Service')
  })

  it('should indicate when searching', () => {
    const query = ref('')
    const { isSearching } = useSearch(mockServices, query)

    expect(isSearching.value).toBe(false)

    query.value = 'test'
    expect(isSearching.value).toBe(true)
  })

  it('should handle empty items array', () => {
    const emptyItems = ref<Service[]>([])
    const query = ref('test')
    const { results } = useSearch(emptyItems, query)

    expect(results.value).toEqual([])
  })

  it('should update search index when items change', async () => {
    const items = ref<Service[]>([
      {
        id: '1',
        name: 'Test Service',
        description: 'A test service',
        type: 'REST',
        published: true,
        configured: true,
        versions: [],
        metrics: { latency: 45, uptime: 99.9, requests: 1200, errors: 0.1 },
      } as Service,
    ])
    const query = ref('')
    const { results } = useSearch(items, query)

    // Initially only one item
    expect(results.value.length).toBe(1)

    // Add more items
    items.value = [
      ...items.value,
      {
        id: '2',
        name: 'Another Service',
        description: 'Another test',
        type: 'REST',
        published: true,
        configured: true,
        versions: [],
        metrics: { latency: 30, uptime: 99.99, requests: 5000, errors: 0.01 },
      } as Service,
    ]

    // Wait for Vue's reactivity and watch to trigger
    await new Promise(resolve => setTimeout(resolve, 0))

    // Without search query, should return all items
    expect(results.value.length).toBe(2)

    // Now search
    query.value = 'Another'
    expect(results.value.length).toBe(1)
    expect(results.value[0].name).toBe('Another Service')
  })

  it('should use centralized search service configuration', () => {
    // This test verifies that the composable uses the search service
    // which has threshold and keys configured
    const query = ref('auth')
    const { results, isSearching } = useSearch(mockServices, query)

    expect(isSearching.value).toBe(true)
    expect(results.value.length).toBe(1)
    expect(results.value[0].name).toBe('Authentication Service')
  })

  it('should trim whitespace from query', () => {
    const query = ref('  payment  ')
    const { results, isSearching } = useSearch(mockServices, query)

    expect(isSearching.value).toBe(true)
    expect(results.value.length).toBeGreaterThan(0)
    expect(results.value.some(s => s.name.includes('Payment'))).toBe(true)
  })
})
