import '../scss/index.scss'
import './bootstrap.js'

document.querySelectorAll('.form-list').forEach(formElement => {
    formElement.addEventListener('submit', (ev) => {
        const listName = ev.currentTarget.dataset.listName
        const should = confirm(`Você tem certeza que deseja excluir a lista ${listName}?`)

        if (should) {
            alert(`A lista ${listName} foi excluída com sucesso!`)
        } else {
            ev.preventDefault()
        }
    })
})


