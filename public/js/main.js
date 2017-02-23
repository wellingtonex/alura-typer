var tempo_inicial = 5;
var campo  = $('.campo-digitacao')
var setIntervalId;

$(() => {
    atualizaTamanhoFrase();
    inicializaContadores();
    let setIntervalId = inicializaCronometro();
    $('#botao-reiniciar').click(renicializaJogo);
    inicializaMarcadores();
    atualizaPlacar();
});

function atualizaPlacar(){
    $.get("http://localhost:3000/placar",function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);

            linha.find('.botao-remover').click((e) => {
                e.preventDefault();
                let linha = $(e.target).parent().parent().parent();
                linha.fadeOut(1000);
                setTimeout(function() {
                    linha.remove();
                }, 1000);
            });

            $("tbody").append(linha);
            $('.placar').fadeIn();
        });
    });
}

function atualizaTamanhoFrase(){
    var frase = $('.frase').text();
    var numeroPalavras = frase.trim().split(
        ' ').length
    $('#tamanho-frase').text(numeroPalavras);
}

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
    campo.on("input", function() {
        let frase = $(".frase").text().trim();
        let digitado = campo.val();
        let comparavel = frase.substr(0 , digitado.length);

        if(digitado == comparavel) {
            campo.addClass("campo-correto");
            campo.removeClass("campo-errado");
        } else {
            campo.addClass("campo-errado");
            campo.removeClass("campo-correto");        
        }
    });
}


function inicializaCronometro() {
    campo.one('focus',  () => {
        let tempoRestante =    $('#tempo-digitacao').text();
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
    $('#tempo-digitacao').text(tempo_inicial);
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
        let linha = $(e.target).parent().parent().parent();
        linha.fadeOut(1000);
        setTimeout(function() {
            linha.remove();
        }, 1000);
    });

    corpoTabela.append(linha);

    $('.placar').slideDown(500);
    scrollPlacar();
}

function scrollPlacar() {
    let position = $('.placar').offset().top;
    $("body").animate({
        scrollTop: position+"px"
    }, 1000)
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

$('#botao-placar').click(() => {
    //$('.placar').toggle();
    //$('.placar').slideDown(2000);
    //$('.placar').slideUp(2000);
    $('.placar').stop().slideToggle();
});

function atualizaTempoInicial(tempo) {
    $("#tempo-digitacao").text(tempo);
}