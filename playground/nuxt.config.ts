import { defineNuxtConfig } from 'nuxt/config'
import luciaAuth from '..'

import { auth } from './lib/auth'

export default defineNuxtConfig({
  modules: [luciaAuth],

  lucia: { auth }
})
