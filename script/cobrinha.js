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
let velocidadeCobra = 500;
let movimentoAtivo = false;

function criarTabuleiro(linha, coluna) {
    for (let i = 0; i < linha; i++) {
        const linha = document.createElement('div');
        linha.classList.add('linha');

        for (let j = 0; j < coluna; j++) {
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

function aparecerComida() {
    let novaPosicao;
    do {
        novaPosicao = Math.floor(Math.random() * celulas.length);
    } while (celulas[novaPosicao].classList.contains('cobra-cabeca'));
    celulas[novaPosicao].classList.add('comida');
}

aparecerComida();

function aparecerCobra() {
    const numeros = [129, 130, 131, 132, 145, 146, 147, 148];
    const indiceAleatorio = Math.floor(Math.random() * numeros.length);
    const numeroAleatorio = numeros[indiceAleatorio];
    celulas[numeroAleatorio].classList.add('cobra-cabeca');
    return numeroAleatorio;
}

let posicaoCobra = aparecerCobra();
coordenadasCobra = [posicaoCobra];
let direcaoAtual = null;

const botoesDirecionais = {
    esquerda: esquerda,
    cima: cima,
    baixo: baixo,
    direita: direita
};

for (const [chave, botao] of Object.entries(botoesDirecionais)) {
    botao.addEventListener('click', () => moverCobra(botao));
};

function moverCobra(botao) {
    if (!direcaoAtual) {
        intervaloCobra = setInterval(() => {
            switch (direcaoAtual) {
                case 'esquerda':
                    if (posicaoCobra >= 16) {
                        celulas[posicaoCobra].classList.remove('cobra-cabeca');
                        posicaoCobra -= 16;
                        celulas[posicaoCobra].classList.add('cobra-cabeca');
                    } else {
                        gameOverMensagem.style.display = 'block';
                        clearInterval(intervaloCobra);
                    }
                    break;

                case 'cima':
                    if (posicaoCobra % 16 > 0) {
                        celulas[posicaoCobra].classList.remove('cobra-cabeca');
                        posicaoCobra -= 1;
                        celulas[posicaoCobra].classList.add('cobra-cabeca');
                    } else {
                        gameOverMensagem.style.display = 'block';
                        clearInterval(intervaloCobra);
                    }
                    break;

                case 'baixo':
                    if ((posicaoCobra + 1) % 16 > 0) {
                        celulas[posicaoCobra].classList.remove('cobra-cabeca');
                        posicaoCobra += 1;
                        celulas[posicaoCobra].classList.add('cobra-cabeca');
                    } else {
                        gameOverMensagem.style.display = 'block';
                        clearInterval(intervaloCobra);
                    }
                    break;

                case 'direita':
                    if (posicaoCobra < 240) {
                        celulas[posicaoCobra].classList.remove('cobra-cabeca');
                        posicaoCobra += 16;
                        celulas[posicaoCobra].classList.add('cobra-cabeca');
                    } else {
                        gameOverMensagem.style.display = 'block';
                        clearInterval(intervaloCobra);
                    }
                    break;
            }

            if (celulas[posicaoCobra].classList.contains('comida')) {
                pontuacao++;
                tamanhoCobra++;
                pontos.innerHTML = pontuacao;
                celulas[posicaoCobra].classList.remove('comida');
                aparecerComida();

                // Aumenta a velocidade da cobra
                velocidadeCobra = Math.max(100, velocidadeCobra - 50);
                clearInterval(intervaloCobra);
                intervaloCobra = setInterval(moverCobra, velocidadeCobra);
            }
        }, velocidadeCobra);
    }

    if ((direcaoAtual === 'esquerda' && botao.id === 'direita') || 
        (direcaoAtual === 'direita' && botao.id === 'esquerda') || 
        (direcaoAtual === 'cima' && botao.id === 'baixo') || 
        (direcaoAtual === 'baixo' && botao.id === 'cima')) {

        console.log('Movimento inválido');

        return;

    }

    direcaoAtual = botao.id;

}
