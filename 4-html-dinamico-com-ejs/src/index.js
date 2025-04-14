const express = require("express")
const path = require("node:path")

const app = express()

const storedUsers = []


// Configurações do EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Configurações do body das requisições
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    const title = 'Homepage'
    const message = 'Mensagem dinâmica inserida pelo EJS'
    res.render('index', { title, message })
})

app.get('/formulario', (req, res) => {
    res.render('form')
})

app.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    storedUsers.push({ username, password })

    // Como estamos enviando uma requisição post ele implica envio de dados. Poderiamos simplismente
    // utilizar o render aqui mesmo, mas lembra do http? O ideal para buscar uma página é o método get, por tanto, utilizamos o método redirect para redirecionar o usuário para outra rota.
    res.redirect('/usuarios')
})

app.get('/usuarios', (req, res) => {
    res.render('users', { users: storedUsers })
})

const PORT = 3000

app.listen(PORT, () => console.log('Servidor iniciado!'))