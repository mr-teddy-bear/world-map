import { Router } from "express";
import { getCountriesController } from "./controller";

const router = Router();

router.get("/", getCountriesController);

export default router;
