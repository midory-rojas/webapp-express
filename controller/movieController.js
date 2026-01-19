import connection from "../database/dbConnection.js";


function index(req, res) {
    console.log("Ciao sono Index");

}

function show(req, res) {
    console.log("Ciao sono show");
}

export default { index, show }