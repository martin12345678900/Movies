import { html } from 'https://unpkg.com/lit-html?module';
import { updateMovie } from '../requests/requests.js';

const editpageTemplate = (onSumbit) => html`    
<section id="edit-movie">
    <form @submit=${onSumbit} class="text-center border border-light p-5" action="#" method="">
        <h1>Edit Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Movie Title" value="" name="title">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Movie Description..." name="description"></textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" class="form-control" placeholder="Image Url" value="" name="imageUrl">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</section>`;

export default async function editPage(context) {
    const movieId = context.params.movieId;
    context.renderContent(editpageTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const [title, description, imageUrl] = [...new FormData(event.target).values()];

        if ([...new FormData(event.target).values()].some(value => value.trim() == '')) {
            return alert('All fields are required!');
        }

        await updateMovie(movieId, {title, description, imageUrl});
        return context.page.redirect(`/details/${movieId}`);
    }
}