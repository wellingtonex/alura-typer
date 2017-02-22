var frase = $('.frase').text();
var numeroPalavras = frase.trim().split(
    ' ').length
$('#tamanho-frase').text(numeroPalavras);

var campo  = $('.campo-digitacao')
campo.on('input', () => {
    let conteudo = campo.val();
    if(conteudo) {
        let quantidadePalavras = conteudo.trim().split(" ").length
        console.log(quantidadePalavras);
        $('#contador-palavras').text(quantidadePalavras);
        $('#contador-caracteres').text(conteudo.trim().length);
    } else {
        $('#contador-palavras').text(0);
        $('#contador-caracteres').text(0);
    }
   
});

let tempoRestante =    $('#tempo-digitacao').text();
    campo.on('focus',  () => {
    let setIntervalId = setInterval(() => {
        tempoRestante--;
         $('#tempo-digitacao').text(tempoRestante);
         if(tempoRestante < 1) {
             campo.attr('disabled', true);
             clearInterval(setIntervalId);
         }
    }, 1000)
});
