import mongoose from 'mongoose'

export async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI).then((value) => {
      console.log(
        `mongoDb connected on ${value.connection.host}:${value.connection.port}`
      )
    })
  } catch (err) {
    console.log('error => ',err)
    process.exit(1)
  }
}
