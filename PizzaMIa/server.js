const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb+srv://ingegneria:IngegneriaInformatica@ingegneriainformatica.vielk.mongodb.net/IngegneriaInformatica?retryWrites=true&w=majority", {
    useNewUrlParser: true
});



const app = express();

app.use(bodyParser.urlencoded({extended:false}));

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

// cercaPizzeria page
async function getPizzeria(req, res) {

    const pizzerie = await Pizzeria.find({});
    console.log(pizzerie);
    res.render('pages/cercaPizzeria', { pizzerie });

}
async function postPizzeria(req, res) {

    var ricerca = req.body.ricerca;
    const pizzerie = await Pizzeria.find({ $or: [ {city:{$regex:ricerca, $options : 'i'}},{name:{$regex:ricerca, $options : 'i'}},{state:{$regex:ricerca, $options : 'i'}},{address:{$regex:ricerca, $options :'i'}}]});
    console.log(pizzerie);
    res.render('pages/cercaPizzeria', { pizzerie });
}
app.route('/cercaPizzeria').get(getPizzeria).post(postPizzeria);




app.listen(8080);
console.log('Server is listening on port 8080');