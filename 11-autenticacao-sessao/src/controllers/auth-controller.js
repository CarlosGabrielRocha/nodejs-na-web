const users = require("../models/users-model")

module.exports = {
    // GET /
    index: (req, res) => {
        res.render('index')
    },

    // POST auth/register
    register: (req, res) => {
        const { username, password } = req.body

        const userAlreadyExists = users.find(user => user.username === username) 

        if (userAlreadyExists) {
            return res.status(400).redirect('/')
        }

        const newUser = { username, password, role: 'standerd' }
        users.push(newUser)

        req.session.authenticated = true
        req.session.currentUser = newUser

        res.redirect('/dashboard')
    },

    // POST auth/login
    login: (req, res) => {
        const { username, password } = req.body

        const user = users.find(user => user.username === username)

        if (!user) {
            return res.redirect('/')
        }

        if (password !== user.password) {
            return res.redirect('/')
        }

        req.session.authenticated = true
        req.session.currentUser = user

        res.redirect('/dashboard')
    },

    // GET auth/logout
    logout: (req, res) => {
        req.session.destroy()
/*         req.session.authenticated = false
        req.session.currentUser = null */
        res.redirect('/')
    }
}