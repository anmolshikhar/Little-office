import express from "express";
const headele = express.Router();

headele.get("/", (req,res)=>{
    res.json({
        name: "anmol",
        Id: "20132323"
    });
});
export default headele;;