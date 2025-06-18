import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ pesan: "Ini router test" });
});

export default router;
