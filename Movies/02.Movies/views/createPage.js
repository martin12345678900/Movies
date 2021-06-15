import { html } from 'https://unpkg.com/lit-html?module';
import { createMovie } from '../requests/requests.js';

const createpageTemplate = (onSubmit) => html`    
<section id="add-movie">
    <form @submit=${onSubmit} class="text-center border border-light p-5" action="#" method="">
        <h1>Add Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Title" name="title" value="">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Description" name="description"></textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" class="form-control" placeholder="Image Url" name="imageUrl" value="">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</section>`;

export default async function createPage(context) {
    context.renderContent(createpageTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const [title, description, imageUrl] = [...new FormData(event.target).values()];
    
        if (title == '' || description == '' || imageUrl == '') {
            return alert('All fileds are required!');
        }
    
        await createMovie({title, description, imageUrl});
        return context.page.redirect('/home');
    }
}