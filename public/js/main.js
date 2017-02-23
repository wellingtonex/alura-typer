const TEMPO_INCIAL = 10;
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
    var linha = "<tr>"+
                    "<td>"+ usuario + "</td>"+
                    "<td>"+ $('#contador-palavras').text(); + "</td>"+
                "</tr>";

    corpoTabela.append(linha);            

}