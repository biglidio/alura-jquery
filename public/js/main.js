var qtdPalavras = $('.frase').text().split(" ").length;

$('#tamanho-frase').text(qtdPalavras + " palavra" + ((qtdPalavras == 1)?"":"s"));