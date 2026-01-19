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
        return console.error(`Error while starting the server`, err);
    } else {
        console.log(`Server is listening on port ${port}`);
    }
});