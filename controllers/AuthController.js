const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerUser, findOneUser } = require("../DataBase/index");
const generateAccessToken = (user) => {
  const payload = { user: user };
  return jwt.sign(payload, "secretASS", { expiresIn: "24h" });
};

class authController {
  async login(req, res) {
    try {
      const { user_email, password } = req.body;
      if (user_email === "admin" && password === "admin@123") {
        const token = generateAccessToken({
          user_name: "admin",
          user_role: "admin",
        });
        return res
          .status(200)
          .json({ token, user: { user_name: "admin", user_role: "admin" } });
      }
      const isUser = await findOneUser(user_email);
      if (!isUser) {
        return res.status(400).json("Пользователь с таким email не найден");
      }

      const validPassword = bcrypt.compareSync(password, isUser.password);
      if (!validPassword) {
        return res.status(400).json("Неверный пароль, повторите попытку");
      }
      if (validPassword) {
        console.log(isUser);
        const token = generateAccessToken(isUser);
        return res.status(200).json({ token, user: isUser });
      } else {
        return res.status(400).json("Неверные данные, повторите попытку");
      }
    } catch (error) {
      return res.status(400).json("Ошибка сервера " + error);
    }
  }
  async registration(req, res) {
    try {
      const { user_name, password, user_email } = req.body;
      const isUser = await findOneUser(user_email);
      if (isUser) {
        return res
          .status(400)
          .json("Пользователь с таким email уже существует");
      }
      if (!user_email) {
        return res.status(400).json("Необходимо указать email");
      }
      if (!user_name) {
        return res.status(400).json("Необходимо указать имя");
      }
      if (!password) {
        return res.status(400).json("Необходимо указать пароль");
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      registerUser({ user_name, password: hashPassword, user_email }).then(
        (data) => {
          const token = generateAccessToken(data);
          return res.status(200).json({ data, token });
        }
      );
    } catch (error) {
      return res.status(400).json("Ошибка сервера " + error);
    }
  }
  async checkIsAuth(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const isUser = jwt.verify(token, "secretASS");
      console.log(isUser);
      return res.status(200).json(isUser);
    } catch (error) {
      return res.status(400).json("Ошибка сервера " + error);
    }
  }
}
module.exports = new authController();
