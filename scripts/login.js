window.onload = function() {
    login();
}

function login() {
    document.getElementById("loginForm").addEventListener("submit", function(event){
        event.preventDefault();  // Impede o envio padrão do formulário
         
        const inputUsername = document.getElementById("username");
        const inputPassword = document.getElementById("password");
        
        let username = inputUsername.value;
        let password = inputPassword.value;
        
        const correctUsername = "Admin";  // substitua com seu nome real
        const correctPassword = "Admin@0011";  // escolha sua senha
        
        if (username === correctUsername && password === correctPassword) {
            // Armazenar o nome do usuário nos cookies por 12 horas
            let expiryDate = new Date();
            expiryDate.setTime(expiryDate.getTime() + (12 * 60 * 60 * 1000));
            document.cookie = `username=${username}; expires=${expiryDate.toUTCString()}; path=/`;
            
            // Redirecionar para a página principal
            window.location.href = "index.html";
        } else if (username !== correctUsername) {
            // Se o username estiver incorreto
            inputUsername.focus();
            inputUsername.classList.add('erro-login');
            mensagemLogin.innerHTML = `<i class="bx bx-error-circle error-message"></i> O username está errado`;
            mostraMensagemLogin(2000, 'error');
            return;
        } else if (password !== correctPassword) {
            // Se a password estiver incorreta
            if (username === correctUsername) {
                inputUsername.classList.remove('erro-login');
            }
            inputPassword.focus();
            inputPassword.classList.add('erro-login');
            mensagemLogin.innerHTML = `<i class="bx bx-error-circle error-message"></i> A password está errada`;
            mostraMensagemLogin(2000, 'error');
            return;
        }
        
        todosErros.forEach(erro => {
            erro.classList.remove('.erro-login');
        });
    });
}
const mensagemLogin = document.querySelector('.mensagem-login');
const todosErros = document.querySelectorAll('.erro-login');

function mostraMensagemLogin (tempo) {
    //mostra-se a imagem mudando o display da mesma
    mensagemLogin.classList.add('visible')
    //atribui o tempo da mensagem e depois de acabar o tempo volta a esconder
    //a mensagem
    setTimeout(() => {
        mensagemLogin.classList.remove('visible')
    }, tempo);
}