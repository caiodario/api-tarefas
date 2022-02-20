const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");

router.post("/v1/register", async (req, res) => {
  const { username, password } = req.body;
  const regex = /^[a-z-0-9]+$/; // Permite apenas caraceteres minusculos e números.
  const checkUsername = regex.test(username);
  // Validação do JSON de envio
  if (!checkUsername) {
    res
      .status(400)
      .send(
        "Para o campo 'username' é permitido somente letras minusculas e números!"
      );
    return;
  } else if (!username) {
    res.status(400).send("O campo 'username' é obrigatório!");
    return;
  } else if (!password) {
    res.status(400).send("o campo 'password' é obrigatório!");
    return;
  } else {
    //Inicia o processo de criação de usuário

    //Encripta a senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = {
      username,
      password: passwordHash,
    };

    try {
      const uniqueUsername = await User.findOne({ username: user.username });
      if (uniqueUsername) {
        res.status(400).send("Usuário já existe");
      } else {
        await User.create(user);
        res.status(201).send("Usuário criado com sucesso!");
      }
    } catch (error) {
      res.status(500).send("Ocorreu um erro, tente novamente mais tarde!");
    }
  }
});

module.exports = router;
