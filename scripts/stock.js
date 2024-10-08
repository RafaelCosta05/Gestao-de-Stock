//Função para carregar os eletrodomesticcos do localStorage
//ao carregar a página no browser
window.onload = function() {
    carregaLocalStorage();
    esconderInputs();
}

//Função para ordenar por quantidade
function ordenar(ordenacao) {
    //envia o valor "asc" ou "desc" para a função de carregar os produtos
    carregaLocalStorage(ordenacao);
}

//Função para guardar no local storage
function guardaLocalStorage() {
    const produtos = [];
    
    document.querySelectorAll('.produto').forEach(produto => {
        let tableIdProduto = produto.querySelector('.tdIdProduto').textContent;
        let tableNomeProduto = produto.querySelector('.tdNomeProduto').textContent;
        let tableMarcaProduto = produto.querySelector('.tdMarcaProduto').textContent;
        let tableModeloProduto = produto.querySelector('.tdModeloProduto').textContent;
        let tablePrecoProduto = produto.querySelector('.tdPrecoProduto').textContent;
        let tableQuantidadeProduto = produto.querySelector('.tdQuantidadeProduto').textContent;

        produtos.push({
            tableId_Produto: tableIdProduto,
            tableNome_Produto: tableNomeProduto,
            tableMarca_Produto: tableMarcaProduto,
            tableModelo_Produto: tableModeloProduto,
            tablePreco_Produto: tablePrecoProduto,
            tableQuantidade_Produto: tableQuantidadeProduto
        });
    });
    localStorage.setItem('tr-produto', JSON.stringify(produtos))
}

//Função para carregar local storage
//se não for passado nenhum valor ao chamar esta função
//o valor padrão será null
function carregaLocalStorage(ordenar = null){

    const produtosStorage = localStorage.getItem('tr-produto');

    //verifica se tem eletrodomesticos se tiver avança
    if(produtosStorage && produtosStorage !== "[]"){
        const produtos = JSON.parse(produtosStorage);

        // Verifica se precisa ordenar e qual tipo de ordenação (asc ou desc)
        //vai comparar pares de produtos do array 'produtosStorage'
        if (ordenar === 'asc') {
            //se a for menor que b, então signfica que a vem primeiro que b
            produtos.sort((a, b) => a.tableQuantidade_Produto - b.tableQuantidade_Produto);
        } else if (ordenar === 'desc') {
            //se b for menor que a, então signfica que b vem primeiro que a
            produtos.sort((a, b) => b.tableQuantidade_Produto - a.tableQuantidade_Produto);
        }

        tableBodyProduto.innerHTML = "";

        //cria um tr por cada eletrodomestico guardado no localStorage
        produtos.forEach(produto => {
            let tr = document.createElement('tr');
            tr.setAttribute('class', 'produto');

        //insere no tr criado os valores que estão no local storage
        tr.innerHTML = `
            <td data-cell="Id" class="tdIdProduto">${produto.tableId_Produto}</td>
            <td data-cell="Nome" class="tdNomeProduto">${produto.tableNome_Produto}</td>
            <td data-cell="Marca" class="tdMarcaProduto">${produto.tableMarca_Produto}</td>
            <td data-cell="Modelo" class="tdModeloProduto">${produto.tableModelo_Produto}</td>
            <td data-cell="Preço" class="tdPrecoProduto">${produto.tablePreco_Produto}</td>
            <td data-cell="Quantidade" class="tdQuantidadeProduto">${produto.tableQuantidade_Produto}</td>
            <td class="actions">
                <button class="editar" onclick="editarProduto(this)">
                    <i class='bx bx-pencil'></i>
                </button>
                <button class="remover" onclick="apagarProduto(this)">
                    <i class='bx bx-trash'></i>
                </button>
            </td>
        `;
        
        //adiciona o tr ao body da table
        tableBodyProduto.append(tr);
            //verifica se a quantidade em stock e inferior a 2 se for passa a color para vermelho
            if(produto.tableQuantidade_Produto < 2) {
                tr.querySelector('.tdQuantidadeProduto').style.color = "var(--color-danger)";
            }
        });
    } else {
        //se nao houver produtos devolve uma mensagem
        mensagemProduto.style.marginBottom = "1rem";
        mensagemProduto.innerHTML = `<i class="bx bx-error-circle error-message"></i> Não existem eletrodomésticos em stock`;
        mostraMensagemProduto(7000, 'error');
    }
}

//Função para apresentar a mensagem adequada
function mostraMensagemProduto(tempo, cor) {
    //mostra-se a imagem mudando o display da mesma
    mensagemProduto.style.display = "block";

    //se a o paramaetro passado for "error" devolve a mensagem a vermelho
    if(cor === "error") {
        mensagemProduto.style.color = "var(--color-danger)"
    }
    //se a o paramaetro passado for "success" devolve a mensagem a verde
    if(cor === "success") {
        mensagemProduto.style.color = "var(--color-success)"
    }

    //atribui o tempo da mensagem e depois de acabar o tempo volta a esconder
    //a mensagem
    setTimeout(() => {
        mensagemProduto.style.display = "none";
    }, tempo);
}

//Função para mostrar os inputs para adicionar/editar um produto
function mostrarInputs() {
    let divInputsProdutos = document.querySelector('.inputs-produtos');
    let botaoMostrar = document.querySelector('.mostrar-inputs-produto');
    let botaoVoltar = document.querySelector('.esconder-inputs-produto');

    divInputsProdutos.style.display = "flex";
    botaoMostrar.style.display = "none";
    botaoVoltar.style.display = "flex";

    //quando esconde os inputs, os campos são limpos
    nomeProduto.value = "";
    marcaProduto.value = "";
    modeloProduto.value = "";
    precoProduto.value = "";
    quantidadeProduto.value = "";
}

//Função para esconder os inputs para adicionar/editar um produto
function esconderInputs() {
    let divInputsProdutos = document.querySelector('.inputs-produtos');
    let botaoMostrar = document.querySelector('.mostrar-inputs-produto');
    let botaoVoltar = document.querySelector('.esconder-inputs-produto');

    divInputsProdutos.style.display = "none";
    botaoMostrar.style.display = "block";
    botaoVoltar.style.display = "none";

    //sempre que esconde os inputs "limpa" retriar os inputs que ficaram
    //com a classe ".erro-input"
    let todosErrosInput = document.querySelectorAll('.erro-input');
    todosErrosInput.forEach(erro => {
        erro.classList.remove('erro-input');
    });
}

//Variáveis para os inputs de adicionar/editar
const nomeProduto = document.querySelector('.nomeProduto');
let editarNomeProduto = "";
const marcaProduto = document.querySelector('.marcaProduto');
let editarMarcaProduto = "";
const modeloProduto = document.querySelector('.modeloProduto');
let editarModeloProduto = "";
const precoProduto = document.querySelector('.precoProduto');
let editarPrecoProduto = "";
const quantidadeProduto = document.querySelector('.quantidadeProduto');
let editarQuantidadeProduto = "";

//variavel botão, mensagem e body da table
const botaoAdicionarProduto = document.querySelector('.botao-adicionar-produto');
const mensagemProduto = document.querySelector('.mensagem-produto');
const tableBodyProduto = document.getElementById('produtoTable');

//Função para adicionar Produto
function adicionarProduto() {
    //cria-se as variaveis que vão ser inseridas na table e da-se o mesmo
    //valor dos inputs
    let tdNomeProduto = nomeProduto.value;
    let tdMarcaProduto = marcaProduto.value;
    let tdModeloProduto = modeloProduto.value;
    let tdPrecoProduto = precoProduto.value;
    let tdQuantidadeProduto = quantidadeProduto.value;
    // const tdIdProduto = produto.querySelector('.tdIdProduto').textContent;

    //bool para quando for criado/editado o eletrodomestico 
    let adicionarProdutoBool = false;
    //variavel para adicionar a class erro(campo vazio)
    let todosErrosInput = document.querySelectorAll('.erro-input');

    //verifica se esta a ser adicionado um novo produro
    if(botaoAdicionarProduto.textContent.trim() === "Adicionar") {
        //faz as verificações de todos os campos
        if(tdNomeProduto === "") {
            mensagemProduto.innerHTML = `<i class="bx bx-error-circle error-message"></i> O nome do produto não pode estar vazio`;
            mostraMensagemProduto(2000, 'error');
            //se o campo estiver vazio adiciona a class erro para aparecer
            //o input vermelho e dá focus
            nomeProduto.classList.add('erro-input');      
            nomeProduto.focus();
            return;
        } 
        else if (tdMarcaProduto === "") {
            mensagemProduto.innerHTML = `<i class="bx bx-error-circle error-message"></i> A marca do produto não pode estar vazio`;
            mostraMensagemProduto(2000, 'error');
            marcaProduto.classList.add('erro-input');      
            marcaProduto.focus();
            return;
        } 
        else if (tdModeloProduto === "") {
            mensagemProduto.innerHTML = `<i class="bx bx-error-circle error-message"></i> O modelo do produto não pode estar vazio`;
            mostraMensagemProduto(2000, 'error');
            modeloProduto.classList.add('erro-input');      
            modeloProduto.focus();
            return;
        }  
        else if (tdPrecoProduto == 0) {
            mensagemProduto.innerHTML = `<i class="bx bx-error-circle error-message"></i> O preço do produto não pode estar vazio`;
            mostraMensagemProduto(2000, 'error');
            precoProduto.classList.add('erro-input');      
            precoProduto.focus();
            return;
        } 
        else if (tdQuantidadeProduto == 0) {
            mensagemProduto.innerHTML = `<i class="bx bx-error-circle error-message"></i> A quantidade do produto não pode estar vazio`;
            mostraMensagemProduto(2000, 'error');
            quantidadeProduto.classList.add('erro-input');      
            quantidadeProduto.focus();
            return;
        } 
        else {
            //quando passa sem erros a flag passa a true
            mensagemProduto.innerHTML = `<i class="bx bx-error-circle success-message"></i> Produto adicionado com sucesso`;
            mostraMensagemProduto(2000, 'success');
            adicionarProdutoBool = true;

            //foreach para tirar a class de erro de todos os inputs
            todosErrosInput.forEach(erro => {
                erro.classList.remove('erro-input');
            });
            //depois de adicionar esconde a div com os inputs
            esconderInputs();
        }
        //em caso de estar a editar o eletrodomestico
    } else if(botaoAdicionarProduto.textContent.trim() === "Atualizar") {
        let tdNomeProduto = nomeProduto.value;
        let tdMarcaProduto = marcaProduto.value;
        let tdModeloProduto = modeloProduto.value;
        let tdPrecoProduto = precoProduto.value;
        let tdQuantidadeProduto = quantidadeProduto.value;

        //verifica os campos se estão vazios
        if(tdNomeProduto === "") {
            mensagemProduto.innerHTML = `<i class="bx bx-error-circle error-message"></i> O nome do produto não pode estar vazio`;
            mostraMensagemProduto(2000, 'error');
            nomeProduto.classList.add('erro-input');      
            nomeProduto.focus();
            return;
        } 
        else if (tdMarcaProduto === "") {
            mensagemProduto.innerHTML = `<i class="bx bx-error-circle error-message"></i> A marca do produto não pode estar vazio`;
            mostraMensagemProduto(2000, 'error');
            marcaProduto.classList.add('erro-input');      
            marcaProduto.focus();
            return;
        } 
        else if (tdModeloProduto === "") {
            mensagemProduto.innerHTML = `<i class="bx bx-error-circle error-message"></i> O modelo do produto não pode estar vazio`;
            mostraMensagemProduto(2000, 'error');
            modeloProduto.classList.add('erro-input');      
            modeloProduto.focus();
            return;
        }  
        else if (tdPrecoProduto == null) {
            mensagemProduto.innerHTML = `<i class="bx bx-error-circle error-message"></i> O preço do produto não pode estar vazio`;
            mostraMensagemProduto(2000, 'error');
            precoProduto.classList.add('erro-input');      
            precoProduto.focus();
            return;
        } 
        else if (tdQuantidadeProduto == null) {
            mensagemProduto.innerHTML = `<i class="bx bx-error-circle error-message"></i> A quantidade do produto não pode estar vazio`;
            mostraMensagemProduto(2000, 'error');
            quantidadeProduto.classList.add('erro-input');      
            quantidadeProduto.focus();
            return;
        } 
        //em caso de não ter havido alterações
        else if(tdNomeProduto === editarNomeProduto &&
                    tdMarcaProduto === editarMarcaProduto &&
                    tdModeloProduto === editarModeloProduto &&
                    tdPrecoProduto === editarPrecoProduto &&
                    tdQuantidadeProduto === editarQuantidadeProduto) {
                    
                    mensagemProduto.innerHTML = `<i class="bx bx-error-circle success-message"></i> Não foram feitas alterações no produto ${tdNomeProduto}`;
                    botaoAdicionarProduto.innerHTML = `<span class="text-add">Adicionar</span><i class='bx bx-plus-circle'></i>`;
                    mostraMensagemProduto(2000, 'success');
                    esconderInputs();
                    adicionarProdutoBool = true;

                    todosErrosInput.forEach(erro => {
                        erro.classList.remove('erro-input');
                    });
        }
        //em caso de haver alterações
        else {
            mensagemProduto.innerHTML = `<i class="bx bx-error-circle success-message"></i> ${tdNomeProduto} atualizado com sucesso`;
            botaoAdicionarProduto.innerHTML = `<span class="text-add">Adicionar</span><i class='bx bx-plus-circle'></i>`
            mostraMensagemProduto(2000, 'success');
            adicionarProdutoBool = true;
            //volta a passar string vazia no variaveis de editar
            editarNomeProduto = "";
            editarMarcaProduto = "";
            editarModeloProduto = "";
            editarPrecoProduto = "";
            editarQuantidadeProduto = "";

            todosErrosInput.forEach(erro => {
                erro.classList.remove('erro-input');
            });

            esconderInputs();
            guardaLocalStorage();
        }
    }

    //se a flag passar true significa que vai criar o eletrodomestico
    if(adicionarProdutoBool) {
        //cria um dia random dinamico
        const id = 'id_' + Math.random().toString(10).substr(2, 9);

        //cria o tr e os td's com os respetivos valores
        let tr = document.createElement('tr');
        tr.setAttribute('class', 'produto');

        tr.innerHTML = `
            <td data-cell="Id" class="tdIdProduto">${id}</td>
            <td data-cell="Nome" class="tdNomeProduto">${tdNomeProduto}</td>
            <td data-cell="Marca" class="tdMarcaProduto">${tdMarcaProduto}</td>
            <td data-cell="Modelo" class="tdModeloProduto">${tdModeloProduto}</td>
            <td data-cell="Preço" class="tdPrecoProduto">${tdPrecoProduto}</td>
            <td data-cell="Quantidade" class="tdQuantidadeProduto">${tdQuantidadeProduto}</td>
            <td class="Ações">
                <button class="editar" onclick="editarProduto(this)">
                    <i class='bx bx-pencil'></i>
                </button>
                <button class="remover" onclick="apagarProduto(this)">
                    <i class='bx bx-trash'></i>
                </button>
            </td>
        `;

        //limpa os valores dos inputs
        nomeProduto.value = "";
        marcaProduto.value = "";
        modeloProduto.value = "";
        precoProduto.value = "";
        quantidadeProduto.value = "";
        tableBodyProduto.append(tr);
        if(tdQuantidadeProduto < 2) {
            tr.querySelector('.tdQuantidadeProduto').style.color = "var(--color-danger)";
        }

        //guarda no local storage o novo produto
        guardaLocalStorage();
    }
}

//Função para editar produto
function editarProduto(button) {
    let divInputsProdutos = document.querySelector('.inputs-produtos');
    divInputsProdutos.style.display = "flex";
    let botaoMostrar = document.querySelector('.mostrar-inputs-produto');
    botaoMostrar.style.display = "none";

    //procura na arvore DOM o tr mais próximo dele
    const produto = button.closest('tr');

    //valores das variaveis que estão na tabela
    const tdNomeProduto = produto.querySelector('.tdNomeProduto').textContent;
    const tdMarcaProduto = produto.querySelector('.tdMarcaProduto').textContent;
    const tdModeloProduto = produto.querySelector('.tdModeloProduto').textContent;
    const tdPrecoProduto = produto.querySelector('.tdPrecoProduto').textContent;
    const tdQuantidadeProduto = produto.querySelector('.tdQuantidadeProduto').textContent;

    //da-se o valor das variaveis da tabela aos inputs para se editar
    nomeProduto.value = tdNomeProduto;
    marcaProduto.value = tdMarcaProduto;
    modeloProduto.value = tdModeloProduto;
    precoProduto.value = tdPrecoProduto;
    quantidadeProduto.value = tdQuantidadeProduto;

    //apaga esse eletrodomestico para aseguir ser adicionado novamente 
    apagarProduto(button);

    //muda-se o icon que está no botão de adicionar e muda-se o span de 
    //"Adicionar" para "Atualizar"
    botaoAdicionarProduto.innerHTML = `<span class="text-add">Atualizar</span> <i class='bx bx-refresh' ></i>`;
    mensagemProduto.innerHTML = `<i class="bx bx-check-circle success-message"></i> Produto '${tdNomeProduto}' em modo edição`;
    mostraMensagemProduto(2000, "success");

    //as variaveis de editar recebem os valores que estão na tabela
    editarNomeProduto = tdNomeProduto;
    editarMarcaProduto = tdMarcaProduto;
    editarModeloProduto = tdModeloProduto;
    editarPrecoProduto = tdPrecoProduto;
    editarQuantidadeProduto = tdQuantidadeProduto;

    //volta a guardar no localStorage
    guardaLocalStorage();
}   

//Função para apagar produto
function apagarProduto(button) {
    const produto = button.closest('tr');

    //vai buscar pelo nome do produto
    const tdNomeProduto = produto.querySelector('.tdNomeProduto').textContent;

    //remove o tr completo com a ajuda do closest do produto
    tableBodyProduto.removeChild(produto)
    mensagemProduto.innerHTML = `<i class="bx bx-check-circle success-message"></i> Produto '${tdNomeProduto}' removido com sucesso`;
    mostraMensagemProduto(2000, "success");
    guardaLocalStorage();
}

//função para mostar barra de pesquisa
function mostrarBarraPesquisa(button) {
    let barraPesquisa = document.querySelector('.div-pesquisa');

    if (barraPesquisa.style.display === "block") {
        barraPesquisa.style.display = "none";

    } else {
        barraPesquisa.style.display = "block";
    }
}

//Função para pesquisar
function pesquisar() {
    //valor do input da barra de pesquisa
    const produtoPesquisa = document.getElementById('barraPesquisa').value.toLowerCase();
    const trProdutos = document.querySelectorAll('.produto');

    //foreach para percorrer todos os tr's, para achar correspondencia
    //entre o valor da barra de pesquisa e a tabela
    trProdutos.forEach(tr => {
        const nomeProduto = tr.querySelector('.tdNomeProduto').textContent.toLowerCase();
        
        //se o nome corresponder ao da barra de pesquisa mostra as possibilidades
        if (nomeProduto.includes(produtoPesquisa)) {
            tr.style.display = '';
        } else {
            tr.style.display = 'none';
        }
    });
}