import http from 'http'
import { app } from './server.js'
import { connectDb } from './config/db.js'
const server = http.createServer(app)
//const PORT = 3000
async function main() {
  try {
    await startServerAndDb()
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
async function startServerAndDb() {
  connectDb()
  server.listen(process.env.PORT||6000, () => console.log(`server listening in `))
}
main()
