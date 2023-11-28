import http from 'http'
import { app } from './server.js'
import { connectDb } from './config/db.js'
const server = http.createServer(app)
const PORT = process.env.PORT||3000
async function main() {
  try {
    await startServerAndDb()
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
async function startServerAndDb() {
 await connectDb()
  server.listen(PORT, () => console.log(`server listening in ${PORT} `))
}
main()
