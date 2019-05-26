$('.mostra-placar').click(mostraPlacar);

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
	$('.placar').slideDown(600);
	scrollPlacar();
}

function removerPlacar(e){
	e.preventDefault();
	var linha = $(this).parent().parent();
	linha.stop().fadeOut();
	setTimeout(function(){
		linha.stop().remove();
	}, 1000);
}

function mostraPlacar(){
	$('.placar').stop().slideToggle(600);
}

function scrollPlacar(){
	var posicaoPlacar = $('.placar').offset().top;
	$("html, body").animate(
	{
		scrollTop: posicaoPlacar+"px"
	}, 1000);
}