import { setupDevtoolsPlugin } from '@vue/devtools-api'
import { addCustomTab } from '@vue/devtools-api'
import type { App } from 'vue'

export function installKongDesignTokenDevtools(app: App) {
  if (import.meta.env.PROD) return
  setupDevtoolsPlugin(
    {
      id: 'com.kong.design-tokens',
      label: 'Kong Design Tokens',
      packageName: 'kong-design-tokens',
      homepage: 'https://konghq.com/',
      app,

    },
    () => {
      addCustomTab({
        name: 'kong-design-tokens',
        title: 'Kong Design Tokens',
        icon: 'https://avatars.githubusercontent.com/u/962416?s=200&v=4',
        view: {
          type: 'iframe',
          src: 'https://kong-design-token-view.pages.dev/',
        },
        category: 'app',
      })
    },
  )
}
