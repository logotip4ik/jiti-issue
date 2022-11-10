import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

import type { Auth } from 'lucia-auth/types'

export interface ModuleOptions {
  auth: Auth
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-lucia-auth',
    configKey: 'lucia'
  },
  setup (options, nuxt) {
    if (!options.auth) { throw new Error('no lucia auth config was provided') }

    console.log('auth:', options.auth)

    const { resolve } = createResolver(import.meta.url)

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    addPlugin(resolve(runtimeDir, 'plugins', 'lucia-auth.client'))
    addPlugin(resolve(runtimeDir, 'plugins', 'lucia-auth.server'))

    nuxt.hook('imports:dirs', (dirs) => {
      dirs.push(resolve(runtimeDir, 'composables'))
    })

    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.alias = nitroConfig.alias || {}

      nitroConfig.externals = nitroConfig.externals || {}
      nitroConfig.externals.inline = nitroConfig.externals.inline || []
      nitroConfig.externals.inline.push(resolve('runtime'))
    })

    // addServerHandler({
    //   route: '/api/auth/[...lucia]',
    //   handler: resolve(runtimeDir, 'server/api/lucia')
    // })
  }
})
