import axios from 'axios';
export default class apiService {
    constructor(){
        this.searchQuery = "";
        this.page = 1;

    }
    async getUser1() {
        try {
          
          const response = await axios.get('https://pixabay.com/api/',
          {
            params: {
              key: "31842853-978e72f35827287bca0aab5ce",
              q: `${this.searchQuery}`,
              image_type: "photo",
              orientation: "horizontal",
              safesearch: "true",
              page: `${this.page}`,
              per_page: 40,
            }
          });
          this.page += 1;
         return response.data;
      
          //console.log(data);
        //   listPhoto.insertAdjacentHTML('beforeend', createMarkupGallery(data.hits));
        } catch (error) {
          console.error(error);
        }
      }

      get query() {
        return this.searchQuery;
    };


    set query(newQuery) {
        this.searchQuery = newQuery;
    }
    // resetPage() {
    //     this.page = 1;
    //}


}
// const listPhoto = document.querySelector('.gallery');

//   function createMarkupGallery(arr){
//     return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `<div class="photo-card">
//      <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" class="picture"  /></a>
//       <div class="info">
//         <p class="info-item">
//           <b>Likes</b> ${likes}
//         </p>
//         <p class="info-item">
//           <b>Views</b> ${views}
//         </p>
//         <p class="info-item">
//           <b>Comments</b> ${comments}
//         </p>
//         <p class="info-item">
//           <b>Downloads</b> ${downloads}
//         </p>
//       </div>
//     </div>`).join('')
//   }