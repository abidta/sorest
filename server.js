import http from 'http'
const server = http.createServer()
const PORT = 3000
async function main() {
  server.listen(PORT, () => console.log(`server listening in ${PORT}`))
}
main()
