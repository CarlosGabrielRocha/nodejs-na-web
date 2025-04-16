const path = require('node:path')
const express = require('express')

const app = express()

let storedUsers = []

// Configurações do EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Configurações do Express
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Requisições

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/newuser', (req, res) => {
    const fullname = req.body.fullname
    const email = req.body.email

    storedUsers.push({ fullname, email })

    res.redirect('/success')
})

app.get('/success', (req, res) => {
    res.render('success')
})

app.get('/emails', (req, res) => {
    res.render('registered_emails', { registrations: storedUsers })
})

app.delete('/email', (req, res) => {
    const emailToDelete = req.body.email
    console.log(emailToDelete)
    console.log(storedUsers)
    storedUsers = storedUsers.filter(user => user.email !== emailToDelete)
    console.log(storedUsers)

    res.send('Email deletado com sucesso!')
})

//

const PORT = 3000

app.listen(PORT, () => {
    console.log('Servidor Rodando em: http://localhost:3000')
})