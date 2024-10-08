//Função redirecionar para a sidebar
function redirecionar(id) {
    let id_a = id
    let a = document.getElementById(id_a);
    a.setAttribute('href', './' + id_a + '.html');
}

//Função redirecionar para a navbarbar
function redirecionarNav(id) {
    let id_a = id
    let a = document.querySelector('.' + id_a);
    a.setAttribute('href', './' + id_a + '.html');
}

//Evet«nto click no icon para mostar navbar
let menuIcon = document.querySelector('#menu-icon');
const navbar = document.getElementById('navbar');

menuIcon.onclick = () => {
    navbar.classList.toggle('active');
}   