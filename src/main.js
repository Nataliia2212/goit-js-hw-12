import axios from "axios";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import search from "./search";


console.log('first')

const formRef = document.querySelector('.form');
const galleryRef = document.querySelector('.gallery');
const loaderRef = document.querySelector('.loader');

let gallery = new SimpleLightbox('.gallery-item a',
                    {   captionsData: 'alt',
                        captionPosition: 'bottom',
                        captionDelay: 250});

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    galleryRef.innerHTML = '';
    loaderRef.classList.remove('is-hidden');
    const searchQuery = formRef.elements.search.value.trim();

    search(searchQuery)
        .then(data => {
            if (data.hits.length === 0) {
                return iziToast.error({
                    position: 'topRight',
                    title: 'Error',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                })
            } else {
                markup(data.hits)
                gallery.on('show.simplelightbox');
                gallery.refresh();
            }
            
        })
        .catch(error => {
		    console.log(error);
        }).finally(() => {
            loaderRef.classList.add('is-hidden')
        });
    
    formRef.reset();
}

function markup(arr) {
    const mark  = arr.map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
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

    galleryRef.innerHTML = mark;
}


