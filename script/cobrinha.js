const iniciarJogo = document.querySelector('#iniciarJogo');
const jogar = document.querySelector('#jogar');
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
let direcaoAtual = null; // Direção atual da cobra
let posicaoCobra; // Posição da cobra

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
    }
}

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

posicaoCobra = aparecerCobra(); // Spawn inicial da cobra
coordenadasCobra = [posicaoCobra];

const botoesDirecionais = {
    esquerda: esquerda,
    cima: cima,
    baixo: baixo,
    direita: direita
};

// Adiciona eventos de clique para os botões de direção
for (const [chave, botao] of Object.entries(botoesDirecionais)) {
    botao.addEventListener('click', () => {
        if (direcaoAtual) {
            // Verifica se o movimento não é oposto
            if ((direcaoAtual === 'esquerda' && chave === 'direita') || 
                (direcaoAtual === 'direita' && chave === 'esquerda') || 
                (direcaoAtual === 'cima' && chave === 'baixo') || 
                (direcaoAtual === 'baixo' && chave === 'cima')) {
                return; // Movimento inválido
            }
        }
        direcaoAtual = chave; // Atualiza a direção atual
    });
}

// Função principal que move a cobra
function moverCobra() {
    let novaPosicao = posicaoCobra;

    switch (direcaoAtual) {
        case 'esquerda':
            if (posicaoCobra >= 16) {
                novaPosicao -= 16;
            } else {
                gameOverMensagem.style.display = 'block';
                clearInterval(intervaloCobra);
                return; // Parar a execução se game over
            }
            break;

        case 'cima':
            if (posicaoCobra % 16 > 0) {
                novaPosicao -= 1;
            } else {
                gameOverMensagem.style.display = 'block';
                clearInterval(intervaloCobra);
                return;
            }
            break;

        case 'baixo':
            if ((posicaoCobra + 1) % 16 > 0) {
                novaPosicao += 1;
            } else {
                gameOverMensagem.style.display = 'block';
                clearInterval(intervaloCobra);
                return;
            }
            break;

        case 'direita':
            if (posicaoCobra < 240) {
                novaPosicao += 16;
            } else {
                gameOverMensagem.style.display = 'block';
                clearInterval(intervaloCobra);
                return;
            }
            break;
    }

    celulas[posicaoCobra].classList.remove('cobra-cabeca');
    posicaoCobra = novaPosicao;
    celulas[posicaoCobra].classList.add('cobra-cabeca');

    // Verifica se a cobra pegou comida
    if (celulas[posicaoCobra].classList.contains('comida')) {
        pontuacao++;
        pontos.innerHTML = pontuacao;
        celulas[posicaoCobra].classList.remove('comida');
        aparecerComida();

        // Aumentar a velocidade
        if (velocidadeCobra > 100) {
            velocidadeCobra -= 50; // Decrementa 50ms
        }

        clearInterval(intervaloCobra); // Para o intervalo atual
        intervaloCobra = setInterval(moverCobra, velocidadeCobra); // Reinicia com a nova velocidade
    }
}

// Inicializa o movimento da cobra
intervaloCobra = setInterval(moverCobra, velocidadeCobra);
