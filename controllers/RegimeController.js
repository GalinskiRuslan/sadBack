const {
  getAllRegime,
  getOneRegime,
  findOneDays,
  getAllDays,
  editRegime,
  getOneRegimeWithDay,
} = require("../DataBase/index");

class RegimeController {
  async getAllRegime(req, res) {
    console.log(123);
    try {
      return res.status(200).json(await getAllRegime());
    } catch (error) {
      return res.status(400).json("Ошибка сервера " + error);
    }
  }

  async getOneRegime(req, res) {
    try {
      const { id } = req.params;
      return res.status(200).json(await getOneRegime(id));
    } catch (error) {
      return res.status(400).json("Ошибка сервера " + error);
    }
  }
  async getOneDays() {
    try {
      const { id } = req.params;
      return res.status(200).json(await findOneDays(id));
    } catch (error) {
      return res.status(400).json("Ошибка сервера " + error);
    }
  }
  async getAllDays(req, res) {
    try {
      return res.status(200).json(await getAllDays());
    } catch (error) {
      return res.status(400).json("Ошибка сервера " + error);
    }
  }
  async editRegime(req, res) {
    try {
      const { id, dataTime, description, isActive, nutrition } = req.body;
      return res
        .status(200)
        .json(await editRegime(id, dataTime, description, isActive, nutrition));
    } catch (error) {
      return res.status(400).json("Ошибка сервера " + error);
    }
  }
  async getOneRegimeWithDay(req, res) {
    try {
      const { id } = req.params;
      return res.status(200).json(await getOneRegimeWithDay(id));
    } catch (error) {
      return res.status(400).json("Ошибка сервера " + error);
    }
  }
}
module.exports = new RegimeController();
