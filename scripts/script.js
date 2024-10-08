function redirecionar(id) {
    let id_a = id
    let a = document.getElementById(id_a);
    a.setAttribute('href', id_a + '.html');
}
