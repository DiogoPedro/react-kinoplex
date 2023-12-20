import Movie from './Movie';

export default class PageMovie {
  
  //Propriedades
  page;
  results;
  total_pages;
  total_results;

  constructor(page_data) {

    //Se page_data for diferente de null
    if(page_data){
      this.page = page_data.page || 0;
      this.results = (page_data.results || []).map(movie_data => new Movie(movie_data));
      this.total_pages = page_data.total_pages || 0;
      this.total_results = page_data.total_results || 0;
    }
  }
}
