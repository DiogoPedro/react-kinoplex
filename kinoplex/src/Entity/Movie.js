export default class Movie {

  //Propriedades
  adult;
  backdrop_path;
  genre_ids;
  id;
  original_language;
  original_title;
  overview;
  popularity;
  poster_path;
  release_date;
  title;
  video;
  vote_average;
  vote_count;
  price;

    constructor(data) {
      this.adult = data.adult || false;
      this.backdrop_path = data.backdrop_path || "";
      this.genre_ids = data.genre_ids || [];
      this.id = data.id || 0;
      this.original_language = data.original_language || "";
      this.original_title = data.original_title || "";
      this.overview = data.overview || "";
      this.popularity = data.popularity || 0.0;
      this.poster_path = data.poster_path || "";
      this.release_date = data.release_date || "";
      this.title = data.title || "";
      this.video = data.video || false;
      this.vote_average = data.vote_average || 0.0;
      this.vote_count = data.vote_count || 0;
      this.price = data.price || 0.0;
    }
}