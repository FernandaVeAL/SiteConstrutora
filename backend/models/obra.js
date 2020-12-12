const mongoose = require("mongoose");

const obraSchema = mongoose.Schema({
  inicio: { type: Date, required: true },
  termino: { type: Date, required: true },
  tipo: { type: String, required: true },
  porte: { type: String, required: true },
  endereco: { type: String, required: true },
  numero: { type: Number, required: true },
  bairro: { type: String, required: true },
  cidade: { type: String, required: true },
  estado: { type: String, required: true },
  complemento: { type: String, required: false },
  cep: { type: String, required: true },
  aviso: { type: String, required: false },
  progresso: { type: String, required: false },
  descricao: { type: String, required: true },
  idCliente: { type: String, required: true },
  datap1: { type: String, required: false },
  desp1: { type: String, required: false },
  datap2: { type: String, required: false },
  desp2: { type: String, required: false },
  datap3: { type: String, required: false },
  desp3: { type: String, required: false },
});

module.exports = mongoose.model("Obra", obraSchema);
