function JogoDAO(connection){
    this._connection = connection;
}

JogoDAO.prototype.gerarParametros = function(usuario){
    var dados = {
		operacao:   "inserir",
		json:       {
                        usuario: usuario,
                        moeda:     15,
                        suditos:   10,
                        temor:     Math.floor(Math.random() * 1000),
                        sabedoria: Math.floor(Math.random() * 1000),
                        comercio:  Math.floor(Math.random() * 1000),
                        magia:     Math.floor(Math.random() * 1000)
                    },
		collection: "jogo",
		callback:   function(err, result) {
						
					}
	};

	this._connection(dados); 
}

JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, comando_invalido){

    var dados = {
		operacao:   "getJogos",
		json:       usuario,
		collection: "jogo",
		callback:   function(err, result) {
                        console.log(result);
                        res.render('jogo', { img_casa: casa, jogo: result[0], comando_invalido: comando_invalido });
					}
	};

	this._connection(dados);
}

module.exports = function(){
    return JogoDAO;
}

// TODO: Atualizar