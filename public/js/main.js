var campo = $('.campo');
campo.on('input', function(){
	var campo = $(this);
	var texto = campo.val();

	var qtdPalavras = texto.split(/\S+/).length -1;
	$('#palavras').text(qtdPalavras + " palavra" + ((qtdPalavras == 1) ? "" : "s"));

	var qtdCaracteres = texto.length;
	$('#caracteres').text(qtdCaracteres + " caracter" + ((qtdCaracteres == 1) ? "" : "es"));
});

var tempoRestante = 3;
$('#segundos').text(tempoRestante + " segundo" + ((tempoRestante == 1) ? "" : "s"));

campo.one('focus', function(){
	var intervalo = setInterval(function(){
		tempoRestante--;
		$('#segundos').text(tempoRestante + " segundo" + ((tempoRestante == 1) ? "" : "s"));
		
		if(tempoRestante < 1) {
			campo.attr('disabled', 1);
			clearInterval(intervalo);
			
			var gameOver = $(document.createElement('div'));
			gameOver.text('Game Over!')
				.css('color', 'red')
				.css('font-style', 'italic');
			$(campo).after(gameOver);
		}
	}, 1000); 
});