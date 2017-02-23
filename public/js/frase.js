$('#botao-frase').click(() => {
    $.get('http://localhost:3000/frases', (data) => {
        let frase = $('.frase')
        let numeroAleatorio = Math.floor(Math.random() * data.length);
        frase.text(data[numeroAleatorio].texto);
        atualizaTamanhoFrase();
        atualizaTempoInicial(data[numeroAleatorio].tempo);
        tempo_inicial = data[numeroAleatorio].tempo;
        $('#erro').hide();
    }).fail(() => {
        $('#erro').toggle();
        setTimeout(function() {
            $('#erro').toggle();
        }, 2000);
    });
    
});

