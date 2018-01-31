/* eslint-disable class-methods-use-this */
const { setWith } = require('lodash')
const Redis = require('ioredis')

const redis = new Redis()
const pub = new Redis()

const s = n => n.toString()

class PubSub {
  constructor() {
    this.store = {}
  }

  add({
    channel, uid, instance, ws,
  }) {
    const prop = `${channel}.${uid}.${instance}`
    setWith(this.store, prop, ws, Object)
  }

  delete({ channel, uid, instance }) {
    delete this.store[s(channel)][s(uid)][s(instance)]
  }

  subscribe(to, cb) {
    redis.subscribe(to)

    redis.on('message', (channel, message) => {
      console.log(channel, message)
      cb()
    })
  }

  publish(to, message) {
    pub.publish(to, message)
  }
}

const pubsub = new PubSub()

module.exports = pubsub
