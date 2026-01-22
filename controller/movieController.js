import connection from "../database/dbConnection.js"; //Importo connection della cartella dbConnection


function index(req, res, next) {
    const query = "SELECT * FROM `movies`";

    connection.query(query, (err, result) => {
        if (err) return next(err);

        const movies = result.map(movie => {
            return {
                ...movie,
                image: movie.image === null ? 'http://localhost:3000/imgs/cat.webp' : 'http://localhost:3000' + movie.image
            }
        })

        return res.json({
            results: movies,
        });
    });

}

//Per la show sempre si utiliza lo slug
function show(req, res, next) {
    // const id = req.params.id. Cambio l'id per lo slug
    const slug = req.params.slug;

    //Cambiamo movies.slug per la richiesta   
    const query = "SELECT * FROM `movies` WHERE movies.slug = ?"; //Inseriamo a ID perche la show restituisce il detaglio di una movie con l'ID
    //La richiesta proviene dello slug
    connection.query(query, [slug], (err, results) => {
        if (err) return next(err); //Si c'è il errore lo mandiamo avanti con NEXT

        if (results.length === 0) {
            res.status(404);
            return res.json({
                error: "NOT FOUND",
                message: "Movie not found"
            });
        }

        const movie = results[0];


        //Se la movie è stata trovata, recuperiamo le recensioni

        const reviewsQuery = "SELECT * FROM `reviews` WHERE `movie_id` = ?";

        //Una volta trovata la movie prendo l'id di questa movie trovata, per quello il cambio di [movie.id]
        connection.query(reviewsQuery, [movie.id], (err, reviewsResult) => {
            if (err) return next(err);//Si c'è errore ritorniamo con NEXT

            res.json({ //Creiamo un nuovo oggetto, dove passiamo tutti i dati di movie con lo spread operator(...)
                ...movie,
                reviews: reviewsResult, //Inseriamo il risulato di reviewsResult
                image: movie.image !== null ? `http://localhost:3000${movie.image}` : `http://localhost:3000/imgs/cat.webp`//Risposta per vedere le imagine singola
            })
        })
    })
}

//Funzione per creazione di una nuova review. Possiamo usare slug oppure Id perche non è la visualizzazione, ma l'operazione
//di salvataggio
function storeReviews(req, res, next) {
    const data = req.body; //Prendo i dati dal body
    /* console.log(data); Controlo con console.log(data) per veddere si mi prendi quello che aggiungo */

    const movieId = req.params.id;

    /* Faccio la query per aggiungere la recensione */
    const sql = "INSERT INTO `reviews` (movie_id, name, vote, text) VALUES (?, ?, ?, ?);";
    connection.query(sql, [movieId, data.name, data.vote, data.text],
        (err, result) => {
            if (err) return next(err)

            console.log(result)

            res.status(201) // Faccio la risposta json con il messagio che la review è stata agiunta (status 201)
            res.json({
                message: "La review è stata aggiunta",
                id: result.insertId, //Con questo si crea un nuevo id 
            })
        }
    )
}

export default { index, show, storeReviews }