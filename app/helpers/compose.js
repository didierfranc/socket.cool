module.exports = (...arg) => (req, res) => {
  const iterate = previousBody => (i = 0) => (body) => {
    if (arg[i]) {
      arg[i](req, res, iterate(body || previousBody)(i + 1))
    } else {
      res.end(body || previousBody)
    }
  }
  iterate()()()
}
