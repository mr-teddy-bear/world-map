import { Router } from "express";
import countryRouter from "./api/countries";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "API",
    data: {
      version: "16.1",
    },
  });
});

router.use("/countries", countryRouter);

export default router;
