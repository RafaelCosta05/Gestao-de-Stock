window.onload = function() {
    apresentaSaudacao();
}

function updateClock() {
    const now = new Date();

    // Obter o nome do dia da semana e o nome do mês
    const dayName = now.toLocaleString('pt-BR', { weekday: 'long' });
    const day = now.getDate();
    const monthName = now.toLocaleString('pt-BR', { month: 'long' });
    const year = now.getFullYear();

    // Obter a hora, minuto e segundo
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    // Formatar a data por extenso
    const formattedTime = `${dayName}, ${day} de ${monthName}, ${hours}:${minutes}:${seconds}`;

    document.getElementById('clock').textContent = formattedTime;
}

setInterval(updateClock, 1000);
updateClock();


const correctUsername = "Admin";  // substitua com seu nome real
const correctPassword = "Admin@0011";  // escolha sua senha

const h1Saudacao = document.querySelector('.welcome');

function apresentaSaudacao() {
    console.log(h1Saudacao);
    h1Saudacao.style.display = "block";
    h1Saudacao.innerHTML = `Bem vindo, <span class="spanUsername">${correctUsername}</span>`;
}