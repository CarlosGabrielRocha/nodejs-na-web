const express = require('express')
const path = require('node:path')
const router = require('./routes')
const session = require('express-session')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
/* Depois que o usuário se autenticar, uma sessão será criada, imagine essa sessão como um objeto
do javaScript. Nessa sessãos pode ter informações como hora de criação, usuário, etc, além de um id único gerenciado pela biblioteca. Porém, não será enviada toda essa informação pro frontend, apenas o identificador, então quando o frontend fizer uma requisição novamente, esse id será enviado de volta paro backend, que poderá identificar a sessão do usuário e fazer as verificações necessárias. */
app.use(session({
    secret: 'palavra-chave-secreta', // Chave secreta usada para assinar o identificador da sessão. Usada para criptografar, proteger a informação que vai está armazenada no cookie. Idealmente, essa palavra chave será algo como: uashdi7ro34u7fd43987ad3948. 
    resave: false, // resave seria para forçar a sessão a ser rearmazenada, o valor mais padrão é false.
    saveUninitialized: true, // Força uma sessão que não está inicializada para ser salva nesse armazenamento, deixaremos ele armazenado enquanto estiver rodando, ou seja, na memória ram do server. Caso a aplicação seja encerrada, todas as sessões desaparecem.
    cookie: { secure: false, } // Configurações para específicar detalhes de segurança no cookie.
}))

app.use(router)

app.listen(3000, () => console.log('Servidor Iniciado!'))