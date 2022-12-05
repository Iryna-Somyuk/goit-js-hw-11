import './css/styles.css';
import apiService from './fetctSubmit';


// const refs = {
//     form: document.querySelector(".search-form"),
//     input: document.querySelector("[name=searchQuery]"),
//     formBtn: document.querySelector("button"),
//     gallery: document.querySelector(".gallery"),
//     loadMoreBtn: document.querySelector(".load-more"),  
//   }


//const BASE_URL = 'https://pixabay.com/api/';
//refs.input.addEventListener('input', getUser());

//  axios.get('${BASE_URL}', {
//         params: {
//             key: "31842853-978e72f35827287bca0aab5ce",
// 	            q: `yellow+flowers`,
// 	            image_type: "photo",
// 	            orientation: "horizontal",
// 	            safesearch: "true",
//         }
//       })
//       .then((response) => {console.log(response.data)})
//       .catch ((error) => {
//       console.error(error)
//     });

// async function getUser(){
//     const resp = await fetch('https://pixabay.com/api/?key=31842853-978e72f35827287bca0aab5ce&q=yellow+flowers&image_type=photo&orientation=horizontal&safesearch=true');
//               console.log(resp);
//    const pic = await resp.json();
//    console.log(pic);           
// }
// getUser();
//const listPhoto = document.querySelector('.gallery');
const form = document.querySelector(".search-form");

const searchBtn = document.querySelector("button");
const loadBtn = document.querySelector('.load-more')

loadBtn.addEventListener('click', onLoad);
form.addEventListener('submit', onSearch);
const apiService = new apiService();

loadBtn.hidden = true;
function onSearch(evn){
  evn.preventDefault();
  apiService.query = evn.currentTarget.elements.searchQuery.value;
  console.log(apiService.query);
apiService.getUser1().then((data) => {
  console.log(data)
});



}

function onLoad(){
  apiService.getUser1();
  }
  





//31842853-978e72f35827287bca0aab5ce
// {
//   params: {
//       key: "31842853-978e72f35827287bca0aab5ce",
//         q: `yellow+flowers`,
//         image_type: "photo",
//         orientation: "horizontal",
//         safesearch: "true",
//   }
// }