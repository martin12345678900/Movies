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
page('/', middlewareRenderContent, homePage);
page('/home', middlewareRenderContent, homePage);
page('/create', middlewareRenderContent, createPage);
page('/details/:movieId', middlewareRenderContent, detailsPage);
page('/edit/:movieId', middlewareRenderContent, editPage);
page('/login', middlewareSetNavigationForRegisterLoginPage, middlewareRenderContent, loginPage);
page('/register', middlewareSetNavigationForRegisterLoginPage, middlewareRenderContent, registerPage);

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
// setup user navigation and start the router
setNavigationForUser();
page.start();


function middlewareSetNavigationForRegisterLoginPage(context, next) {
    context.setUserNav = setNavigationForUser;
    next();
}
function middlewareRenderContent(context, next) {
    context.renderContent = (content) => render(content, document.querySelector('#container'));
    next();
}

function logout(ev) {
    sessionStorage.clear();
    setNavigationForUser();
    
    if (window.location.pathname !== '/home') {
        page.redirect('/home');
    }
}
