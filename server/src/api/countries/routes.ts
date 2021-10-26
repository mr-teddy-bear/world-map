import { Router } from "express";
import {
  addCountriesController,
  changeCountriesController,
  deleteCountriesController,
  getCountriesController,
} from "./controller";

const router = Router();

router.get("/", getCountriesController);
router.post("/", addCountriesController);
router.put("/", changeCountriesController);
router.delete("/", deleteCountriesController);

export default router;
