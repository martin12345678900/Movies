import { loaderTemplate, movieTemplate } from '../common/common.js';
import { html } from 'https://unpkg.com/lit-html?module';
import { getAllMovies } from '../requests/requests.js';
import { until } from '//unpkg.com/lit-html/directives/until?module';

const homepageTemplate = (movies, isLogged) => html`
    <div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40;">
        <img src="https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg"
            class="img-fluid" alt="Responsive image" style="width: 150%; height: 200px">
        <h1 class="display-4">Movies</h1>
        <p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
    </div>
        <h1 class="text-center">Movies</h1>
        ${ isLogged ? html`<a href="/create" class="btn btn-warning ">Add Movie</a>` : '' }
        <div class=" mt-3 ">
            <div class="row d-flex d-wrap">
                <div class="card-deck d-flex justify-content-center">
                    ${ movies.map(movieTemplate) }
                </div>
            </div>
        </div>`;


export default async function homePage(context) {
    const returnHomepageTemplate = async () => homepageTemplate(await getAllMovies(), sessionStorage.getItem('userId') != null ? true : false);

    context.renderContent(until(returnHomepageTemplate(), loaderTemplate()));
}