import{a as y,S as g,i as c}from"./assets/vendor-951421c8.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const m=async(s,r)=>{try{return(await y.get("https://pixabay.com/api/",{params:{key:"35439381-dc6c31f5e4218074de9a0ab23",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:r}})).data}catch(a){return a.message}},t={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMore:document.querySelector(".loadMore")};let f=new g(".gallery-item a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250}),i=1,d="",u=0;t.form.addEventListener("submit",b);t.loadMore.addEventListener("click",L);async function b(s){s.preventDefault(),t.loadMore.classList.add("is-hidden"),t.loader.classList.remove("is-hidden"),t.gallery.innerHTML="",d=t.form.elements.search.value.trim(),i=1;try{const r=await m(d,i);if(r.hits.length===0)return t.loader.classList.add("is-hidden"),t.form.reset(),c.error({position:"topRight",title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});{const a=p(r.hits);t.gallery.insertAdjacentHTML("beforeend",a),f.refresh(),u=Math.ceil(r.totalHits/40),i<u&&t.loadMore.classList.remove("is-hidden")}}catch(r){console.log(r),c.error({position:"topRight",title:"Error",message:r.message})}t.loader.classList.add("is-hidden"),t.form.reset()}async function L(){i+=1,t.loader.classList.remove("is-hidden");try{const s=await m(d,i),r=p(s.hits);t.gallery.insertAdjacentHTML("beforeend",r),f.refresh(),i>=u&&(t.loadMore.classList.add("is-hidden"),c.warning({message:"We're sorry, but you've reached the end of search results."}))}catch(s){c.error({position:"topRight",title:"Error",message:s.message})}t.loader.classList.add("is-hidden")}function p(s){return s.map(({largeImageURL:r,webformatURL:a,tags:n,likes:e,views:o,comments:l,downloads:h})=>`<li class="gallery-item"> 
            <a class="gallery-link" href="${r}">
                <img class="gallery-image" src="${a}" alt="${n}" />
                <div class="wrap">
                    <p><b>Likes:</b> </br>${e}</p>
                    <p><b>Views:</b> </br>${o}</p>
                    <p><b>Coments:</b> </br>${l}</p>
                    <p><b>Downloads:</b> </br>${h}</p>
                </div>
            </a>
        </li>`).join("")}
//# sourceMappingURL=commonHelpers.js.map