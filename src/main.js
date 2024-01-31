import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import search from "./search";


const refs = {
    form : document.querySelector('.form'),
    gallery : document.querySelector('.gallery'),
    loader: document.querySelector('.loader'),
    loadMore: document.querySelector('.loadMore'),
}
    

let gallery = new SimpleLightbox('.gallery-item a',
                    {   captionsData: 'alt',
                        captionPosition: 'bottom',
        captionDelay: 250
    });
                        
let page = 1;
let searchQuery = '';
let maxPage = 0;

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMore.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(event) {
    event.preventDefault();

    refs.loadMore.classList.add('is-hidden');
    refs.loader.classList.remove('is-hidden');
    refs.gallery.innerHTML = '';
    
    searchQuery = refs.form.elements.search.value.trim();
    page = 1;

    try {
        const data = await search(searchQuery, page);
            if (data.hits.length === 0) {
                return iziToast.error({
                    position: 'topRight',
                    title: 'Error',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                })
            } else {
                const mark = markup(data.hits);
                refs.gallery.insertAdjacentHTML('beforeend', mark);
                gallery.refresh();

                maxPage = Math.ceil(data.totalHits / 40);
                if (page < maxPage) {
                    refs.loadMore.classList.remove('is-hidden');
                }}
    } catch(error) {
            console.log(error)
		    iziToast.error({
                    position: 'topRight',
                    title: 'Error',
                    message: error.message,
                })
    }
    refs.loader.classList.add('is-hidden')
    refs.form.reset();
}

async function onLoadMoreClick() {
    page += 1;
    refs.loader.classList.remove('is-hidden');

    try {
        const data = await search(searchQuery, page);
        const markupGallery = markup(data.hits)
        refs.gallery.insertAdjacentHTML('beforeend', markupGallery);
        gallery.refresh();
        
        if (page >= maxPage) {
            refs.loadMore.classList.add('is-hidden')
            iziToast.warning({
            message: "We're sorry, but you've reached the end of search results.",
            });
        }
    } catch(error)  {
		    iziToast.error({
                    position: 'topRight',
                    title: 'Error',
                    message: error.message,
                })
    }
    
    refs.loader.classList.add('is-hidden');    
}

function markup(arr) {
    return arr.map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
        return `<li class="gallery-item"> 
            <a class="gallery-link" href="${largeImageURL}">
                <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
                <div class="wrap">
                    <p><b>Likes:</b> </br>${likes}</p>
                    <p><b>Views:</b> </br>${views}</p>
                    <p><b>Coments:</b> </br>${comments}</p>
                    <p><b>Downloads:</b> </br>${downloads}</p>
                </div>
            </a>
        </li>`
    }).join('')

   
}

function closeBtnLoadMore() {
    
}
