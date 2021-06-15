import { html } from 'https://unpkg.com/lit-html?module';

export const loaderTemplate = () => html`<article id='loader'><p >Loading, please wait&hellip;</p></article>`;

export const movieTemplate = (movie) => html`                    
<div class="card mb-4">
    <img class="card-img-top" src=${movie.img}
        alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <a href="/details/${movie._id}">
            <button type="button" class="btn btn-info">Details</button>
        </a>
    </div>
</div>`;
