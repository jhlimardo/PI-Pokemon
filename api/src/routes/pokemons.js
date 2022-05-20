const express = require('express');
const axios = require('axios');
const {Pokemon, Type, pokemon_type} = require('../db');
const router = express.Router();
const {v4: uuidv4} = require('uuid');

//-------------------------------------------------------------------------------------------------------
// Función para traer todos los pokemons desde la API
//-------------------------------------------------------------------------------------------------------
const data = async () => {
    // Declaro un array donde coloco el listado los primeros 40 pokemons desde la api 
    
    let apiArray = (await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=40')).data.results;
    //console.log("Pruebo si me trae la API:", apiArray);
    let newApiArray = [];
    for (let i = 0; i < apiArray.length; i++) {
        // Guardo en newApiArray los pokemons que tengo dentro de ApiArray
        newApiArray.push(axios.get(apiArray[i].url));
    }
    // mediante una promesa me traigo todos los pokemons y los guardo en un array
    let resultado = (await Promise.all(newApiArray)).map(poke =>
        {
            return {
                id: poke.data.id,
                name: poke.data.name,
                types: poke.data.types.map(t => t.type),
                img: poke.data.sprites.other.dream_world.front_default,
                attack: poke.data.stats[1].base_stat,
                defense: poke.data.stats[2].base_stat,

            }
        });
       // console.log("PRUEBO QUE EL RESULTADO SEA EL ESPERADO", resultado);
    return resultado;
}

//-------------------------------------------------------------------------------------------------------
// GET -> muestro todos los pokemons traidos de la API + los de las DB
//-------------------------------------------------------------------------------------------------------
// router.get('/', async (req, res, next) => {
//     try {
//         const pokemons = await getPokeJoin();
//         res.json(pokemons);
//     } catch (error) {
//         next(error);
//     }
 
// });


//-------------------------------------------------------------------------------------------------------
// POST -> Carga de nuevos pokemons a la DB
//-------------------------------------------------------------------------------------------------------


router.post('/', async (req, res, next) => {
    try {
        // obtengo los datos del pokemon que me pasan por body con destructuring
        const {name, life, attack, defense, speed, height, weight, img, type} = req.body;

        const newPokemon = await Pokemon.create({ 
            name: name.toLowerCase(),
            life,
            attack,
            defense,
            speed,
            height,
            weight,
            img,
        })
        // creo el pokemon_type con los datos que me pasan por body
        await newPokemon.setTypes(type);
        res.status(201).send(newPokemon)

    } catch (error) {
        res.send(error.message);
    }
    
}); 
 
//-------------------------------------------------------------------------------------------------------
// POST -> Creo un ruta donde relaciono el id con el pokemon y el id del tipo
//-------------------------------------------------------------------------------------------------------
router.post('/:pokemonId/type/:typeId', async (req, res, next) => {
    try {
        const {pokemonId, typeId} = req.params; // destructuring de datos que me pasan por parametros
        const pokemon = await Pokemon.findByPk(pokemonId); // busco el pokemon por id
        await pokemon.addType(typeId); // agrego el tipo al pokemon usando mixin de secualize
        res.status(201).send(pokemon)
    }catch (error) {
        next(error)
    }       
});


//-------------------------------------------------------------------------------------------------------
// Obtengo todos los pokemons de la DB y los pongo en getPokeFromDb
//-------------------------------------------------------------------------------------------------------
const getPokeFromDb = async () => {
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['id', 'name'],
            through: {
                attributes: []
        }
    }
    })
}

//-------------------------------------------------------------------------------------------------------
// Ahora junto los pokemons de la DB con los de la API y los pongo en getPokeJoin
//-------------------------------------------------------------------------------------------------------
const getPokeJoin = async () => {
    const fromApi = await data();
    const fromDB = await getPokeFromDb();
    const allPokemons = fromDB.concat(fromApi);
    return allPokemons;
}


//-------------------------------------------------------------------------------------------------------
// GET -> muestro un pokemon por id
//-------------------------------------------------------------------------------------------------------
router.get('/:id', async (req, res, next) => {
    const {id} = req.params
    let pokeId;
   
       if(id.length > 6) {
           try {
               const resDb= await Pokemon.findByPk(id, {include : Type})
               pokeId = {
                   id: resDb.id,
                   name: resDb.name,
                   types: resDb.types.map(t => t),   
                   img: resDb.img,
                   life: resDb.life,
                   attack: resDb.attack,
                   defense: resDb.defense,
                   speed: resDb.speed,
                   height: resDb.height,
                   weight: resDb.weight

                }
                res.json(pokeId)

               
           } 
           catch (error) {
               res.status(404).send({msg:'Pokemon not found'})
               
            }
                    
        } 
        else {
            try {
                const resPoke= (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`))
                pokeId = {
                    id: resPoke.data.id,
                    name: resPoke.data.name,
                    types: resPoke.data.types.map(t => t.type),
                    img: resPoke.data.sprites.other.dream_world.front_default,
                    life: resPoke.data.stats[0].base_stat,
                    attack: resPoke.data.stats[1].base_stat,
                    defense: resPoke.data.stats[2].base_stat,
                    speed: resPoke.data.stats[5].base_stat,
                    height: resPoke.data.height,
                    weight: resPoke.data.weight
                
                }
           
                res.status(200).send(pokeId)
            } 
            catch (err) {
                res.status(404).send({msg:'Pokemon not found'})
            }
        }
    });

// //-------------------------------------------------------------------------------------------------------
// // GET -> muestro un pokemon por nombre o todos si no paso un nombre
// //-------------------------------------------------------------------------------------------------------

router.get('/', async(req,res)=>{
   
    const {name}= req.query;
  
    try{
        
    if (name) {
        
        const pokeBd = await Pokemon.findAll({
            where: {
                name: name,
            },
            include: {
                model: Type,
            },
        })
        if (pokeBd != 0) {
            let respBd = pokeBd.map(p => {
                return {
                    id: p.id,
                    name: p.name,
                    types: p.types.map(t => t),
                    img: p.img,
                    life: p.life,
                    attack: p.attack,
                    defense: p.defense,
                    speed: p.speed,
                    height: p.height,
                    weight: p.weight

                }
            })
            res.status(200).send(respBd)
        }
        else {
                  
            const pokeApi = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`))
            let respApi = [
                {
                    id: pokeApi.data.id,
                    name: pokeApi.data.name,
                    types: pokeApi.data.types.map(t => t.type),
                    img: pokeApi.data.sprites.other.dream_world.front_default,
                    life: pokeApi.data.stats[0].base_stat,
                    attack: pokeApi.data.stats[1].base_stat,
                    defense: pokeApi.data.stats[2].base_stat,
                    speed: pokeApi.data.stats[5].base_stat,
                    height: pokeApi.data.height,
                    weight: pokeApi.data.weight
                }
            ]
            res.status(200).send(respApi)

        }
    }
    else {
        //res.status(404).send({msg:'Debe Ingresar un nombre'})
        try {
            const pokemons = await getPokeJoin();
            res.json(pokemons);
        } catch (error) {
            next(error);
        }
    }
 } catch (err) {
    res.status(404).send({msg:'Pokemon not found'})
}

// Borrar pokemon por id
router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const pokemon = await Pokemon.findByPk(id);
        await pokemon.destroy();
        res.status(200).send({msg: 'Pokemon deleted'})
    } catch (error) {
        next(error)
    }
})

//Modificar pokemon por id
router.put('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        // const {name, life, attack, defense, speed, height, weight, img, type} = req.body;
        const pokeUpdate = await Pokemon.findByPk(id);
        await pokeUpdate.update({
            name,
            life,
            attack,
            defense,
            speed,
            height,
            weight,
            img,
        });
        await pokeUpdate.setTypes(type);
        res.status(200).send({msg: 'Pokemon updated'})
    } catch (error) {
        next(error)
    }
})
    
    
});

module.exports = router;