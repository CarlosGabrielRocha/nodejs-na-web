const listsModel = require("../models/listsModel")

const listsController = {
    // GET /
    index: (req, res) => {
        res.render('index')
    },
    // GET /app
    app: (req, res) => {
        const lists = listsModel.getAllLists()
        res.render('app', { lists })
    },
    // GET /app/lists/:id 
    list: (req, res) => {
        const idParam = req.params.id
        const list = listsModel.getListById(idParam)

        res.render('tasks', { list, tasks: list.tasks })
    },
    // GET /app/create-form
    createForm: (req, res) => {
        res.render('create-list')
    },
    // POST /app/create-form/create
    create: (req, res) => {
        const { 'list-name': listName } = req.body
        const list = listsModel.createList(listName)
        
        res.redirect(`/app/lists/${list.id}`)
    },
    // POST /app/lists/:id/delete
    delete: (req, res) => {
        const id = req.params.id
        listsModel.deleteList(id)

        res.redirect(`/app/lists`)
    },
    // POST /app/lists/:id/new-task
    newTask: (req, res) => {
        const id = req.params.id
        const list = listsModel.getListById(id)

        const { "new-task": newTask } = req.body
        listsModel.createNewTask(list, newTask)

        res.redirect(`/app/lists/${id}`)
    },
    // POST /app/lists/:listId/complete/:taskId
    completeTask: (req, res) => {
        const listId = req.params.listId
        const list = listsModel.getListById(listId)
        const taskId = req.params.taskId

        listsModel.completeTask(list, taskId)

        res.redirect(`/app/lists/${listId}`)
    }
}

module.exports = listsController