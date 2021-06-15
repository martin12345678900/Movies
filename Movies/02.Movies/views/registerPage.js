import { html } from 'https://unpkg.com/lit-html?module';
import { registerUser } from '../requests/requests.js';

const registerpageTemplate = (onClick) => html`    
<section id="form-sign-up">
    <form class="text-center border border-light p-5"></form>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>

        <div class="form-group">
            <label for="repeatPassword">Repeat Password</label>
            <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="">
        </div>

        <button @click=${onClick} type="submit" class="btn btn-primary">Register</button>
    </form>
</section>`;

export default async function registerPage(context) {
    context.renderContent(registerpageTemplate(onClick));

    async function onClick(event) {
        event.preventDefault();
        
        const [email, password, repeatPassword] = [...event.target.parentNode.querySelectorAll('input')];

        if (email.value == '' || password.value == '' || repeatPassword.value == '') {
            return alert('All fields are required!');
        } else if (password.value !== repeatPassword.value) {
            return alert('Passwords don\'t match!');
        }

        const userData = await registerUser({email: email.value, password: password.value});
        sessionStorage.setItem('authToken', userData.accessToken);
        sessionStorage.setItem('userId', userData._id);
        sessionStorage.setItem('email', userData.email);

        context.setUserNav();
        return context.page.redirect('/home');
    }
}