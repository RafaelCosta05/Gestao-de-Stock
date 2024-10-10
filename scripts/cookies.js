
// Função para obter cookies
function getCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].split("=");
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return null;
}

// Verificar se o nome do usuário está armazenado nos cookies
let username = getCookie("username");
if (!username) {
    // Se não houver cookie, redirecionar para a página de login
    window.location.href = "login.html";
}

function logout() {
    // Definir o cookie com um valor vazio e uma data de expiração no passado
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

    // Redirecionar o usuário para a página de login
    window.location.href = "login.html";
}