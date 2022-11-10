import mongoose from 'mongoose'

let client: typeof mongoose

// mongoose will wait for connection before doing some queries
mongoose.connect('mongodb://root:root@localhost:27017').then(connection => (client = connection))

mongoose.model(
  'user',
  new mongoose.Schema(
    {
      _id: { type: String },
      provider_id: {
        type: String,
        unique: true,
        required: true
      },
      hashed_password: String
    },
    { _id: false }
  )
)

mongoose.model(
  'session',
  new mongoose.Schema(
    {
      _id: { type: String },
      user_id: { type: String, required: true },
      expires: { type: Number, required: true },
      idle_expires: { type: Number, required: true }
    },
    { _id: false }
  )
)

export { mongoose }
export default () => client
