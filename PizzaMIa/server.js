const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require('swagger-jsdoc');



mongoose.connect("mongodb+srv://ingegneria:IngegneriaInformatica@ingegneriainformatica.vielk.mongodb.net/IngegneriaInformatica?retryWrites=true&w=majority", {
    useNewUrlParser: true
});



const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use( express.static( "public" ) );

// set the view engine to ejs
app.set("view engine", "ejs");

const FarinaSchema = new mongoose.Schema({ "_id": Number, "type": String });
const Farina = mongoose.model('farine', FarinaSchema);


const FormatoSchema = new mongoose.Schema({ "_id": String, "value": String, "boolean": Boolean });
const Formato = mongoose.model('formati', FormatoSchema);

const IngredientSchema = new mongoose.Schema({ "_id": String, "value": String });
const Ingredient = mongoose.model('ingredient', FormatoSchema);

const PizzeriaSchema = new mongoose.Schema({ "_id": String, "name": String ,"city":String,"state":String,"address":String,"number":String});
const Pizzeria = mongoose.model('pizzeria', PizzeriaSchema);



// index page
app.get('/', function (req, res) {
    res.render('pages/index');
});
/**
 * @swagger
 * /creaPizza:
 *   get:
 *     description: render a page that contain and take data from farine,formati,ingredients 
 *     responses:
 *       200:
 *         description: page rendered successfully
 */
// creaPizza page
app.get('/creaPizza', async function (req, res) {
    // Find all farine
    const farine = await Farina.find({});
    console.log(farine);

    // Find all formati
    const formati = await Formato.find({});
    console.log(formati);

    // Find all ingredients
    const ingredients = await Ingredient.find({});
    console.log(ingredients);

    res.render('pages/creaPizza', { farine,formati,ingredients });

});

/**
 * @swagger
 * /api/farina:
 *   get:
 *     description: Get all the farina
 *     responses:
 *       200:
 *         description: Returns the requested farine
 */
app.get('/api/farina', (request, response) => {

    Farina.find({},(error, result) => {
        if (error) {
            console.log(error);
        }

        response.send(result.json);
    })

})

// cercaPizzeria page


/**
 * @swagger
 * /cercaPizzeria:
 *   get:
 *     description: Get all the pizzeria
 *     responses:
 *       200:
 *         description: success
 */
app.get('/cercaPizzeria',async function (req, res) {
    var ricerca ="";
    const pizzerie = await Pizzeria.find({});
    console.log(pizzerie);
    res.render('pages/cercaPizzeria', { pizzerie ,ricerca});

});

app.post('/cercaPizzeria', async function (req, res) {

    var ricerca = req.body.ricerca;
    const pizzerie = await Pizzeria.find({ $or: [ {city:{$regex:ricerca, $options : 'i'}},
    {name:{$regex:ricerca, $options : 'i'}},
    {state:{$regex:ricerca, $options : 'i'}},
    {address:{$regex:ricerca, $options :'i'}}]});
    console.log(pizzerie);
    res.render('pages/cercaPizzeria', { pizzerie ,ricerca});
});

const swaggerOptions = {  
    swaggerDefinition: {  
        info: {  
            title:'Pizza Mia API',  
            version:'1.0.0'  
        }  
    },  
    apis:['server.js'],  
}  
const swaggerDocs = swaggerJSDoc(swaggerOptions);  
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));



var server = app.listen(8080);
module.exports = server;
console.log('Server is listening on port 8080');