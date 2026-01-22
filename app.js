import express from "express"; //Importo express
import moviesRouter from "./routers/movies.js"; //Importo moviesRouter
import handleError from "./middlewares/handleError.js"; //Importo handleError error-500
import notFound from "./middlewares/routeNotFound.js"; //Importo notFound error-400
import cors from "cors";


//Invoco express
const app = express();

//Creo la porta 3000
const port = process.env.SERVER_PORT;

//Questo percorso deve stare prima di static
app.use(
    cors({                                               
    origin: "http://localhost:5173",
}),
)
//Creo una cartella public per inserire le immagine e accedere facilmente dal browser
app.use(express.static("public"));

app.use("/api/movies", moviesRouter);

app.use(handleError); //Registro alla fine dell' app.js
app.use(notFound); // Registro notFound sotto handleError

app.listen(port, (err) => {
    if (err) {
        return console.error(`Error while starting the server`, err);
    } else {
        console.log(`Server is listening on port ${port}`);
    }
});