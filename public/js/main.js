var campo = $('.campo');
var tempoInicial = 3;
var btnReiniciar = $('.reiniciar');

$(function(){
	calculaTamanhos();
	inicializaCronometro();
	btnReiniciar.click(reiniciaJogo);
});

function calculaTamanhos(){
	campo.on('input', function(){
		var texto = campo.val();
	
		var qtdPalavras = texto.split(/\S+/).length -1;
		var qtdCaracteres = texto.length;

		atualizaPalavras(qtdPalavras);
		atualizaCaracteres(qtdCaracteres);
	});
}

function inicializaCronometro(){
	var tempoRestante = tempoInicial;
	atualizaTempo(tempoRestante);
	
	campo.one('focus', function(){
		var intervalo = setInterval(function(){
			tempoRestante--;
			atualizaTempo(tempoRestante);
			
			if(tempoRestante < 1) {
				campo.attr('disabled', 1);
				campo.toggleClass('campo-desativado');
				btnReiniciar.attr('disabled', false);

				var gameOver = $(document.createElement('span'));
				gameOver.text('Game Over!')
					.addClass('game-over')
					.css('color', 'red')
					.css('font-style', 'italic');
				$(campo).after(gameOver);
				
				clearInterval(intervalo);
			}
		}, 1000); 
	});
}

function reiniciaJogo(){
	campo.attr('disabled', false);
	campo.toggleClass('campo-desativado');
	campo.val("");

	btnReiniciar.attr('disabled', true);
	$('.game-over').remove();
	atualizaTempo(tempoInicial);
	atualizaPalavras(0);
	atualizaCaracteres(0);
	inicializaCronometro();
}

function atualizaTempo(tempo){
	$('#segundos').text(tempo + " segundo" + ((tempo == 1) ? "" : "s"));
}

function atualizaPalavras(qtd){
	$('#palavras').text(qtd + " palavra" + ((qtd == 1) ? "" : "s"));
}

function atualizaCaracteres(qtd){
	$('#caracteres').text(qtd + " caracter" + ((qtd == 1) ? "" : "es"));
};