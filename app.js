//Importo express
import express from "express";
import moviesRouter from "./routers/movies.js"; //Importo moviesRouter


//Invoco express
const app = express();

//Creo la porta 3000
const port = process.env.SERVER_PORT;

app.use("/api/movies", moviesRouter);

app.listen(port, (err) => {
    if (err) {
        return console.error(`Error durante l'avvio del server:`, err);
    } else {
        console.log(`Íl server è partito sulla porta ${port}`);
    }
});