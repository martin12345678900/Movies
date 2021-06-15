import { html } from 'https://unpkg.com/lit-html?module';
import { loginUser } from '../requests/requests.js';

const loginpageTemplate = (onClick) => html`    
<section id="form-login">
    <form class="text-center border border-light p-5"></form>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>

        <button @click=${onClick} type="submit" class="btn btn-primary">Login</button>
    </form>
</section>`;



export default async function loginPage(context) {
    context.renderContent(loginpageTemplate(onClick));

    async function onClick(event) {
        event.preventDefault();
        const [email, password] = [...event.target.parentNode.querySelectorAll('input')];

        const userData = await loginUser({email: email.value, password: password.value});
        sessionStorage.setItem('authToken', userData.accessToken);
        sessionStorage.setItem('userId', userData._id);
        sessionStorage.setItem('email', userData.email);

        context.setUserNav();
        return context.page.redirect('/home');
    }
}