const games = [
    { id: 1, name: 'Legend of Mana', genres: ['action-rpg'], year: 1999 },
    { id: 2, name: 'World of Warcraft', genres: ['mmorpg'], year: 2004 },
    { id: 3, name: 'Metal Gear Solid', genres: ['stealth', 'action-adventure'], year: 1998 },
    { id: 4, name: 'Sonic Adventure 2', genres: ['platformer'], year: 2001 },
    { id: 5, name: 'Age of Empires 2', genres: ['real-time-strategy'], year: 1999 }
]

// REST = Representational State Transfer

module.exports = {
    // GET /games
    index: (req, res) => {
        res.json(games)
    },
    // GET /games/:id
    show: (req, res) => {
        const { id } = req.params
        const game = games.find(game => game.id === +id)
        if (!game) {
            res.status(404)
            res.json({ message: 'Game Not Found' })
        } else {
            res.json(game)
        }
    },
    // POST /games

    save: (req, res) => {
        const { name, genres, year } = req.body

        const newGame = {
            id: Math.floor(Math.random() * 999999),
            name,
            genres,
            year
        }

        games.push(newGame)

        res.status(201) /* É importante que envio do código de status esteja antes do res.json() ou qualquer outro método de devolver uma reposta, visto que eles por padrão, executam o res.end() para finalizar a stream de resposta. */
        /* O método status devolve a própria resposta, então é possível encadiar com o res.json() em seguida. */
        res.json(newGame)
    },

    // PUT /games/:id
    update: (req, res) => {
        const { id } = req.params
        const { name, year } = req.body
        const gameIndex = games.findIndex(game => game.id === +id)

        if (gameIndex === -1) {
            return res.status(404).json({ message: 'Game Not Found' })
        }

        if (typeof name === 'string') {
            games[gameIndex].name = name
        }
        if (typeof year === 'number') {
            games[gameIndex].year = year
        }

        res.json(games[gameIndex])
    },

    // DELETE /games/:id
    delete: (req, res) => {
        const { id } = req.params

        const gameIndex = games.findIndex(game => game.id === +id)
        if (gameIndex === -1) {
            return res.status(404).json({ message: 'Game Not Found' })
        }

        games.splice(gameIndex, 1)
        res.status(204).end()
    },

    // POST /games/:id/genres
    addGenre: (req, res) => {
        const { id } = req.params
        const { genre } = req.body
        const gameIndex = games.findIndex(game => game.id === +id)
        if (gameIndex === -1) {
            return res.status(404).json({ message: 'Game Not Found' }) // O retorno é para deixar o código mais legível.
        }

        if (typeof genre !== 'string' || games[gameIndex].genres.includes(genre)) {
            return res.status(400).json({ message: 'Invalid Genre' })
        }

        games[gameIndex].genres.push(genre)
        res.json(games[gameIndex])
    },

    // DELETE /games/:id/genres/:name
    deleteGenre: (req, res) => {
        console.log(req.params)
        const { id, name } = req.params

        const gameIndex = games.findIndex(game => game.id === +id)
        if (gameIndex === -1) {
            return res.status(404).json({ message: 'Game Not Found' })
        }

        if (typeof name !== 'string' || !games[gameIndex].genres.includes(name)) {
            return res.status(400).json({ message: 'Invalid Genre' })
        }

        games[gameIndex].genres = games[gameIndex].genres.filter(genre => genre !== name)
        res.status(200).json(games[gameIndex])
    }
}