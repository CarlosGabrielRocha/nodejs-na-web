const express = require('express')

const app = express()

const games = [
    { id: 1, name: 'Legend of Mana', genres: ['action-rpg'], year: 1999 },
    { id: 2, name: 'World of Warcraft', genres: ['mmorpg'], year: 2004 },
    { id: 3, name: 'Metal Gear Solid', genres: ['stealth', 'action-adventure'], year: 1998 },
    { id: 4, name: 'Sonic Adventure 2', genres: ['platformer'], year: 2001 },
    { id: 5, name: 'Age of Empires 2', genres: ['real-time-strategy'], year: 1999 }
]

app.post('/', (req, res) => {
    res.json({ message: "Hello World" }) // Transforma um objeto ou um array de objetos em json e envia como resposta da requisição
})

app.get('/games', (req, res) => {
    res.json(games)
})

const PORT = 3000

app.listen(PORT, () => console.log('Servidor iniciado!'))