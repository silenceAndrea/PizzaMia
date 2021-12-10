const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://IS2021:IS2021!@cluster0.i7flh.mongodb.net/testDB", {
    useNewUrlParser: true
});

const Department = mongoose.model("department", {
    id: Number,
    name: String
});

const Employee = mongoose.model("employee", {
    id: Number,
    name: String,
    department: String,
    email: String
});

const departmentExample = [
    { name: "IT" },
    { name: "Magazine" }
];

Department.insertManyDeparments(departmentExample)
    .then(() => {
        console.log("Departments Added");
        mongoose.connection.close();
    })
    .catch(err => console.error(err));