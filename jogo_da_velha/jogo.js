var rodada = 1;
var matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;

$(document).ready(function(){

	$('#btn_iniciar_jogo').click(function(){

		//valida a digitação do jogador
		if($('#entrada_apelido1').val() == ''){
			alert('Nome jogador 1 não foi preenchido');
			return false;
		}

		if($('#entrada_apelido2').val() == ''){
			alert('Nome jogador 2 não foi preenchido');
			return false;
		}

		//exibir os apelidos
		$('#nome_jogador1').html($('#entrada_apelido1').val());
		$('#nome_jogador2').html($('#entrada_apelido2').val());

		$('#pagina_inicial').hide();
		$('#palco_jogo').show();
	});

	$('.jogada').click(function(){

		var id_campo_clicado = this.id;
		$('#'+id_campo_clicado).off();
		jogada(id_campo_clicado);
	});

	function jogada(id){
		var icone = '';
		var ponto = 0;

		if((rodada % 2) == 1){

			icone = 'url("imagens/marcacao_1.png")';
			ponto = -1;
		}else{
			icone = 'url("imagens/marcacao_2.png")';
			ponto = 1;
		}
		
		rodada++;
		$('#'+id).css('background-image', icone);
		
		var linha_coluna = id.split('-');

		matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

		verifica_combinacao();
		
	}

	function verifica_combinacao(){

		//verifica na horizontal
		var pontos = 0;
		for(var i =1; i <= 3; i++){
			pontos = pontos + matriz_jogo['a'][i];
		}
		ganhador(pontos);

		pontos = 0;
		for(var i =1; i <= 3; i++){
			pontos = pontos + matriz_jogo['b'][i];
		}
		ganhador(pontos);

		pontos = 0;
		for(var i =1; i <= 3; i++){
			pontos = pontos + matriz_jogo['c'][i];
		}
		ganahdor(pontos);

		//verifica na vertical
		for(var v = 1; v <= 3; v++){
			pontos = 0;
			pontos += matriz_jogo['a'][v];
			pontos += matriz_jogo['b'][v];
			pontos += matriz_jogo['c'][v];
			ganhador(pontos);
		}

		//verifica na diagonal
		pontos = 0;

		pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
		ganhador(pontos);

		pontos = 0;
		pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
		ganhador(pontos);

	}

	function ganhador(pontos){
		if(pontos == -3){
			var jogada_1 = $('#entrada_apelido1').val();
			alert( jogada_1 + ' é o vencedor');
			$('.jogada').off();
		}else if(pontos == 3){
			var jogada_2 = $('#entrada_apelido2').val();
			alert(jogada_2 + ' é o vencedor');
			$('.jogada').off();
		}
	}

});