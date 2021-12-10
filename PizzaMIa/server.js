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

// departments page
app.get('/departments', async function (req, res) {
    // Find all departments
    const farine = await Farina.find({});
    console.log(farine);
    const formati = await Formato.find({});
    console.log(formati);
    const ingredients = await Ingredient.find({});
    console.log(ingredients);

    res.render('pages/departments', { farine,formati,ingredients });

});

// employees page
app.get('/employees', async function (req, res) {
    // Find all employees
    const employees = await Formato.find({});
    console.log(employees);
    res.render('pages/employees', { employees });
});



app.listen(8080);
console.log('Server is listening on port 8080');