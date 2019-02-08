function UsuariosDAO(connection){
	this._connection = connection;
}

UsuariosDAO.prototype.inserirUsuario = function(usuario, res){
	var dados = {
		operacao:   "inserir",
		json:    usuario,
		collection: "usuarios",
		callback:   function(err, result) {
						
					}
	};

	this._connection(dados); 
};

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
	var dados = {
		operacao:   "autenticar",
		json:    usuario,
		collection: "usuarios",
		callback:   function(err, result) {
						if(result[0] != undefined){

							req.session.autorizado = true;

							req.session.usuario = result[0].usuario;
							req.session.casa = result[0].casa;
						}

						if(req.session.autorizado){
							res.redirect("jogo");
						} else {
							res.render("home", {validacao: {}});
						}
					}
	};

	this._connection(dados); 
};


module.exports = function(){
	return UsuariosDAO;
};