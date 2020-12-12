const express = require("express");
const multer = require("multer");
const router = express.Router();
const Solicitacao = require("../models/solicitacao");

const MIME_TYPE_EXTENSAO_MAPA = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/bmp": "bmp",
};

// const teste = () => {
//   a = 3;
//   b = 4;
//   if (2 == 3) {
//     var a = 2;
//     let b = 3;
//     b = 5;
//     const c = 4;
//     c = 5;
//   }
// };

const armazenamento = multer.diskStorage({
  destination: (req, file, callback) => {
    let e = MIME_TYPE_EXTENSAO_MAPA[file.mimetype]
      ? null
      : new Error("Mime Type Invalid");
    callback(e, "backend/imagens");
  },
  filename: (req, file, callback) => {
    const nome = file.originalname.toLowerCase().split(" ").join("-");
    const extensao = MIME_TYPE_EXTENSAO_MAPA[file.mimetype];
    console.log(`${nome}-${Date.now()}.${extensao}`);
    callback(null, `${nome}-${Date.now()}.${extensao}`);
  },
});

router.post(
  "",
  multer({ storage: armazenamento }).single("imagem"),
  (req, res, next) => {
    const imagemURL = `${req.protocol}://${req.get("host")}`;
    const solicitacao = new Solicitacao({
      tipo: req.body.tipo,
      porte: req.body.porte,
      endereco: req.body.endereco,
      numero: req.body.numero,
      bairro: req.body.bairro,
      cidade: req.body.cidade,
      estado: req.body.estado,
      complemento: req.body.complemento,
      cep: req.body.cep,
      idUsuario: req.body.idUsuario,
      imagemURL: `${imagemURL}/imagens/${req.file.filename}`,
    });
    solicitacao.save().then((solicitacaoInserido) => {
      res.status(201).json({
        mensagem: "Solicitacao inserido",
        solicitacao: {
          id: solicitacaoInserido._id,
          tipo: solicitacaoInserido.tipo,
          porte: solicitacaoInserido.porte,
          endereco: solicitacaoInserido.endereco,
          numero: solicitacaoInserido.numero,
          bairro: solicitacaoInserido.bairro,
          cidade: solicitacaoInserido.cidade,
          estado: solicitacaoInserido.estado,
          complemento: solicitacaoInserido.complemento,
          cep: solicitacaoInserido.cep,
          idUsuario: solicitacaoInserido.idUsuario,
          imagemURL: solicitacaoInserido.imagemURL,
        },
      });
    });
  }
);

module.exports = router;
