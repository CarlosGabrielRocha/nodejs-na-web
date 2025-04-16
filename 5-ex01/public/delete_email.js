
const deleteBtn = document.getElementById('delete')
const emailElements = document.querySelectorAll('.email-container')

deleteBtn.addEventListener('click', () => {
    emailElements.forEach(element => {
        element.classList.add('select-to-delete')
        element.addEventListener('click', deleteEmail, { once: true })
    })
})

function deleteEmail(ev) {
    const emailElement = ev.currentTarget 
    const email = emailElement.querySelector('p').textContent

    fetch("/email", {
        method: "DELETE",
        headers: {
            "Content-Type":  "application/x-www-form-urlencoded"
        },
        body: `email=${email}`
    })

    emailElement.remove()

    const emailElements = document.querySelectorAll('.email-container')
    emailElements.forEach(element => {
        element.classList.remove('select-to-delete')
        element.removeEventListener('click', deleteEmail)
    })
}