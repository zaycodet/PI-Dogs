const { Router } = require('express');
const getDogs = require('../controllers/getDogs');
const getDogById = require('../controllers/getDogById');
const getDogByName = require('../controllers/getDogByName');
const postDog = require('../controllers/postDog');
const getTemperaments = require('../controllers/getTemperaments');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/dogs', postDog);
router.get('/dogs', getDogs);
router.get('/dogs/:idRace', getDogById);
router.get('/dogsname', getDogByName);
router.get('/temperaments', getTemperaments);



module.exports = router;
