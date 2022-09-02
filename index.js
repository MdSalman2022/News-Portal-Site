

const loadCategories = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
}
loadCategories()
const displayCategories = categories => {


    const categoriesContainer = document.getElementById('category')

    categoriesContainer.innerHTML = ``
    // categories.forEach(category => {

    //     console.log(category.category_name)

    //     const list = document.createElement('ul')
    //     list.classList.add('list-group')
    //     list.classList.add('list-group-horizontal')
    //     list.classList.add('gap-2')
    //     list.innerHTML = `
    //     <li class="list-group-item active rounded d-inline">
    //     <a class="nav-link" aria-current="page" href="#">${category.category_name}</a>
    //     </li>
    //     `
    //     categoriesContainer.appendChild(list)
    // })
    categories.forEach(category => {

        console.log(category.category_name)

        const div = document.createElement('div')
        div.classList.add('category-row')
        div.classList.add('col')
        div.classList.add('border')
        div.classList.add('border-primary')
        div.classList.add('rounded-4')
        div.classList.add('m-1')
        div.classList.add('p-2')
        div.classList.add('text-primary')
        div.innerHTML = `
            ${category.category_name}
        `

        categoriesContainer.appendChild(div)
    })
}


