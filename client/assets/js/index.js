var botaoAnterior = $('#botao-anterior');
botaoAnterior.click(retornaQuestao);

var botaoProximo = $('#botao-proximo');
botaoProximo.click(avancaQuestao);

$('.resposta').click(selecionaResposta);

$('.resultados--conteudo__botao-jogo').click(() => {
    $('.resultados--tabela').stop().fadeToggle();
});

$('.resultados--conteudo__botao-restart').click(restart);

var questaoAtual = $('#numero-questao');
var numeroQuestaoAtual = questaoAtual.text();

var valorRespostaSelecionada;

$(() => {
    preencheQuestao();
});

function preencheQuestao() {

    $('#numero-questao').text(numeroQuestaoAtual);
    $('.descricao-pergunta').text(listaDeDescricoes[numeroQuestaoAtual - 1].descricao);
    $('#container__conteudo-video').html(`
    <video class="container__conteudo-video" controls>
    <source src="assets/videos/${numeroQuestaoAtual}-videoplayback.mp4" type="video/mp4">
    Seu navegador nao suporta video
    </video>`);
    $('.container__conteudo-pergunta').text(listaDePerguntas[numeroQuestaoAtual - 1].pergunta);
    $('#resposta-1').text(listaDeOpcoes[numeroQuestaoAtual - 1].opcao1);
    $('#resposta-2').text(listaDeOpcoes[numeroQuestaoAtual - 1].opcao2);
    $('#resposta-3').text(listaDeOpcoes[numeroQuestaoAtual - 1].opcao3);
    $('#resposta-4').text(listaDeOpcoes[numeroQuestaoAtual - 1].opcao4);
    $('.resposta').each(function() {
        $(this).removeClass('selecionado');
    });
    valorRespostaSelecionada = "";
}

function selecionaResposta(event) {

    $('.resposta').each(function() {
        $(this).removeClass('selecionado')
    });

    $(this).addClass('selecionado');

    event.preventDefault();
    valorRespostaSelecionada = $('.selecionado').text().trim();
}

function avancaQuestao(event) {

    event.preventDefault();

    if (numeroQuestaoAtual <= 10) {
        if (!valorRespostaSelecionada) {
            $('.container__conteudo-erro').stop().fadeToggle();

            setTimeout(() => {

                $('.container__conteudo-erro').stop().fadeToggle();
            }, 1000);
        } else {

            listaDeRespostas.set(parseInt(numeroQuestaoAtual), valorRespostaSelecionada);

            if (numeroQuestaoAtual < 10) {

                questaoAtual.text(numeroQuestaoAtual++);

                preencheQuestao();
            } else {
                $('#container__conteudo-video').html(``);
                $('.container').toggle();
                $('.resultados').toggle();
                calculaAcertosEErros();
                preencheResultados();
                populaTabela();
            }
        }
    }

}

function retornaQuestao(event) {

    event.preventDefault();

    if (numeroQuestaoAtual > 1) {

        questaoAtual.text(numeroQuestaoAtual--);
        preencheQuestao();
    }
}

function calculaAcertosEErros() {

    listaDeRespostas.forEach(function(value, key) {

        if (listaDePerguntas[key - 1].resposta == value) {
            quantidadeDeAcertos++;
        } else {
            quantidadeDeErros++;
        }
    })
}

function preencheResultados() {

    if (quantidadeDeAcertos > quantidadeDeErros || quantidadeDeAcertos == 5) {
        $('.resultados--conteudo__resposta-feliz').toggle();
    } else {
        $('.resultados--conteudo__resposta-triste').toggle();
    }
    $('.resultados--numero-acertos').text(quantidadeDeAcertos);
    $('.resultados--numero-erros').text(quantidadeDeErros);

}

function populaTabela() {
    const tabelaCorpo = $('tbody');

    listaDePerguntas.forEach(item => {

        const linha = $('<tr>');

        const dado1 = $('<td>').html(`${item.id}`);
        const dado2 = $('<td>').html(`Pergunta: ${item.pergunta} <br>
        Reposta correta: ${item.resposta} <br>
        Resposta selecionada: ${listaDeRespostas.get(item.id)}`);

        linha.append(dado1);
        linha.append(dado2);

        if (listaDeRespostas.get(item.id) == item.resposta) {

            linha.addClass('resultados--questao-certa');
        } else {

            linha.addClass('resultados--questao-errada');
        }
        tabelaCorpo.append(linha);
    })

}

function restart() {
    quantidadeDeAcertos = 0;
    quantidadeDeErros = 0;
    listaDeRespostas = new Map();
    numeroQuestaoAtual = 1;
    valorRespostaSelecionada = "";
    $('.container').toggle();
    $('.resultados').toggle();
    $('.resultados--conteudo__resposta-feliz').hide();
    $('.resultados--conteudo__resposta-triste').hide();
    preencheQuestao();
}