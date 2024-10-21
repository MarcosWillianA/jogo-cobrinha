const iniciarJogo = document.querySelector('#iniciarJogo');
const pausar = document.querySelector('#pausar');
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
let jogoPausado = false;

function criarTabuleiro(linha, coluna) {
    for (let i = 0; i < linha; i++) {
        const linha = document.createElement('div');
        linha.classList.add('linha');

        for (let j = 0; j < coluna; j++) {
            const celula = document.createElement('div');
            celula.classList.add('celula');
            celula.id = `celula_${i}_${j}`;
            celula.addEventListener('click', pausarJogo);
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
    } while (celulas[novaPosicao].classList.contains('cobra-cabeca') ||
            celulas[novaPosicao].classList.contains('cobra-corpo'));
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

document.addEventListener('keydown', (evento) => {
    if (evento.key === ' ') { // Verifica se a tecla pressionada é a barra de espaço
        pausarJogo(); // Chama a função de pausar
        return; // Não executa mais nada se a barra de espaço for pressionada
    }

    if (jogoPausado) return; // Ignora entradas se o jogo estiver pausado

    switch (evento.key) {
        case 'ArrowLeft':
            if (direcaoAtual !== 'direita') direcaoAtual = 'esquerda';
            break;
        case 'ArrowUp':
            if (direcaoAtual !== 'baixo') direcaoAtual = 'cima';
            break;
        case 'ArrowDown':
            if (direcaoAtual !== 'cima') direcaoAtual = 'baixo';
            break;
        case 'ArrowRight':
            if (direcaoAtual !== 'esquerda') direcaoAtual = 'direita';
            break;
    }
});

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
    coordenadasCobra.unshift(posicaoCobra);
    
    

    // Verifica se a cobra pegou comida
    if (celulas[posicaoCobra].classList.contains('comida')) {
        pontuacao++;
        tamanhoCobra++;
        pontos.innerHTML = pontuacao;
        celulas[posicaoCobra].classList.remove('comida');
        aparecerComida();

        // Aumentar a velocidade
        if (velocidadeCobra > 100) {
            velocidadeCobra -= 50; // Decrementa 50ms
        }

        clearInterval(intervaloCobra); // Para o intervalo atual
        intervaloCobra = setInterval(moverCobra, velocidadeCobra); // Reinicia com a nova velocidade
    } else {
        const posicaoRemovida = coordenadasCobra.pop();
        celulas[posicaoRemovida].classList.remove('cobra-corpo');
    }

    //Atualizar o corpo da cobra e limpar as classes 'cobra-corpo' antes de adicionar novamente:
    celulas.forEach(celula => celula.classList.remove('cobra-corpo'));
    for (let i = 1; i < coordenadasCobra.length; i++) {
        const posicaoCorpo = coordenadasCobra[i];
        celulas[posicaoCorpo].classList.add('cobra-corpo');
    }

    if (coordenadasCobra.slice(1).includes(posicaoCobra)) {
        console.log('Game Over!')
        gameOverMensagem.style.display = 'block';
        gameOver.style.display = 'flex';
        clearInterval(intervaloCobra);
        return;
    }
}

// Inicializa o movimento da cobra
intervaloCobra = setInterval(moverCobra, velocidadeCobra);

function pausarJogo() {
    jogoPausado = !jogoPausado; // Alterna o estado de pausa
    if (jogoPausado) {
        clearInterval(intervaloCobra); // Para o movimento da cobra
        // Exibe a mensagem de pausa
        const pausaMensagem = document.createElement('div');
        pausaMensagem.id = 'pausaMensagem';
        pausaMensagem.innerText = 'PAUSADO';
        pausaMensagem.style.position = 'absolute';
        pausaMensagem.style.top = '50%';
        pausaMensagem.style.left = '50%';
        pausaMensagem.style.transform = 'translate(-50%, -50%)';
        pausaMensagem.style.fontSize = '24px';
        pausaMensagem.style.color = 'red';
        tabuleiro.appendChild(pausaMensagem);
    } else {
        intervaloCobra = setInterval(moverCobra, velocidadeCobra); // Retoma o movimento
        const pausaMensagem = document.getElementById('pausaMensagem');
        if (pausaMensagem) {
            tabuleiro.removeChild(pausaMensagem); // Remove a mensagem de pausa
        }
    }
}

// Adiciona evento de clique para o botão de pausar
pausar.addEventListener('click', pausarJogo);

// Adiciona evento de clique para pausar ao clicar na div tabuleiro

recomecar.addEventListener('click', reiniciarJogo);

function reiniciarJogo() {
    // Limpa a cobra e a comida
    celulas.forEach(celula => {
        celula.classList.remove('cobra-cabeca', 'cobra-corpo', 'comida', 'game-over');
    });

    // Reinicializa variáveis do jogo
    coordenadasCobra = [];
    pontuacao = 0;
    tamanhoCobra = 1;
    velocidadeCobra = 500;
    direcaoAtual = null;
    posicaoCobra = aparecerCobra(); // Posição inicial da cobra
    coordenadasCobra = [posicaoCobra];
    pontos.innerHTML = pontuacao; // Reinicia os pontos

    // Reaparece a comida
    aparecerComida();

    // Reinicia o intervalo da cobra
    clearInterval(intervaloCobra);
    intervaloCobra = setInterval(moverCobra, velocidadeCobra);

    // Oculta a mensagem de game over
    gameOverMensagem.style.display = 'none';
    gameOver.style.display = 'none';
}

