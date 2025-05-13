function handleTagsType(tags) {
    const isAllString = tags.every(tag => {
        return typeof tag === 'string'
    })

    if (!isAllString) return false
    else return true
}

function handleSongsType(songs) {
    const isValid = songs.every(song => {
        return typeof song.title === 'string' &&
            typeof song.year === 'number' &&
            typeof song.composer === 'string' &&
            typeof song.album === 'string'
    })
    if (isValid) return true
    else return false
}

let savedPlaylists = [
    { id: 1, name: 'Músicas Católicas', tags: ['#gregorian', '#catholic'], songs: [{ id: 1, title: 'Salve Regina', year: 1050, composer: 'Hermann de Reichenau', album: 'xxxxxx' }] },
    { id: 2, name: 'Lofi', tags: ['#lofi', '#midnight', '#catholiclofi'], songs: [{ id: 1, title: 'midnight study flow', year: 2025, composer: 'catholic lofi', album: 'catholic lofi' }, { id: 2, title: 'this sacred  heart', year: 2024, composer: 'catholic lofi', album: '2024 catholic lofi' }] }
]

const playlistController = {
    // GET /
    index: (req, res) => {
        return res.json({ message: 'welcome' })
    },
    // GET /playlists
    playlists: (req, res) => {
        return res.json(savedPlaylists)
    },
    // GET /playlists/:id
    playlist: (req, res) => {
        const { id } = req.params
        const playlist = savedPlaylists.find(playlist => playlist.id === +id)
        if (!playlist) {
            return res.status(404).json({ message: 'The Playlist Was Not Found!' })
        }
        return res.json(playlist)
    },
    // POST /playlists
    save: (req, res) => {
        const { name, tags, songs } = req.body
        const newPlaylist = {
            id: savedPlaylists.length + 1,
            name: name
        }

        if (typeof name !== 'string') return res.status(400).json({ message: 'name must be a string!' })

        if (Array.isArray(tags)) {
            if (tags.length === 0) return res.status(400).json({ message: 'tags cant be empty!' })

            if (!handleTagsType(tags)) 
                return res.status(400).json({ message: 'tags must be an array of strings!' })

            newPlaylist.tags = tags
        } else {
            return res.status(400).json({ message: 'tags must be an array!' })
        }

        if (Array.isArray(songs)) {

            if (!handleSongsType(songs))
                return res.status(400).json({ message: 'Invalid types in songs[]' })

            newPlaylist.songs = songs
        } else {
            newPlaylist.songs = []
        }

        savedPlaylists.push(newPlaylist)
        return res.status(201).json(newPlaylist)
    },
    // PATCH /playlists/:id
    update: (req, res) => {
        const { id } = req.params
        const { name, tags } = req.body
        const playlistIndex = savedPlaylists.findIndex(element => element.id === +id)

        if (typeof name === 'string') {
            savedPlaylists[playlistIndex].name = name
        } else if (typeof name !== 'undefined') {
            return res.status(400).json({ message: 'name must be a string' })
        }

        if (Array.isArray(tags)) {
            if (tags.length === 0) return res.status(400).json({ message: 'tags cant be empty!' })

            if (!handleTagsType(tags)) 
                return res.status(400).json({ message: 'tags must be an array of strings!' })

            savedPlaylists[playlistIndex].tags = tags
        } else if (typeof tags !== 'undefined') {
            return res.status(400).json({ message: 'tags must be an array!' })
        }

        return res.json(savedPlaylists[playlistIndex])
    },
    // DELETE /playlists/:id
    delete: (req, res) => {
        const { id } = req.params
        const playlistIndex = savedPlaylists.findIndex(playlist => playlist.id === +id)

        if (playlistIndex === -1) return res.status(404).json({ message: 'Playlist Not Found!' })

        savedPlaylists = savedPlaylists.filter(playlist => playlist.id !== +id)
        res.status(204).end()
    },
    // POST /playlists/:id/songs
    saveSong: (req, res) => {
        const { id } = req.params
        const { songs } = req.body
        const playlistIndex = savedPlaylists.findIndex(playlist => playlist.id === +id)

        if (playlistIndex === -1) return res.status(404).json({ message: 'Playlist Not Found!' })

        if (Array.isArray(songs)) {

            if (!handleSongsType(songs))
                return res.status(400).json({ message: 'Invalid types in songs[]!' })

            songs.forEach(({ title, year, composer, album }) => {
                const song = { id: savedPlaylists[playlistIndex].songs.length + 1, title, year, composer, album }
                savedPlaylists[playlistIndex].songs.push(song)
            })
        } else {
            return res.status(400).json({ message: 'songs must be a array!' })
        }
        res.json(savedPlaylists[playlistIndex])
    },
    // DELETE /playlists/:id/songs/:songId
    deleteSong: (req, res) => {
        const { id, songId } = req.params

        const playlistIndex = savedPlaylists.findIndex(playlist => playlist.id === +id)
        if (playlistIndex === -1) return res.status(404).json({ message: 'Playlist Not Found!' })

        const songIndex = savedPlaylists[playlistIndex].songs.findIndex(song => song.id === +songId)
        if (songIndex === -1) return res.status(404).json({ message: 'Song Not Found!' })

        let playlistSongs = savedPlaylists[playlistIndex].songs
        savedPlaylists[playlistIndex].songs = playlistSongs.filter(song => song.id !== +songId)
        res.json(savedPlaylists[playlistIndex].songs)
    }
}

module.exports = playlistController