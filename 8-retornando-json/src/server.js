const express = require('express')
const gamesController = require('./controllers/games-controller')

const app = express()

app.use(express.json())

app.post('/', (req, res) => {
    res.json({ message: "Hello World" })
})

app.get('/games', gamesController.index)

app.get('/games/:id', gamesController.show)

app.post('/games', gamesController.save)

app.post('/games/:id/genres', gamesController.addGenre)

app.put('/games/:id', gamesController.update)
// app.patch Funcionaria de forma semelhante mas precisaria de outro contexto.
// O Put geralmente utilizamos quando queremos editar certo recurso como um todo.
// O Patch quando queremos "reparar", atualizar uma parte específica de um recurso.

app.delete('/games/:id', gamesController.delete)

app.delete('/games/:id/genres/:name', gamesController.deleteGenre)

const PORT = 3000

app.listen(PORT, () => console.log('Servidor iniciado!'))