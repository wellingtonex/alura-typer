const TEMPO_INCIAL = 10;
var campo  = $('.campo-digitacao')
var setIntervalId;

$(() => {
    atualizaTamanhoFrase();
    inicializaContadores();
    let setIntervalId = inicializaCronometro();
    $('#botao-reiniciar').click(renicializaJogo);
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

let tempoRestante =    $('#tempo-digitacao').text();

function inicializaCronometro() {
    campo.one('focus',  () => {
        setIntervalId = setInterval(() => {
            tempoRestante--;
            $('#tempo-digitacao').text(tempoRestante);
            if(tempoRestante < 1) {
                campo.attr('disabled', true);
                clearInterval(setIntervalId);
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
}