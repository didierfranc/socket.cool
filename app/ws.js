const WebSocket = require('ws')
const { parse } = require('url')
const { v4 } = require('uuid')

const pubsub = require('./pubsub')

module.exports = (server) => {
  const wss = new WebSocket.Server({ server })

  wss.on('connection', (ws, req) => {
    const { pathname } = parse(req.url)
    // eslint-disable-next-line no-unused-vars
    const [_, channel, uid] = pathname.split('/')

    const instance = v4()
    pubsub.add({
      channel,
      uid,
      instance,
      ws,
    })

    ws.on('close', () => {
      console.log('disconnected')
      pubsub.delete({ channel, uid, instance })
    })

    ws.on('error', (e) => {
      if (e.code === 'ECONNRESET') return
      console.log(e)
    })

    pubsub.subscribe(`${channel}`, () => {
      ws.send('something')
    })
  })
}
