import express from "express"; //importo express
import movieController from "../controller/movieController.js"; //importo movieController

const router = express.Router();

router.get("/", movieController.index); //Impostiamo index
router.get("/:slug", movieController.show); //Impostiamo show, cambio l'id per lo slug (sempre nella show deve stare lo slug)

//Funzione per creazione di una nuova review. Possiamo usare slug oppure Id perche non è la visualizzazione, 
// ma l'operazione di salvataggio

router.post("/:id/reviews", movieController.storeReviews) //Impostiamo la rotta per la creazione delle recensione in store



export default router;