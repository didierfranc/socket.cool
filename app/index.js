const { createServer } = require('http')

const compose = require('./helpers/compose')
const logger = require('./helpers/logger')
const cors = require('./helpers/cors')

const ws = require('./ws')
const api = require('./api')

const middlewares = [logger, cors, api]
ws(createServer(compose(...middlewares)).listen(8080))
