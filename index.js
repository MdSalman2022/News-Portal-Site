

const loadCategories = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
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

        div.innerHTML = `
            ${category.category_name}
        `
        categoriesContainer.appendChild(div)

        div.addEventListener('click', () => {
            // div.classList.add('active')
            loadNews(category.category_id)
            console.log(div);
            foundSection.innerHTML = `
               5 items found for category <span class="fw-bold">${category.category_name}</span> 
            `
        })

    })



}










const loadNews = id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
}


loadNews()

const displayNews = (allNews => {

    function sortByViews(allNews) {
        return allNews.sort((a, b) => b.total_view - a.total_view);
    }
    sortByViews(allNews)

    const newsContainer = document.getElementById('newsSection')
    newsContainer.innerHTML = ``
    if (allNews.length < 1) {
        newsContainer.innerHTML = `
        <h1 class="text-center fw-bold text-primary">No news found</h1>    
        `
    }
    else {
        allNews.forEach(news => {
            const div = document.createElement('div')

            div.classList.add('card')
            div.classList.add('mb-3')

            // console.log(allNews);

            // console.log(news.title)
            // console.log(news.total_view)

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
                        <div class="next col-2"><button class="btn btn-primary" type="submit"> <i class="fa-solid fa-up-right-and-down-left-from-center"></i></button></div>
                    </div>
                </div>
            </div>
        `
            newsContainer.appendChild(div)
        })
    }
})


const blog = document.getElementById('blogtab')
const newsTab = document.getElementById('newstab')
const content = document.getElementById('content')
const blogContent = document.getElementById('blogContent')


// blog.addEventListener('click', () => {
//     main.classList.add('d-none');
//     blog.classList.add('text-primary fw-bold');
//     newsTab.classList.remove('text-primary fw-bold');

//     newsTab.addEventListener('click', () => {
//         main.classList.remove('d-none');
//         blog.classList.remove('text-primary fw-bold');
//     })
// })

function blogNav() {
    content.classList.add('d-none');
    blog.classList.add('active');
    newsTab.classList.remove('active');
    blogContent.classList.remove('d-none');

}
function newsNav() {
    content.classList.remove('d-none');
    blog.classList.remove('active');
    newsTab.classList.add('active');
    blogContent.classList.add('d-none');

}

// const displayNews = allNews => {
//     // const foundSection = document.getElementById('foundSection')
//     // console.log(allNews)

//     // const categoryRow = document.getElementById('category-row')
//     // const foundParagraph = document.createElement('p')
//     // foundParagraph.classList.add('my-5')
//     // foundParagraph.classList.add('bg-light')
//     // foundParagraph.classList.add('rounded')
//     // foundParagraph.classList.add('p-3')
//     // foundParagraph.classList.add('d-none')

//     // categoryRow.addEventListener('click', () => {
//     //     console.log(allNews)
//     //     foundParagraph.innerHTML = ``
//     //     foundParagraph.innerHTML = `
//     //         ${allNews} items found for category
//     //     `
//     //     foundSection.appendChild(foundParagraph)
//     // })

// }


