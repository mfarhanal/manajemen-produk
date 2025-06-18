import express from "express";
import { getTest } from "../controllers/testController.js";

const router = express.Router();

// router.get("/", (req, res) => {
//   res.json({ pesan: "Ini router test" });
// });

router.get("/", getTest);

export default router;
