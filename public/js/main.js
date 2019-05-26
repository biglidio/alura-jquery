var campo = $('.campo');
var tempoInicial = 2;
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

function inserePlacar(){
	var placar = $('.placar').find('tbody');
	var nome = 'Biglidio';
	var numPalavras = $('#palavras').text().split(" ")[0];

	var colNome = $('<td>').text(nome);
	
	var colNumPalavras = $('<td>').text(numPalavras);
	
	var colRemover = $('<td>');
	var link = $('<a>').addClass('remover-placar').attr('href', '#');
	var icone = $('<i>').addClass('small material-icons').text('delete');
	colRemover.append(link.append(icone));
	link.click(removerPlacar);
	
	var linha = $('<tr>');
	linha.append(colNome);
	linha.append(colNumPalavras);
	linha.append(colRemover);
	
	$(placar).prepend(linha);
}
function removerPlacar(e){
	e.preventDefault();
	$(this).parent().parent().remove();
}
