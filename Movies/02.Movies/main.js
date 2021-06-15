// Import needed libraries
import page from '//unpkg.com/page/page.mjs';
import { render } from 'https://unpkg.com/lit-html?module';

//Import view(page) handlers
import homePage from './views/homePage.js';
import createPage from './views/createPage.js';
import detailsPage from './views/detailsPage.js';
import editPage from './views/editPage.js';
import loginPage from './views/loginPage.js';
import registerPage from './views/registerPage.js';


// Configurate the routes in the routing table
page('/', middlewareDecorateContextFunction, homePage);
page('/home', middlewareDecorateContextFunction, homePage);
page('/create', middlewareDecorateContextFunction, createPage);
page('/details/:movieId', middlewareDecorateContextFunction, detailsPage);
page('/edit/:movieId', middlewareDecorateContextFunction, editPage);
page('/login', middlewareDecorateContextFunction, loginPage);
page('/register', middlewareDecorateContextFunction, registerPage);

document.querySelector('#logout').addEventListener('click', logout);
const setNavigationForUser = () => {
    const email = sessionStorage.getItem('email');
    if (email) {
        [...document.querySelectorAll('.user')].forEach(user => user.style.display = 'block');
        [...document.querySelectorAll('.guest')].forEach(guest => guest.style.display = 'none');
        document.querySelector('nav > ul > li > span > a').textContent = `Welcome again, ${email}`;
        return;
    }
    [...document.querySelectorAll('.user')].forEach(user => user.style.display = 'none');
    [...document.querySelectorAll('.guest')].forEach(guest => guest.style.display = 'block');
}
// Start My Application and setup user navigation
page.start();
setNavigationForUser();

function middlewareDecorateContextFunction(context, next) {
    context.renderContent = (content) => render(content, document.querySelector('#container'));
    context.setUserNav = setNavigationForUser;

    next();
}

function logout(ev) {
    ev.preventDefault();
    sessionStorage.clear();
    setNavigationForUser();
    page.redirect('/home');
}