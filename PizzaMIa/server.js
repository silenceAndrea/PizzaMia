const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ingegneria:IngegneriaInformatica@ingegneriainformatica.vielk.mongodb.net/IngegneriaInformatica?retryWrites=true&w=majority", {
    useNewUrlParser: true
});



const app = express();

// set the view engine to ejs
app.set("view engine", "ejs");

const FarinaSchema = new mongoose.Schema({ "_id": Number, "type": String });
const Farina = mongoose.model('farine', FarinaSchema);


const FormatoSchema = new mongoose.Schema({ "_id": String, "value": String, "boolean": Boolean });
const Formato = mongoose.model('formati', FormatoSchema);

const IngredientSchema = new mongoose.Schema({ "_id": String, "value": String });
const Ingredient = mongoose.model('ingredient', FormatoSchema);



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
app.get('/cercaPizzeria', async function (req, res) {
    // Find all employees
    const pizzerie = await Pizzeria.find({});
    console.log(pizzerie);
    res.render('pages/cercaPizzeria', { pizzerie });
});



app.listen(8080);
console.log('Server is listening on port 8080');