const TEMPO_INCIAL = 5;
var campo  = $('.campo-digitacao')
var setIntervalId;

$(() => {
    atualizaTamanhoFrase();
    inicializaContadores();
    let setIntervalId = inicializaCronometro();
    $('#botao-reiniciar').click(renicializaJogo);
    inicializaMarcadores();
});

function atualizaTamanhoFrase(){
    var frase = $('.frase').text();
    var numeroPalavras = frase.trim().split(
        ' ').length
    $('#tamanho-frase').text(numeroPalavras);
}

var frase = $('.frase').text();
var numeroPalavras = frase.trim().split(
    ' ').length
$('#tamanho-frase').text(numeroPalavras);


function inicializaContadores() {
    campo.on('input', () => {
        let conteudo = campo.val();
        if(conteudo) {
            let quantidadePalavras = conteudo.trim().split(/\S+/).length - 1
            $('#contador-palavras').text(quantidadePalavras);
            $('#contador-caracteres').text(conteudo.trim().length);
        } else {
            $('#contador-palavras').text(0);
            $('#contador-caracteres').text(0);
        }
    
    });
}

function inicializaMarcadores() {
    var frase = $(".frase").text().trim();
    campo.on("input", function() {
        var digitado = campo.val();
        var comparavel = frase.substr(0 , digitado.length);

        if(digitado == comparavel) {
            campo.addClass("campo-correto");
            campo.removeClass("campo-errado");
        } else {
            campo.addClass("campo-errado");
            campo.removeClass("campo-correto");        
        }
    });
}

let tempoRestante =    $('#tempo-digitacao').text();

function inicializaCronometro() {
    campo.one('focus',  () => {
        setIntervalId = setInterval(() => {
            tempoRestante--;
            $('#tempo-digitacao').text(tempoRestante);
            if(tempoRestante < 1) {
                clearInterval(setIntervalId);
                finalizaJogo();
            }
        }, 1000)
    });
}

function renicializaJogo()  {    
    campo.attr('disabled', false);
    $('#contador-palavras').text(0);
    $('#contador-caracteres').text(0);
    $('#tempo-digitacao').text(TEMPO_INCIAL);
    campo.val('');
    clearInterval(setIntervalId);
    inicializaCronometro();
    campo.removeClass("campo-desativado");
    campo.removeClass("campo-correto");
    campo.removeClass("campo-errado")
}

function finalizaJogo() {
    campo.attr('disabled', true);
    campo.toggleClass("campo-desativado");    
    inserePlacar();
}

function inserePlacar() {
    let usuario = 'Wellington';
    let corpoTabela = $(".placar").find('tbody');

    let botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>" ;

    let linha = novaLinha(usuario, $('#contador-palavras').text())

    linha.find('.botao-remover').click((e) => {
        e.preventDefault();
         $(e.target).parent().parent().parent().remove();
    })

    corpoTabela.append(linha);            

}

function novaLinha(usuario, quantidadeDePalavras) {
    let linha = $('<tr>');
    let colunaUsuario = $('<td>').text(usuario);
    let colunaPalavras = $('<td>').text(quantidadeDePalavras);
    let colunaRemover = $('<td>');
    let link = $('<a>').addClass('botao-remover').attr('href', '#');
    let icone = $('<i>').addClass('small').addClass('material-icons').text('delete');

    link.append(icone);
    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}