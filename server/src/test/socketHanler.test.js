const { Server } = require('socket.io')
const Client = require('socket.io-client')
const http = require('http')
const socketHandler = require('../socketHandler')

let io, httpServer, client1, client2

beforeAll((done) => {
  httpServer = http.createServer()
  io = new Server(httpServer)

  io.on('connection', (socket) => {
    socketHandler(socket, io)
  })

  httpServer.listen(() => {
    const port = httpServer.address().port
    client1 = Client(`http://localhost:${port}`)
    client2 = Client(`http://localhost:${port}`)
    let connected = 0
    const onConnected = () => {
      connected++
      if (connected === 2) done()
    }
    client1.on('connect', onConnected)
    client2.on('connect', onConnected)
  })
})

afterAll(() => {
  io.close()
  httpServer.close()
  client1.close()
  client2.close()
})

test('chat message should be broadcast to all clients', (done) => {
  const msg = 'Hello test chat!'
  client2.on('chat message', (data) => {
    expect(data).toHaveProperty('user')
    expect(data).toHaveProperty('text', msg)
    expect(data).toHaveProperty('time')
    done()
  })
  client1.emit('chat message', msg)
})

test('typing event should notify others', (done) => {
  client2.on('typing', (username) => {
    expect(typeof username).toBe('string')
    expect(username).toContain('User-')
    done()
  })
  client1.emit('typing', true)
})

test('stop-typing event should notify others', (done) => {
  client2.on('stop-typing', (username) => {
    expect(typeof username).toBe('string')
    expect(username).toContain('User-')
    done()
  })
  client1.emit('typing', false)
})
