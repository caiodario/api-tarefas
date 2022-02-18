const router = require("express").Router();
const req = require("express/lib/request");

router.post("/status", async (req, res) => {
  try {
    res.status(204).send();
  } catch (error) {
    res
      .status(503)
      .send("Não foi possível verificar o status da conexão com a API");
  }
});

module.exports = router;
