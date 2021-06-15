import { html } from 'https://unpkg.com/lit-html?module';
import { loaderTemplate } from '../common/common.js';
import { getMovieById, deleteMovie, addLike, getNumberOfLikesOfMovie, getLikeForMovieForSpecificUser } from '../requests/requests.js';
import { until } from '//unpkg.com/lit-html/directives/until?module';

const detailspageTemplate = (movie, onDelete, onLike, numberOfLikes, numberOfLikesForUser) => html`    
<section id="movie-example">
    <div class="container">
        <div class="row bg-light text-dark">
            <h1>Movie title: ${movie.title}</h1>

            <div class="col-md-8">
                <img class="img-thumbnail" src=${movie.img}
                     alt="Movie">
            </div>
            <div class="col-md-4 text-center">
                <h3 class="my-3 ">Movie Description</h3>
                <p>${movie.description}</p>
                ${ 
                    sessionStorage.getItem('userId') == movie._ownerId
                    ? html`                
                    <a @click=${onDelete} class="btn btn-danger" href="javascript:void(0)">Delete</a>
                    <a class="btn btn-warning" href="/edit/${movie._id}">Edit</a>
                    `
                    : sessionStorage.getItem('userId') !== null && numberOfLikesForUser < 1 ? html`<a @click=${onLike} class="btn btn-primary" href="javascript:void(0)">Like</a>` : ''
                 }
                <span class="enrolled-span">Liked ${numberOfLikes}</span>
            </div>
        </div>
    </div>
</section>`;


export default async function detailsPage(context) {
    const movieId = context.params.movieId;
    
    async function onDelete() {
        if (confirm('Are u sure u want to delete the movie from the collection?!')) {
            await deleteMovie(movieId);
            return context.page.redirect('/home');
        }
    }

    async function onLike() {
        await addLike({ movieId });
        return context.page.redirect(`/details/${movieId}`);
    }

    const returnDetailspageTemplate = async () =>  {
        const [movieById, numberOfLikesOfMovie, likeForMovieForSpecificUser] = await Promise.all([
            getMovieById(movieId),
            getNumberOfLikesOfMovie(movieId),
            getLikeForMovieForSpecificUser(movieId, sessionStorage.getItem('userId'))
        ]);

        return detailspageTemplate(movieById, onDelete, onLike, numberOfLikesOfMovie, likeForMovieForSpecificUser);
    }

    return context.renderContent(until(returnDetailspageTemplate(), loaderTemplate()));
}