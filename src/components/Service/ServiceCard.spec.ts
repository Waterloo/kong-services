import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ServiceCard from './ServiceCard.vue'
import type { Service } from '@/types/models/services'

describe('ServiceCard', () => {
  // Factory function to create test services with sensible defaults
  const createMockService = (overrides: Partial<Service> = {}): Service => ({
    id: 'test-service-1',
    name: 'Test Service',
    description: 'Test Description',
    type: 'REST',
    published: true,
    configured: true,
    versions: [
      {
        id: 'version-1',
        name: '1.0.0',
        description: 'Initial version',
        developer: {
          id: 'dev-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://example.com/avatar1.jpg',
        },
        updated_at: new Date('2024-01-01').toISOString(),
      },
    ],
    metrics: {
      latency: 0.5,
      uptime: 99.5,
      requests: 1000000,
      errors: 0.05,
    },
    ...overrides,
  })

  describe('Snapshot Tests', () => {
    it('matches snapshot for configured published service', () => {
      const service = createMockService({
        published: true,
        configured: true,
      })
      const wrapper = mount(ServiceCard, {
        props: { service },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('matches snapshot for unconfigured service', () => {
      const service = createMockService({ configured: false, metrics: undefined })
      const wrapper = mount(ServiceCard, {
        props: { service },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('matches snapshot for unpublished service', () => {
      const service = createMockService({ published: false })
      const wrapper = mount(ServiceCard, {
        props: { service },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })
  })


  describe('Status Configuration', () => {
    it('shows published status for published and configured service', () => {
      const service = createMockService({ published: true, configured: true })
      const wrapper = mount(ServiceCard, {
        props: { service },
      })

      expect(wrapper.text()).toContain('Published to portal')
    })

    it('shows unpublished status for configured but unpublished service', () => {
      const service = createMockService({
        published: false,
        configured: true,
      })
      const wrapper = mount(ServiceCard, {
        props: { service },
      })

      expect(wrapper.text()).toContain('Unpublished')
    })

    it('shows not configured status for non-configured service', () => {
      const service = createMockService({ configured: false })
      const wrapper = mount(ServiceCard, {
        props: { service },
      })

      expect(wrapper.text()).toContain('Not configured with runtime yet')
    })
  })

  describe('Metrics Display', () => {
    it('displays metrics when service is configured', () => {
      const service = createMockService({
        configured: true,
        metrics: {
          latency: 0.45,
          uptime: 99.87,
          requests: 5432100,
          errors: 0.12,
        },
      })
      const wrapper = mount(ServiceCard, {
        props: { service },
      })

      // Check that metrics are rendered (values will be formatted)
      expect(wrapper.html()).toContain('0.45') // latency
      expect(wrapper.html()).toContain('99.87%') // uptime
      expect(wrapper.html()).toContain('0.12%') // errors
    })

    it('does not display metrics when service is not configured', () => {
      const service = createMockService({
        configured: false,
        metrics: undefined,
      })
      const wrapper = mount(ServiceCard, {
        props: { service },
      })

      expect(wrapper.find('.metrics').exists()).toBe(false)
      expect(wrapper.find('.not-configured-message').exists()).toBe(true)
    })

    it('formats large request numbers correctly', () => {
      const service = createMockService({
        configured: true,
        metrics: {
          latency: 0.5,
          uptime: 99.5,
          requests: 1234567,
          errors: 0.5,
        },
      })
      const wrapper = mount(ServiceCard, {
        props: { service },
      })

      // Number should be formatted in compact notation (e.g., "1.2M" or "1M")
      const text = wrapper.text()
      expect(text).toMatch(/1\.2M|1M/)
    })
  })

  describe('Avatar Computation Logic', () => {
    it('shows all avatars when 2 or fewer developers', () => {
      const service = createMockService({
        versions: [
          {
            id: 'v1',
            name: '1.0.0',
            description: 'Version 1',
            developer: {
              id: 'd1',
              name: 'Dev 1',
              email: 'dev1@example.com',
              avatar: 'avatar1.jpg',
            },
            updated_at: new Date().toISOString(),
          },
          {
            id: 'v2',
            name: '2.0.0',
            description: 'Version 2',
            developer: {
              id: 'd2',
              name: 'Dev 2',
              email: 'dev2@example.com',
              avatar: 'avatar2.jpg',
            },
            updated_at: new Date().toISOString(),
          },
        ],
      })
      const wrapper = mount(ServiceCard, {
        props: { service },
      })

      const avatars = wrapper.findAll('.avatar')
      expect(avatars).toHaveLength(2)
    })

    it('shows +N indicator with 2 avatars when more than 2 developers', () => {
      const service = createMockService({
        versions: [
          {
            id: 'v1',
            name: '1.0.0',
            description: 'V1',
            developer: {
              id: 'd1',
              name: 'Dev 1',
              email: 'd1@example.com',
              avatar: 'avatar1.jpg',
            },
            updated_at: new Date().toISOString(),
          },
          {
            id: 'v2',
            name: '2.0.0',
            description: 'V2',
            developer: {
              id: 'd2',
              name: 'Dev 2',
              email: 'd2@example.com',
              avatar: 'avatar2.jpg',
            },
            updated_at: new Date().toISOString(),
          },
          {
            id: 'v3',
            name: '3.0.0',
            description: 'V3',
            developer: {
              id: 'd3',
              name: 'Dev 3',
              email: 'd3@example.com',
              avatar: 'avatar3.jpg',
            },
            updated_at: new Date().toISOString(),
          },
          {
            id: 'v4',
            name: '4.0.0',
            description: 'V4',
            developer: {
              id: 'd4',
              name: 'Dev 4',
              email: 'd4@example.com',
              avatar: 'avatar4.jpg',
            },
            updated_at: new Date().toISOString(),
          },
        ],
      })
      const wrapper = mount(ServiceCard, {
        props: { service },
      })

      const avatars = wrapper.findAll('.avatar')
      // Should show 3 avatars: +2 indicator, and first 2 developer avatars
      expect(avatars).toHaveLength(3)

      // First avatar should be the "+2" indicator
      expect(avatars[0].text()).toBe('+2')
    })

    it('deduplicates developer avatars across versions', () => {
      const service = createMockService({
        versions: [
          {
            id: 'v1',
            name: '1.0.0',
            description: 'V1',
            developer: {
              id: 'd1',
              name: 'Same Dev',
              email: 'dev@example.com',
              avatar: 'same-avatar.jpg',
            },
            updated_at: new Date().toISOString(),
          },
          {
            id: 'v2',
            name: '2.0.0',
            description: 'V2',
            developer: {
              id: 'd1',
              name: 'Same Dev',
              email: 'dev@example.com',
              avatar: 'same-avatar.jpg', // Same avatar
            },
            updated_at: new Date().toISOString(),
          },
          {
            id: 'v3',
            name: '3.0.0',
            description: 'V3',
            developer: {
              id: 'd2',
              name: 'Different Dev',
              email: 'other@example.com',
              avatar: 'other-avatar.jpg',
            },
            updated_at: new Date().toISOString(),
          },
        ],
      })
      const wrapper = mount(ServiceCard, {
        props: { service },
      })

      const avatars = wrapper.findAll('.avatar')
      // Should only show 2 unique avatars, not 3
      expect(avatars).toHaveLength(2)
    })

    it('filters out versions without developer avatars', () => {
      const service = createMockService({
        versions: [
          {
            id: 'v1',
            name: '1.0.0',
            description: 'V1',
            developer: {
              id: 'd1',
              name: 'Dev 1',
              email: 'd1@example.com',
              avatar: 'avatar1.jpg',
            },
            updated_at: new Date().toISOString(),
          },
          {
            id: 'v2',
            name: '2.0.0',
            description: 'V2',
            developer: {
              id: 'd2',
              name: 'Dev 2',
              email: 'd2@example.com',
              avatar: '', // Empty avatar
            },
            updated_at: new Date().toISOString(),
          },
        ],
      })
      const wrapper = mount(ServiceCard, {
        props: { service },
      })

      const avatars = wrapper.findAll('.avatar')
      // Should only show 1 avatar (the one with valid avatar URL)
      expect(avatars).toHaveLength(1)
    })

    it('correctly calculates +N for many developers', () => {
      // Create 5 developers
      const versions = Array.from({ length: 5 }, (_, i) => ({
        id: `v${i}`,
        name: `${i}.0.0`,
        description: `Version ${i}`,
        developer: {
          id: `d${i}`,
          name: `Dev ${i}`,
          email: `dev${i}@example.com`,
          avatar: `avatar${i}.jpg`,
        },
        updated_at: new Date().toISOString(),
      }))

      const service = createMockService({ versions })
      const wrapper = mount(ServiceCard, {
        props: { service },
      })

      const avatars = wrapper.findAll('.avatar')
      expect(avatars).toHaveLength(3)

      // Should show +3 (5 total - 2 shown = 3 hidden)
      expect(avatars[0].text()).toBe('+3')
    })
  })

})
