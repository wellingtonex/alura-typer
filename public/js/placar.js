$('#botao-sync').click(() => {
    let placar = [];
    let linhas = $("tbody>tr");
    

     linhas.each(function() {
        let usuario = $(this).find("td:nth-child(1)").text();
        let palavras = $(this).find("td:nth-child(2)").text();
        console.log(usuario);
        console.log(palavras);

        let score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);
    });

    let dados = {
        placar: placar
    }

    $.post('http://localhost:3000/placar', dados, () => {
        console.log('salvando dados placar');        
    });
    
    
});