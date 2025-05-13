const express = require('express')
const playlistController = require('./controllers/playlist-controller')

const router = express.Router()

router.get('/', playlistController.index)

router.get('/playlists', playlistController.playlists)

router.get('/playlists/:id', playlistController.playlist)

router.post('/playlists', playlistController.save)

router.patch('/playlists/:id', playlistController.update)

router.delete('/playlists/:id', playlistController.delete)

router.post('/playlists/:id/songs', playlistController.saveSong)

router.delete('/playlists/:id/songs/:songId', playlistController.deleteSong)

module.exports = router