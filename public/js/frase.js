$('#botao-frase').click(() => {
    $('#spinner').show();
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
    }).always(() => {
        $('#spinner').hide();
    });    
});

$('#botao-frase-id').click(() => {

    let fraseId = $('#frase-id').val();
    let dados = {id:fraseId};

    $('#spinner').show();
    $.get('http://localhost:3000/frases', dados, (data) => {
        let frase = $('.frase')        
        frase.text(data.texto);
        atualizaTamanhoFrase();
        atualizaTempoInicial(data.tempo);
        tempo_inicial = data.tempo;
        $('#erro').hide();
    }).fail(() => {
        $('#erro').toggle();
        setTimeout(function() {
            $('#erro').toggle();
        }, 2000);
    }).always(() => {
        $('#spinner').hide();
    }); 
})

