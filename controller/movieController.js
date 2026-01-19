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

function show(req, res, next) {
    const id = req.params.id;

    const query = "SELECT * FROM `movies` WHERE `id` = ?"; //Inseriamo a ID perche la show restituisce il detaglio di una movie con l'ID

    connection.query(query, [id], (err, results) => {
        if (err) return next(err); //Si c'è il errore lo mandiamo avanti con NEXT

        if (results.length === 0) { 
            res.status(404);
            return res.json({
                error: "NOT FOUND",
                message: "Movie not found"
            });
        }

        const movie = results[0];
        res.json(movie) //Si va tutto bene inviamo il resultato
    })
}

export default { index, show }