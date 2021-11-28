const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//const axios = require('axios');
const pokemonRoute = require('./pokemons.js');
const typeRoute = require('./types.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokemonRoute);
router.use('/types', typeRoute);


module.exports = router;
