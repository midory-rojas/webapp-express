import express from "express"; //importo express
import movieController from "../controller/movieController.js"; //importo movieController

const router = express.Router();

router.get("/", movieController.index); //Impostiamo index
router.get("/:id", movieController.show); //Impostiamo show



export default router;