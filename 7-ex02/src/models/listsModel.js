let lists = []
// list = { name: string, id: string, tasks: [{ desc: string, completed: boolean }] }

listsModel = {
    getAllLists() {
        return lists
    },

    getListById(id) {
        if (!id) throw new Error('Id não informado!')
        return lists.find(list => list.id === id)
    },

    createList(name) {
        if (!name) throw new Error('Nome não informado!')
        const list = {
            name,
            id: Date.now().toString(),
            tasks: []
        }

        lists.push(list)
        return list
    },

    deleteList(listId) {
        if (!listId) throw new Error('Id não informado!')
        lists = lists.filter(list => list.id !== listId)
    },

    completeTask(list, taskId) {
        if (!list || !taskId) throw new Error('Não foi possível executar sua solicitação!')
            
        list.tasks.forEach(task => {
            if (task.id === taskId) {
                task.completed = true
            } 
        }) 
    }, 

    createNewTask(list, taskDesc) {
        if (!list || !taskDesc) throw new Error('Não foi possível completar sua solicitação!')
        list.tasks.push({ desc: taskDesc, id: String(list.tasks.length + 1), completed: false })
    }
}

module.exports = listsModel