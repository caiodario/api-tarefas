const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/User");

router.post("/v1/login", async (req, res) => {
  const { username, password } = req.body;

  // Verificação do JSON de envio
  if (!username) {
    res.status(400).send("O campo 'username' é obrigatório!");
    return;
  } else if (!password) {
    res.status(400).send("O campo 'password' é obrigatório!");
    return;
  } else {
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(404).send("Usuário não encontrado!");
      return;
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(404).send("Senha inválida!");
      return;
    }
    try {
      const secret = process.env.SECRET;
      const token = jwt.sign({ id: user._id }, secret); //{ expiresIn: 300 }; // Expira em 5min ;
      res.status(200).json({
        msg: `Login realizado com sucesso!`,
        id: `${user._id}`,
        token: `${token}`,
      });
    } catch (error) {
      res.status(500).send("Ocorreu um erro, tente novamente mais tarde!");
    }
  }
});

module.exports = router;
