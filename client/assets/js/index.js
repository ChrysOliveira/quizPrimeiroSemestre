const botaoAnterior = $('#botao-anterior');
botaoAnterior.click(retornaQuestao);

const botaoProximo = $('#botao-proximo');
botaoProximo.click(avancaQuestao);

$('.resposta').click(selecionaResposta);

let questaoAtual = $('#numero-questao')
let numeroQuestaoAtual = questaoAtual.text();

let valorRespostaSelecionada;

let listaDeRespostasDaPartida = new Map();

$(() => {
    preencheQuestao();
})

function preencheQuestao() {


    $('#numero-questao').text(numeroQuestaoAtual);
    $('.descricao-pergunta').text(listaDeDescricoes[numeroQuestaoAtual - 1].descricao);
    $('.container__conteudo-video').find('source').attr('src', `assets/videos/${numeroQuestaoAtual}-videoplayback.mp4`);
    $('.container__conteudo-pergunta').text(listaDePerguntas[numeroQuestaoAtual - 1].pergunta);
    $('#resposta-1').text(listaDeOpcoes[numeroQuestaoAtual - 1].opcao1)
    $('#resposta-2').text(listaDeOpcoes[numeroQuestaoAtual - 1].opcao2)
    $('#resposta-3').text(listaDeOpcoes[numeroQuestaoAtual - 1].opcao3)
    $('#resposta-4').text(listaDeOpcoes[numeroQuestaoAtual - 1].opcao4)
    $('.resposta').each(function() {
        $(this).removeClass('selecionado');
    })
}

function selecionaResposta(event) {

    $('.resposta').each(function() {
        $(this).removeClass('selecionado')
    });

    $(this).addClass('selecionado');

    event.preventDefault();
    valorRespostaSelecionada = $('.selecionado').text().trim()

}

function avancaQuestao(event) {

    event.preventDefault();

    if (valorRespostaSelecionada) {

        listaDeRespostasDaPartida.set(numeroQuestaoAtual, valorRespostaSelecionada);
    } else {
        //parei aqui para implementar mensagem de "precisa selecionar uma resposta"
    }

    if (numeroQuestaoAtual < 10) {

        questaoAtual.text(numeroQuestaoAtual++);
        preencheQuestao();
    }

}

function retornaQuestao(event) {

    event.preventDefault();

    if (numeroQuestaoAtual > 1) {

        questaoAtual.text(numeroQuestaoAtual--);
        preencheQuestao();
    }
}