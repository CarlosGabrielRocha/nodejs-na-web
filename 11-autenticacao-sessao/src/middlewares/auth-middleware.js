// middleware para verificar se existe um usuário autenticado na sessão em cada rota que quisermos proteger
const authMiddleware = (req, res, next) => {
    if (req.session.authenticated) {
        console.log(req.session)
        next()
    } else {
        res.redirect('/')
    }
}

const ensureUserIsAdmin = (req, res, next) => {
    if (req.session.currentUser.role !== 'admin') {
        return res.redirect('/dashboard')
    } else {
        next()
    }
}

module.exports = {
    authMiddleware,
    ensureUserIsAdmin
}