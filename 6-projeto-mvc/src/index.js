const path = require("node:path")
const express = require("express")
const router = require("./routes")

const app = express()

// Configuração do EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Configuração de arquivos estáticos
app.use(express.static('public'))

// Configuração para ler dados da requisição
app.use(express.urlencoded({ extended: true }))


// Rotas da aplicação
app.use(router)


const PORT = process.env.PORT || 3000 // process.env do node, retorna um objeto com as variáveis de ambiente dos sistema. No momento em que estamos desenvolvendo, essa variável ainda não existe, mas quando fizermos o deploy e estivermos no na máquina do servidor, ela passará a existir. Essa é uma forma comum de trabalharmos.
app.listen(PORT, () => {
    console.log(`Servidor iniciado!\nRodando em http://localhost:${PORT}/`)
})

