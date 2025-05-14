const express = require("express")
const uploadMiddlewares = require("./middlewares/upload-middleware")

const app = express()

app.use(express.static('public'))

// O parâmetro da função single, precisa corresponder ao campo name do input no formulário. Essa função retornará um middleware capaz de tratar o envio de um formulário que envia arquivos na requisição, além de tratar corretamente o conteúdo do arquivo.

app.post('/upload', uploadMiddlewares.single('avatar'), (req, res) => {
    console.log(req.file) // Objeto populado pelo multer
    console.log(req.body) // O restante é um objeto
    res.json({ message: "Arquivo salvo com sucesso!" })
})

const PORT = 3000
app.listen(PORT, () => console.log('O servidor está rodando'))