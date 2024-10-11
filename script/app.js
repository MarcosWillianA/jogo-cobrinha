const iniciarJogo = document.querySelector('#iniciarJogo');
const jogar = document.querySelector('#jogar')
const tabuleiro = document.querySelector('#tabuleiro');
const direcional = document.querySelectorAll('.direcional');
const esquerda = document.querySelector('#esquerda');
const cima = document.querySelector('#cima');
const baixo = document.querySelector('#baixo');
const direita = document.querySelector('#direita');
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
    return numeroAleatorio;
}

let posicaoCobra = aparecerCobra(); // Spawn inicial da cobra

//Movimentar a cobra: 

const botoesDirecionais = {
    esquerda: esquerda,
    cima: cima,
    baixo: baixo,
    direita: direita
};

function moverCobra(botao) {
    console.log(`A cobra foi mexida pra ${botao.id}`);

}

for (const [chave, botao] of Object.entries(botoesDirecionais)) {
    botao.addEventListener('click', () => moverCobra(botao));
};

document.addEventListener('keydown', function(evento) {
    const botao = botoes[evento.chave];
    if (botao) {
        moverCobra(botao);
    }
})

/*
function praDireita (posicaoCobra) {
    console.log(`Posição cobra: ${posicaoCobra}`)
    setInterval(() => {
        if (posicaoCobra < 255) {
            celulas[posicaoCobra += 16].classList.add('cobra');
            celulas[posicaoCobra - 16].classList.remove('cobra');
        } 
        else {
            clearInterval
        }
        
    }, 1000);
}
    */

//praDireita(posicaoCobra);
