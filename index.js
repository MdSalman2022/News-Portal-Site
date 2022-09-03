

const loadCategories = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error))
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}



loadCategories()

const displayCategories = categories => {
    const categoriesContainer = document.getElementById('category')
    const foundSection = document.getElementById('foundSection')
    categoriesContainer.innerHTML = ``
    categories.forEach(category => {
        console.log(category.category_name)

        const div = document.createElement('div')
        div.setAttribute("id", "category-row");
        div.classList.add('category-row')
        div.classList.add('col')
        div.classList.add('border')
        div.classList.add('border-primary')
        div.classList.add('rounded-4')
        div.classList.add('m-1')
        div.classList.add('p-2')
        div.classList.add('text-primary')
        div.classList.add('nav-link')

        div.innerHTML = `
            ${category.category_name}
        `
        categoriesContainer.appendChild(div)

        div.addEventListener('click', () => {
            toggleSpinner(true);

            div.classList.add('active')
            loadNews(category.category_id)
            loadFound(category.category_id, category.category_name)
            console.log(div);
        })

    })
}

const loadFound = (id, name) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => foundSectionLength(data.data.length))
        .catch(error => console.log(error))

    let foundSectionLength = length => {

        let foundSection = document.getElementById('foundSection')
        foundSection.innerHTML = ``;
        foundSection.innerHTML = `
            ${length ? length : 'No'} items found for category ${name ? name : ''}
            `
    }

    // foundSectionLength()
}
loadFound();



const defaultNews = () => {
    const url = `https://openapi.programming-hero.com/api/news/category/01`
    fetch(url)
        .then(res => res.json())
        .then(data => defaultNewsLoad(data.data))
        .catch(error => console.log(error))
}
defaultNews();



const defaultNewsLoad = allNews => {
    console.log(allNews);
    function sortByViews(allNews) {
        return allNews.sort((a, b) => b.total_view - a.total_view);
    }
    sortByViews(allNews)

    const newsContainer = document.getElementById('newsSection')
    newsContainer.innerHTML = ``

    allNews.forEach(news => {
        const div = document.createElement('div')

        div.classList.add('card')
        div.classList.add('mb-3')

        console.log(allNews);

        console.log(news.title)
        console.log(news.total_view)

        div.innerHTML = `
            <div class="row align-items-center g-0">
                <div class="col-md-3 p-4">
                    <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-9 ">
                    <div class="card-body">
                            <h5 class="card-title">${news.title}</h5>
                            <p class="card-text">${news.details.length > 500 ? news.details = news.details.substring(0, 600) + "....." : news.details}</p>
                            <div class="news-footer pt-3 row align-items-center">
                                <div class="author col-4">
                                    <div class="row align-items-center">
                                        <div class="profile-img col-3 px-1">
                                        <img src="${news.author.img}" alt="">
                                        </div>
                                        <div class="col-9">
                                            <p class="mb-0 fw-semibold">${news.author.name ? news.author.name : 'No author name found'}</p>
                                            <p>${news.author.published_date}</p>
                                        </div>
                                    </div>                    
                                </div>                
                        <div class="views col-2"><p class="fw-semibold"><i class="fa-solid fa-eye"></i> ${news.total_view}</p></div>
                        <div class="review col-4"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i></div>
                        
                        
                        <div class="next col-2">
                         <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                 <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
                        </button>
                            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                    <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel">${news.title}</h5>
                                    </div>
                                    <div class="modal-body">
                                        ${news.details}
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        newsContainer.appendChild(div)
    })

}





const loadNews = id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)

        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(error => console.log(error))
}


loadNews()

const displayNews = allNews => {

    function sortByViews(allNews) {
        return allNews.sort((a, b) => b.total_view - a.total_view);
    }
    sortByViews(allNews)

    const newsContainer = document.getElementById('newsSection')
    newsContainer.innerHTML = ``
    if (allNews.length < 1) {
        toggleSpinner(false)
        newsContainer.innerHTML = `
        <h1 class="text-center fw-bold text-primary">No news found</h1>    
        `
    }
    else {
        allNews.forEach(news => {
            toggleSpinner(false)
            const div = document.createElement('div')

            div.classList.add('card')
            div.classList.add('mb-3')

            console.log(news);

            div.innerHTML = `
            <div class="row align-items-center g-0">
                <div class="col-md-3 p-4">
                    <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-9 ">
                    <div class="card-body">
                            <h5 class="card-title">${news.title}</h5>
                            <p class="card-text">${news.details.length > 500 ? news.details = news.details.substring(0, 600) + "...." : news.details}</p>
                            <div class="news-footer pt-3 row align-items-center">
                                <div class="author col-4">
                                    <div class="row align-items-center">
                                        <div class="profile-img col-3 px-1">
                                        <img src="${news.author.img}" alt="">
                                        </div>
                                        <div class="col-9">
                                            <p class="mb-0 fw-semibold">${news.author.name ? news.author.name : 'No author name found'}</p>
                                            <p>${news.author.published_date}</p>
                                        </div>
                                    </div>                    
                                </div>                
                        <div class="views col-2"><p class="fw-semibold"><i class="fa-solid fa-eye"></i> ${news.total_view}</p></div>
                        <div class="review col-4"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i></div>
                        
                        <div class="next col-2">
                         <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                 <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
                        </button>
                            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                    <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel">${news.title}</h5>
                                    </div>
                                    <div class="modal-body">
                                        ${news.details}
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
            newsContainer.appendChild(div)
        })
    }
}
displayNews()

// Modal
const loadNewsDetail = newsid => {
    const url = `https://openapi.programming-hero.com/api/news/${newsid}`
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data.data))
        .catch(error => console.log(error))
    console.log('all news')
}
// loadNewsDetail()


const modal = document.getElementById('modal')






