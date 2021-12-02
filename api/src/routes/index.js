require('dotenv').config();
const { Router } = require('express');
const {Videogame,Genres} = require('../db');
const axios = require('axios').default;
const { Op } = require('sequelize');

const {
    API_KEY,
  } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// ROUTER

router.get('/videogames',async(req,res)=>{
    try{
        // Obtaining name by query
        const {name} = req.query;
        // If there is a name query then we must search in DB and API
        if(name){ 
            // DB search
            let gameByNameInDB = await Videogame.findAll({
                where:{
                    name: { [Op.iLike]: '%' + name + '%' },
                },
                include: Genres
            })
            // API search
            const g = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
            const gameByNameInAPI = await g.data.results.map(e=>{
                return {
                    name: e.name,
                    image: e.background_image,
                    rating: e.rating,
                    genres: e.genres.map(p=>p.name),
                    id:e.id
                };
            })
            // returning 
            const toReturnByName = gameByNameInDB.concat(gameByNameInAPI);
            toReturnByName.length ? res.status(200).send(toReturnByName):res.status(404).send('Not founded');
        }else{
            // If there isn't a name query then we have to show all games in API and DB

            // games in DB
            const allVideogamesInDB = await Videogame.findAll({
                include:Genres
            }); 
            // As we have lots videogame pages in our API, we have to show some of them 
            // I'm going to show the first 50 pages.
            // games in API - first 50 pages
            let showVideogamesF50P =[];
            let URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
            for(let i =0;i<5;i++){
                let allVideogames = await axios.get(URL);
                const videogames = await allVideogames.data.results.map(e=>{
                    return {
                        name: e.name,
                        image: e.background_image,
                        rating: e.rating,
                        genres: e.genres.map(p=>p.name),
                        id: e.id
                    };
                })
                showVideogamesF50P = showVideogamesF50P.concat(videogames);
                URL=allVideogames.data.next;
            }
            // returning 
            const toReturn = allVideogamesInDB.concat(showVideogamesF50P);
            if(toReturn.length===0){
                res.status(404).send('Videogame not found!');
            }else{
                res.status(200).send(toReturn);
            }
        }
    }catch{
        res.status(400).send('Something went wrong! :(');
    }
})

router.get('/videogame/:id',async(req,res)=>{
    try{
        const {id} = req.params;    // catch id from params in url
        // as we are working with two different types of ids (ids from videogame api and 
        // ids from database) we have to search in both places.
        // Search in DB
        if(id.includes('-')){
        const getByIDFromDB = await Videogame.findAll({
                where: {id:id},
                include: Genres
            })
            console.log(getByIDFromDB);
            return res.status(200).send(getByIDFromDB);
        }else{
            // id provided is from a api videogame - Search in API
            const e = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data;
            const r= {
                name: e.name,
                description: e.description,
                released: e.released,
                image: e.background_image,
                rating: e.rating,
                platforms: e.parent_platforms.map(p=>p.platform.name),
                genres: e.genres.map(p=>p.name),
                id: e.id
            };
            return res.status(200).send(r);
        }
    }catch{
        res.status(404).send('Something went wrong! :(');
    }
})

router.get('/genres', async (_, res) => {
    try {
      const genreAPI = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data;
      const genresNames = genreAPI.results.map(e=>{
          return{
              name:e.name,
              //id:e.id,
              //games: e.games.map(g=>g.name)
          }
      });
      genresNames.forEach(gn => {
          Genres.findOrCreate({
              where:{
                  name:gn.name,
                  //id:String(gn.id),
                  //games:gn.games
              }
          })
      });
      const allGenres = await Genres.findAll();
      res.status(200).send(allGenres);
    } catch {
      res.status(404).send('Something went wrong! :(');
    }
  });


router.post('/videogame',async(req,res)=>{
    try{    
        let {
            name,
            description,
            released,
            rating,
            platforms,
            image,
            genres,
            createdInDb
        } = req.body;
        let newVideogame = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
            image,
            createdInDb
        })
        let genreDB = await Genres.findAll({
            where:{name : genres}
        })
        newVideogame.addGenres(genreDB);
        res.status(200).send('Succesful');
    }catch{
        res.status(404).send('Something went wrong! :(');
    }
})

module.exports = router;