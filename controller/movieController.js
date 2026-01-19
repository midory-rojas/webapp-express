import connection from "../database/dbConnection.js"; //Importo connection della cartella dbConnection


function index(req, res, next) {
    const query = "SELECT * FROM `movies`";

    connection.query(query, (err, result) => {
        if (err) return next(err);
        return res.json({
            results: result,
        });
    });

}

function show(req, res) {
    console.log("Ciao sono show");
}

export default { index, show }