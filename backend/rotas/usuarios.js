const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");
const senhas = require("../senha");

router.post("", (req, res, next) => {
  console.log(req.body);
  bcrypt.hash(req.body.senha, 10).then((hash) => {
    const usuario = new Usuario({
      nome: req.body.nome,
      email: req.body.email,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      senha: hash,
      tipoUsuario: req.body.tipoUsuario,
    });
    usuario.save().then((usuarioInserido) => {
      res.status(201).json({
        mensagem: "Usuario inserido",
        id: usuarioInserido._id,
      });
    });
  });
});

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const page = +req.query.page;
  console.log(req.query.tipoUsuario);
  const consulta = Usuario.find({ tipoUsuario: req.query.tipoUsuario });
  let usuariosEncontrados;
  if (pageSize && page) {
    consulta.skip(pageSize * (page - 1)).limit(pageSize);
  }
  consulta
    .then((documents) => {
      usuariosEncontrados = documents;
      return Usuario.countDocuments();
    })
    .then((count) => {
      console.log(usuariosEncontrados);
      res.status(200).json({
        mensagem: "Tudo OK",
        usuarios: usuariosEncontrados,
        maxUsuarios: count,
      });
    });
});

router.get("/:id", (req, res, next) => {
  Usuario.findById(req.params.id).then((cli) => {
    if (cli) {
      res.status(200).json(cli);
    } else res.status(404).json({ mensagem: "usuario não encontrado!" });
  });
});
router.get("/:email", (req, res, next) => {
  Usuario.findOne(req.params.email).then((err, usu) => {
    if (usu) {
      res.status(200).json(usu);
    } else res.status(404).json({ mensagem: "Usuário não encontrado!" });
  });
});
router.delete("/:id", checkAuth, (req, res, next) => {
  Usuario.deleteOne({ _id: req.params.id }).then((resultado) => {
    console.log(resultado);
    res.status(200).json({ mensagem: "usuario removido" });
  });
});
router.put("/:id", checkAuth, (req, res, next) => {
  const usuario = new Usuario({
    _id: req.params.id,
    nome: req.body.nome,
    email: req.body.email,
    cpf: req.body.cpf,
    telefone: req.body.telefone,
    senha: req.body.senha,
  });
  Usuario.updateOne({ _id: req.params.id }, usuario).then((resultado) => {
    console.log(resultado);
  });
  res.status(200).json({ mensagem: "Atualização realizada com sucesso" });
});

router.post("/login", (req, res, next) => {
  let user;
  console.log(req.body);
  Usuario.findOne({ email: req.body.email })
    .then((u) => {
      user = u;
      if (!u) {
        return res.status(401).json({
          mensagem: "email inválido",
        });
      }
      return bcrypt.compare(req.body.senha, u.senha);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          mensagem: "senha inválida",
        });
      }
      const token = jwt.sign(
        { email: user.email, id: user._id },
        senhas.senhatoken,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        tipoUsuario: user.tipoUsuario,
        idUsuario: user._id,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        mensagem: "Login falhou: " + err,
      });
    });
});
module.exports = router;
