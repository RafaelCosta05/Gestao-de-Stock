
// Função para obter cookies
function getCookie(username) {
    //faz um split dos cookies por ";", porque
    //os cookies são armazenados num string separados por ";"
    let cookies = document.cookie.split("; ");
    //percorre o array dos cookies
    for (let i = 0; i < cookies.length; i++) {
        //verifica o cookie divindo entre nome e valor pois,
        //sao armazenados nome=valor
        let cookie = cookies[i].split("=");
        //cookie[0], e o username armazenado na cookie, entao verifica,
        //se e igual ao valor que foi enviada para esta função 
        if (cookie[0] === username) {
            return cookie[1];
            //se corresponder envia o valor da cookie, cookie[1]
        }
    }
    //senao encontrar retorna nulo
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