const Sequelize = require("sequelize");

const sequelize = new Sequelize("BigR", "root", "gal4815162342war", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const Users = require("./models/UserModel")(sequelize);
const Regime = require("./models/RegimeModel")(sequelize);
// const Days = require("./models/DaysModel")(sequelize);
// Days.hasMany(Regime);
// Regime.belongsTo(Days);
// Содание таблицы с днями недели и режимов по дням

// const findOneDays = async (dayName) => {
//   return await Days.findOne({ where: { dayName: dayName } });
// };
// const getAllDays = async () => {
//   return await Days.findAll();
// };

const createRegim = async () => {
  try {
    Regime.create({
      id: 1,
      description: "Описание режима ",
      isActive: true,
      DayId: 1,
      nutrition: "Описание Питания",
    });
    Regime.create({
      id: 2,
      description: "Описание режима ",
      isActive: true,
      DayId: 2,
      nutrition: "Описание Питания",
    });
    Regime.create({
      id: 3,
      description: "Описание режима ",
      isActive: true,
      DayId: 3,
      nutrition: "Описание Питания",
    });
    Regime.create({
      id: 4,
      description: "Описание режима ",
      isActive: true,
      DayId: 4,
      nutrition: "Описание Питания",
    });
    Regime.create({
      id: 5,
      description: "Описание режима ",
      isActive: true,
      DayId: 5,
      nutrition: "Описание Питания",
    });
    Regime.create({
      id: 6,
      description: "Описание режима ",
      isActive: true,
      DayId: 6,
      nutrition: "Описание Питания",
    });
  } catch (error) {
    console.log(error);
  }
};
/* сonst createDaysTable = async () => {
  try {
    Days.create({
      id: 1,
      dayName: "Понедельник",
    });
    Days.create({
      id: 2,
      dayName: "Вторник",
    });
    Days.create({
      id: 3,
      dayName: "Среда",
    });
    Days.create({
      id: 4,
      dayName: "Четверг",
    });
    Days.create({
      id: 5,
      dayName: "Пятница",
    });
    Days.create({
      id: 6,
      dayName: "Суббота",
    });
  } catch (error) {
    console.error("Unable to create table : ", error);
  }
}; */

// Регистрация пользователя
const registerUser = async (data) => {
  try {
    const { user_name, user_role, password, user_email } = data;
    const user = await Users.create({
      user_name: user_name,
      user_role: user_role,
      password: password,
      user_email: user_email,
    });
    return await user;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const findOneUser = async (user_email) => {
  return await Users.findOne({ where: { user_email: user_email } });
};

// Режимы
const getOneRegime = async (id) => {
  const regime = await Regime.findOne({ where: { id: id } });
  return await regime;
};
const getOneRegimeWithDay = async (id) => {
  const regime = await Regime.findOne({ where: { dayId: id } }).then();
  return await regime;
};

const getAllRegime = async () => {
  return await Regime.findAll();
};
const editRegime = async (id, dataTime, description, isActive, nutrition) => {
  try {
    const regime = await Regime.update(
      {
        description: description,
        isActive: isActive,
        dataTime,
        nutrition,
      },
      {
        where: { id: id },
      }
    );
    return regime;
  } catch (error) {
    console.log(error);
    return error;
  }
};

sequelize
  .sync()
  .then(() => {
    console.log("Book table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });
setTimeout(async () => {
  // if (await findOneDays("Понедельник").then((data) => data === null)) {
  //   createDaysTable();
  // }
  if (
    await getOneRegime(1).then((data) => data === undefined || data === null)
  ) {
    console.log(await getOneRegime(1));
    setTimeout(() => {
      createRegim();
    }, 1000);
  }
}, 5000);
module.exports = {
  sequelize: sequelize,
  registerUser,
  findOneUser,
  getAllRegime,
  editRegime,
  getOneRegimeWithDay,
  // getAllDays,
  getOneRegime,
  // findOneDays,
};
