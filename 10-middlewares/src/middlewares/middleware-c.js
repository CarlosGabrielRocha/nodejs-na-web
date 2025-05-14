module.exports = function (req, res, next) {
    console.log('Executando Middleware C')
    req.middlewareC = 'OK!'
    next()
}