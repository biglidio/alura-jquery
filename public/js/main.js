$('.campo').on('input', function(){
	var campo = $(this);
	var texto = campo.val();

	var qtdPalavras = texto.split(/\S+/).length -1;
	$('#palavras').text(qtdPalavras + " palavra" + ((qtdPalavras == 1) ? "" : "s"));

	var qtdCaracteres = texto.length;
	$('#caracteres').text(qtdCaracteres + " caracter" + ((qtdCaracteres == 1) ? "" : "es"));
});