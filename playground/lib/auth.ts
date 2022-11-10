import lucia from 'lucia-auth'
import adapter from '@lucia-auth/adapter-mongoose'
import { mongoose } from './db'

export const auth = lucia({
  env: process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD',
  adapter: adapter(mongoose)
})

// export const auth = {}
