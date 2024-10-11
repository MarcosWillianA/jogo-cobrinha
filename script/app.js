const iniciarJogo = document.querySelector('#iniciarJogo');
const jogar = document.querySelector('#jogar')
const tabuleiro = document.querySelector('#tabuleiro');
const esquerda = document.querySelector('#esquerda');
const direcional = document.querySelectorAll('.direcional');
const cima = document.querySelector('#cima');
const baixo = document.querySelector('#baixo');
const direita = document.querySelector('#cima');
const gameOver = document.querySelector('#gameover');
const recomecar = document.querySelector('#recomecar');

let coordenadasCobra = [];

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

// Criação do movimento 

function aparecerComida () {
    aleatorioComida = Math.floor(Math.random() * celulas.length);
    console.log(aleatorioComida);
    celulas[aleatorioComida].classList.add('comida');
}

aparecerComida();

function aparecerCobra() {
    const numeros = [129, 130, 131, 132, 145, 146, 147, 148];
    const indiceAleatorio = Math.floor(Math.random() * numeros.length);
    const numeroAleatorio = numeros[indiceAleatorio];
    console.log(numeroAleatorio);

    celulas[numeroAleatorio].classList.add('cobra');
    let posicaoCobra = numeroAleatorio;
    return posicaoCobra;
}

aparecerCobra();

function moverCobra () {
    console.log(`Posição cobra: ${posicaoCobra}`)
    setInterval(() => {
        celulas[posicaoCobra + 16].classList.add('cobra');
    }, 1000);
}

moverCobra();
