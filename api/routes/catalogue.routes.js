import express from "express";
import catalogue from "../controllers/catalogue.controllers.js";


export default app => {
 
    var router = require("express").Router();
   
    router.get("/", catalogue.get);
    app.use('/api/catalogue', router);
};
