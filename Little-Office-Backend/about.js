import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    title: "About Us",
    content: "This is backend data"
  });
});
 export default router;