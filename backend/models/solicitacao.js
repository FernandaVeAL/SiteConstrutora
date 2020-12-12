const mongoose = require("mongoose");
const solicitacaoSchema = mongoose.Schema({
  tipo: { type: String, required: true },
  porte: { type: String, required: true },
  endereco: { type: String, required: true },
  numero: { type: Number, required: true },
  bairro: { type: String, required: true },
  cidade: { type: String, required: true },
  estado: { type: String, required: true },
  complemento: { type: String, required: false },
  cep: { type: String, required: true },
  idUsuario: { type: String, required: true },
  imagemURL: { type: String, required: true },
});

module.exports = mongoose.model("Solicitacao", solicitacaoSchema);
