var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},i=e.parcelRequired7c6;null==i&&((i=function(e){if(e in r)return r[e].exports;if(e in n){var i=n[e];delete n[e];var o={id:e,exports:{}};return r[e]=o,i.call(o.exports,o,o.exports),o.exports}var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}).register=function(e,r){n[e]=r},e.parcelRequired7c6=i);var o=i("jXXA5"),t=i("2Tlgh"),s=i("hQJwd"),a=i("krGWQ"),c=i("cky31");function d(){a.refs.loader.classList.add("active"),a.refs.containerCardMovies.classList.add("hide")}function l(){a.refs.loader.classList.remove("active"),a.refs.containerCardMovies.classList.remove("hide")}function f(){a.refs.notification.classList.remove("is-visible")}(a=i("krGWQ")).refs.containerCardMovies.addEventListener("click",(function(e){if(e.preventDefault(),e.target.classList.contains("js-info")){const{id:r}=e.target.closest("[data-id]").dataset;let n=(0,o.findTrendInfoForMovie)(Number(r));n||(n=(0,o.findInfoForMovie)(Number(r)),console.log(n)),(0,t.createModal)(n)}}));let v="";a.refs.formBoxes.addEventListener("submit",(async function(e){e.preventDefault(),v=e.currentTarget.elements.query.value,(0,s.resetPage)(),f(),void(a.refs.containerCardMovies.innerHTML=""),""===v&&a.refs.notification.classList.add("is-visible");(0,s.resetPage)(),d(),(0,o.searchMovies)(v).then((async e=>{a.refs.containerCardMovies.innerHTML=await(0,c.createMarkupMovies)(e),console.log(e)})).finally(l)})),window.onload=async function(){d();const e=await(0,o.loadTrending)();l(),a.refs.containerCardMovies.innerHTML=await(0,c.createMarkupMovies)(e)};new IntersectionObserver((e=>{e.forEach((e=>{if(e.isIntersecting){if(console.log("Intersecting"),!v)return;(0,o.searchMovies)(v).then((async e=>{a.refs.containerCardMovies.insertAdjacentHTML("beforeend",await(0,c.createMarkupMovies)(e))}))}}))}),{rootMargin:"200px",threshold:.5}).observe(document.querySelector(".scroll-guard"));
//# sourceMappingURL=index.d6244004.js.map
