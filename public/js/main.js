var campo = $('.campo');
var tempoInicial = 5;
var btnReiniciar = $('.reiniciar');

$(function(){
	tamanhoFrase();
	calculaTamanhos();
	inicializaCronometro();
	inicializaCorretor();
	btnReiniciar.click(reiniciaJogo);
});

function tamanhoFrase(){
	var frase = $('.frase').text();
	var qtdPalavras = frase.split(/\S+/).length -1;
	atualizaPalavras(qtdPalavras, '#palavras-frase');
}

function calculaTamanhos(){
	campo.on('input', function(){
		var texto = campo.val();
	
		var qtdPalavras = texto.split(/\S+/).length -1;
		var qtdCaracteres = texto.length;

		atualizaPalavras(qtdPalavras, '#palavras');
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
				finalizaJogo();
				clearInterval(intervalo);
			}
		}, 1000); 
	});
}

function finalizaJogo(){
	campo.attr('disabled', 1);
	campo.toggleClass('campo-desativado');
	btnReiniciar.attr('disabled', false);

	var gameOver = $(document.createElement('span'));
	gameOver.text('Game Over!')
		.addClass('game-over')
		.css('color', 'red')
		.css('font-style', 'italic');
	$(campo).after(gameOver);

	inserePlacar();
}

function reiniciaJogo(){
	campo.val("");
	campo.attr('disabled', false);
	campo.toggleClass('campo-desativado');
	campo.removeClass('correto errado');
	
	btnReiniciar.attr('disabled', true);
	$('.game-over').remove();
	atualizaTempo(tempoInicial);
	atualizaPalavras(0, '#palavras');
	atualizaCaracteres(0);
	inicializaCronometro();
}

function atualizaTempo(tempo){
	$('#segundos').text(tempo + " segundo" + ((tempo == 1) ? "" : "s"));
}

function atualizaPalavras(qtd, elem){
	$(elem).text(qtd + " palavra" + ((qtd == 1) ? "" : "s"));
}

function atualizaCaracteres(qtd){
	$('#caracteres').text(qtd + " caracter" + ((qtd == 1) ? "" : "es"));
};

function inicializaCorretor(){
	campo.on('input', function(){
		if ($('.frase').text().includes(campo.val())) {
			campo.addClass('correto');
			campo.removeClass('errado');
		} else {
			campo.removeClass('correto');
			campo.addClass('errado');
		}
	});
}