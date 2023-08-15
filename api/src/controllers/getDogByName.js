require("dotenv").config();
const { URL } = process.env;
const axios = require("axios");
const { Dog } = require("../db");
const { Op } = require("sequelize");

const getDogByName = async (req, res) => {
  try {
    const dogName = req.query.name;

    // Buscar en la base de datos ignorando mayúsculas y minúsculas
    const dataDB = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${dogName}%`
        }
      }
    });

    const response = await axios.get(`${URL}?name=${dogName}`);
    const dataApi = response.data;

    const combinedResults = dataDB.concat(dataApi);

    if (combinedResults.length > 0) {
      return res.status(200).json(combinedResults);
    } else {
      return res.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getDogByName;
