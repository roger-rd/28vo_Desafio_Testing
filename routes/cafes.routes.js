import { Router } from "express";
import {cafesController} from "../controller/cafes.controllers.js";

const router = Router();

//////GET//////
router.get("/",cafesController.getRaiz);
router.get("/cafes", cafesController.getAllCafes);
router.get("/cafes/:id",cafesController.getCafesId);
//////POST//////
router.post("/cafes", cafesController.addCafes);
//////PUT//////
router.put("/cafes/:id", cafesController.updateCafes);
//////DELETE//////
router.delete("/cafes/:id", cafesController.deletecafes);
//////*//////
router.use("*", cafesController.use404);

export default router;