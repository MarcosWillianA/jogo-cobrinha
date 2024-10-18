const iniciarJogo = document.querySelector('#iniciarJogo');
const jogar = document.querySelector('#jogar')
const tabuleiro = document.querySelector('#tabuleiro');
const direcional = document.querySelectorAll('.direcional');
const esquerda = document.querySelector('#esquerda');
const cima = document.querySelector('#cima');
const baixo = document.querySelector('#baixo');
const direita = document.querySelector('#direita');
const gameOver = document.querySelector('#gameover');
const gameOverMensagem = document.querySelector('#mensagem-gameover');
const recomecar = document.querySelector('#recomecar');
const pontos = document.querySelector('#pontos');

let coordenadasCobra = [];
let intervaloCobra;
let pontuacao = 0;
let tamanhoCobra = 1;
let velocidadeCobra = 500
let movimentoAtivo = false;

function criarTabuleiro(linha, coluna) {
    for (i = 0; i < linha; i++) {
        const linha = document.createElement('div');
        linha.classList.add('linha');

        for (j = 0; j < coluna; j++) {
            const celula = document.createElement('div');
            celula.classList.add('celula');
            celula.id = `celula_${i}_${j}`;
            linha.appendChild(celula);
        }
        tabuleiro.appendChild(linha);
    };
};

criarTabuleiro(16, 16);

let celulas = document.querySelectorAll('.celula');

function aparecerComida () {
    let novaPosicao;
    do {
        novaPosicao = Math.floor(Math.random() * celulas.length);
    } while (celulas[novaPosicao].classList.contains('cobra-cabeca')); // Repete até encontrar uma posição livre
    celulas[novaPosicao].classList.add('comida'); // Adiciona a comida na nova posição
}

aparecerComida();

function aparecerCobra() {
    const numeros = [129, 130, 131, 132, 145, 146, 147, 148];
    const indiceAleatorio = Math.floor(Math.random() * numeros.length);
    const numeroAleatorio = numeros[indiceAleatorio];
    console.log(numeroAleatorio);

    celulas[numeroAleatorio].classList.add('cobra-cabeca');
    return numeroAleatorio;
}

let posicaoCobra = aparecerCobra(); // Spawn inicial da cobra
coordenadasCobra = [posicaoCobra];
let direcaoAtual = null;

//Movimentar a cobra: 

const botoesDirecionais = {
    esquerda: esquerda,
    cima: cima,
    baixo: baixo,
    direita: direita
};

for (const [chave, botao] of Object.entries(botoesDirecionais)) {
    botao.addEventListener('click', () => moverCobra(botao));
};