import express from "express"; //importo express
import movieController from "../controller/movieController.js"; //importo movieController

const router = express.Router();

router.get("/", movieController.index); //Impostiamo index
router.get("/:slug", movieController.show); //Impostiamo show, cambio l'id per lo slug



export default router;