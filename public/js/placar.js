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
}

function removerPlacar(e){
	e.preventDefault();
	$(this).parent().parent().remove();
}

function mostraPlacar(){
	$('.placar').slideToggle(600);
}