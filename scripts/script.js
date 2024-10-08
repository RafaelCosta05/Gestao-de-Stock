function redirecionar(id) {
    let id_a = id
    let a = document.getElementById(id_a);
    a.setAttribute('href', './' + id_a + '.html');
}

function redirecionarNav(id) {
    let id_a = id
    let a = document.querySelector('.' + id_a);
    console.log(id_a)
    a.setAttribute('href', './' + id_a + '.html');
}

let menuIcon = document.querySelector('#menu-icon');
const navbar = document.getElementById('navbar');

menuIcon.onclick = () => {
    navbar.classList.toggle('active');
}   