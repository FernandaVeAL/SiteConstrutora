const express = require("express");
const router = express.Router();
const Obra = require("../models/obra");

router.post("", (req, res, next) => {
  const obra = new Obra({
    nome: req.body.nome,
    inicio: req.body.inicio,
    termino: req.body.termino,
    tipo: req.body.tipo,
    porte: req.body.porte,
    endereco: req.body.endereco,
    numero: req.body.numero,
    bairro: req.body.bairro,
    cidade: req.body.cidade,
    estado: req.body.estado,
    complemento: req.body.complemento,
    cep: req.body.cep,
    aviso: req.body.aviso,
    progresso: req.body.progresso,
    descricao: req.body.descricao,
  });
  obra.save().then((obraInserido) => {
    res.status(201).json({
      mensagem: "Obra inserido",
      id: obraInserido._id,
    });
  });
});

router.get("", (req, res, next) => {
  Obra.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      obra: documents,
    });
  });
});
router.get("/:id", (req, res, next) => {
  Obra.findById(req.params.id).then((obr) => {
    if (obr) {
      res.status(200).json(obr);
    } else res.status(404).json({ mensagem: "Obra não encontrado!" });
  });
});
router.delete("/:id", (req, res, next) => {
  Obra.deleteOne({ _id: req.params.id }).then((resultado) => {
    console.log(resultado);
    res.status(200).json({ mensagem: "Obra removido" });
  });
});
router.put("/:id", (req, res, next) => {
  const obra = new Obra({
    _id: req.params.id,
    nome: req.body.nome,
    inicio: req.body.inicio,
    termino: req.body.termino,
    tipo: req.body.tipo,
    porte: req.body.porte,
    endereco: req.body.endereco,
    numero: req.body.numero,
    bairro: req.body.bairro,
    cidade: req.body.cidade,
    estado: req.body.estado,
    complemento: req.body.complemento,
    cep: req.body.cep,
    aviso: req.body.aviso,
    progresso: req.body.progresso,
    descricao: req.body.descricao,
    datap1: req.body.data1,
    desp1: req.body.desp1,
    datap2: req.body.data2,
    desp2: req.body.desp2,
    datap3: req.body.data3,
    desp3: req.body.desp3,
  });
  Obra.updateOne({ _id: req.params.id }, obra).then((resultado) => {
    console.log(resultado);
  });
  res.status(200).json({ mensagem: "Atualização realizada com sucesso" });
});
module.exports = router;
