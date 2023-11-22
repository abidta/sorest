import http from 'http'
import { app } from './server.js'
const server = http.createServer(app)
const PORT = 3000
async function main() {
  server.listen(PORT, () => console.log(`server listening in ${PORT}`))
}
main()
