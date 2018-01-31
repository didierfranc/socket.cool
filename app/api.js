const { parse } = require('url')
const pubsub = require('./pubsub')

module.exports = (req, res) => {
  const { pathname } = parse(req.url)
  // eslint-disable-next-line no-unused-vars
  const [_, channel, uid] = pathname.split('/')

  if (channel && !uid) {
    pubsub.publish(`${channel}`, channel)
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
  res.end('🤖')
}
