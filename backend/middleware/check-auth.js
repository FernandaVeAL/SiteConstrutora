const jwt = require("jsonwebtoken");
const senhas = require("../senha");
module.exports = (req, res, next) => {
  //split quebra a string em 2, usando espaço como separador
  //ou seja, gera um vetor em que a primeira posição
  //contém a palavra Bearer e a segunda contém o token desejado
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, senhas.senhatoken);
    next();
  } catch (err) {
    //se não existir o header authorization, tratamos o erro
    res.status(401).json({
      mensagem: "Autenticação falhou",
    });
  }
};
