window.onload = function() {
    login();
}

function login() {
    document.getElementById("loginForm").addEventListener("submit", function(event){
        // Impede o envio padrão do formulário
        event.preventDefault();
         
        //inputs do form login
        const inputUsername = document.getElementById("username");
        const inputPassword = document.getElementById("password");
        
        //variaveis auxiliares para receber valor dos inputs
        let username = inputUsername.value;
        let password = inputPassword.value;
        
        //utilizador
        const correctUsername = "Admin";
        const correctPassword = "Admin@0011";
        
        //se o username e password cria a cookie
        if (username === correctUsername && password === correctPassword) {
            // Armazenar o nome do usuário nos cookies por 8 horas
            let dataExpira = new Date();
            dataExpira.setTime(dataExpira.getTime() + (8 * 60 * 60 * 1000));
            document.cookie = `username=${username}; expires=${dataExpira.toUTCString()}; path=/`;
            
            // Redirecionar para a página principal
            window.location.href = "index.html";
        } else if (username !== correctUsername) {
            // Se o username estiver incorreto
            inputUsername.focus();
            //adiciona o class "erro-login" para input ficar a vermelho
            //e envia uma mensagem de erro
            inputUsername.classList.add('erro-login');
            mensagemLogin.innerHTML = `<i class="bx bx-error-circle error-message"></i> O username está errado`;
            mostraMensagemLogin(2000, 'error');
            return;
        } else if (password !== correctPassword) {
            // Se a password estiver incorreta

            //verifica se o username esta correto se tiver remove
            //o vermelho do input
            if (username === correctUsername) {
                inputUsername.classList.remove('erro-login');
            }
            inputPassword.focus();
            inputPassword.classList.add('erro-login');
            mensagemLogin.innerHTML = `<i class="bx bx-error-circle error-message"></i> A password está errada`;
            mostraMensagemLogin(2000, 'error');
            return;
        }

        const todosErros = document.querySelectorAll('.erro-login');
        //se fizer login remove a class "erro" dos inputs do login
        todosErros.forEach(erro => {
            erro.classList.remove('.erro-login');
        });
    });
}

//variavel para ir buscar a mensagem
const mensagemLogin = document.querySelector('.mensagem-login');

function mostraMensagemLogin (tempo) {
    //mostra a mensagem de erro no login
    mensagemLogin.classList.add('visible')
    //atribui o tempo da mensagem e depois de acabar o tempo volta a esconder
    //a mensagem
    setTimeout(() => {
        mensagemLogin.classList.remove('visible')
    }, tempo);
}