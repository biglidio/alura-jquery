$('.mostra-placar').click(mostraPlacar);
$('.botao-sync').click(sincronizarPlacar);

function inserePlacar(){
	var placar = $('.placar').find('tbody');
	var linha = novaLinha('Lucas', $('#palavras').text().split(" ")[0]);
	$(placar).prepend(linha);

	$('.placar').slideDown(600);
	scrollPlacar();
}

function novaLinha(usuario, pontos){
	var nome = usuario;
	var numPalavras = pontos;

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

	return linha;
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

function sincronizarPlacar(){
	var placar = [];
	var linhas = $('tbody > tr');

	linhas.each(function(){
		var usuario = $(this).find('td:nth-child(1)').text();
		var pontos = $(this).find('td:nth-child(2)').text();

		var score = {
			usuario: usuario,
			pontos: pontos
		}

		placar.push(score);
	});

	var dados = {
		placar: placar
	}

	$.post("http://localhost:3000/placar", dados);
}

function atualizaPlacar(){
	$.get("http://localhost:3000/placar", function(data){
		$(data).each(function(){
			var linha = novaLinha(this.usuario, this.pontos);
			$('tbody').prepend($(linha));
		});
	});
}