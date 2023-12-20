export default function MovieSection({genreId, movies}) {

  return (
    <section>
      <p>{genreId}</p>
      <div>
        {movies && movies.map(movie=><p key={movie.title}>{movie.title}</p>)}
      </div>
    </section>
  );
}