$('.troca-frase').click(fraseAleatoria);

function fraseAleatoria(){
    $.get('http://localhost:3000/frases', trocarFraseAleatoria)
        .fail(mostraErro());
}

function trocarFraseAleatoria(data){
    var frase = $('.frase');
    var numAleatorio = Math.floor(Math.random() * data.length);

    frase.text(data[numAleatorio].texto);
    atualizaTempoInicial(data[numAleatorio].tempo);
    atualizaTempo(data[numAleatorio].tempo);
}

function atualizaTempoInicial(tempo){
    tempoInicial = tempo;
}

function mostraErro(){
    $('.erro').show();
    setTimeout(function(){
        $('.erro').hide();
    }, 5000);
}