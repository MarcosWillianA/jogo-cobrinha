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

function moverCobra(botao) {
    if (!direcaoAtual) {
        // Iniciar o movimento se ainda não estiver em movimento
        intervaloCobra = setInterval(() => {
            // Verifica a direção e move a cobra
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
                console.log('Pegou a comida!');
                celulas[posicaoCobra].classList.remove('comida');
                aparecerComida();
            }

            
        }, velocidadeCobra);
    }

    console.log(`A cobra foi mexida pra ${botao.id}`);
    console.log(`Posição cobra: ${posicaoCobra}`);

    // Verifica se a nova direção é válida
    if ((direcaoAtual === 'esquerda' && botao.id === 'direita') || 
        (direcaoAtual === 'direita' && botao.id === 'esquerda') || 
        (direcaoAtual === 'cima' && botao.id === 'baixo') || 
        (direcaoAtual === 'baixo' && botao.id === 'cima')) {
        console.log('Movimento inválido');
        return;
    }

    direcaoAtual = botao.id;

    
}

// Adicione o listener do evento apenas para atualizar a direção
for (const [chave, botao] of Object.entries(botoesDirecionais)) {
    botao.addEventListener('click', () => moverCobra(botao));
};
