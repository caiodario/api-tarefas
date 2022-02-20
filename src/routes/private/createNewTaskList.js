const router = require("express").Router();
const checkToken = require("../../modules/auth");
const User = require("../../models/User");
const List = require("../../models/List");

router.post("/v1/new-list/:id", checkToken, async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  if (id.length != 24) {
    res
      .status(400)
      .send("Parâmetro ID com formato diferente do esperado, verifique seu ID");
    return;
  }
  const user = await User.findById(id);
  if (!user) {
    res.status(404).send("Usuário não encontrado!");
    return;
  }

  try {
    if (!name) {
      res.status(404).send("É necessário informar um nome para sua nova lista");
      return;
    }
    const newList = {
      name,
      archived: false,
    };

    const checkListName = await List.findOne({ name: newList.name });
    if (checkListName) {
      res.status(400).send("Já existe uma lista com esse nome");
      return;
    } else {
      await List.create(newList);
      res.status(201).send("Nova lista de tarefas criada com sucesso!");
      return;
    }
  } catch (error) {
    res.status(500).send("Ocorreu um erro, tente novamente mais tarde!");
    return;
  }
});

module.exports = router;
