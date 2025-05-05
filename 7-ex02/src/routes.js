const express = require('express')
const listsController = require('./controllers/lists-controler')

const router = express.Router()

router.get('/', listsController.index)

router.get('/app/lists', listsController.app)

router.get('/app/lists/:id', listsController.list)

router.get('/app/create-form', listsController.createForm)

router.post('/app/create-form/create', listsController.create)

router.post('/app/lists/:id/delete', listsController.delete)

router.post('/app/lists/:id/new-task', listsController.newTask)

router.post('/app/lists/:listId/complete/:taskId', listsController.completeTask)




// Para Teste

router.get('teste', (req, res) => {
    res.redirect()
})

module.exports = router