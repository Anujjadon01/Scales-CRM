import express from "express";
import multer from 'multer';
import path from 'path';

import { contact, fetchOpportunity, fetchtasksmanagement, opportunity, tasksmanagementAPI, updateOpportunityStage } from "../controllers/auth.controller.js";
import { ConFetchData } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/contact",contact)
router.get("/confetchData", ConFetchData)
router.post("/opportunity", opportunity)
router.get("/fetchopportunity", fetchOpportunity)
router.get("/fetchtasksmanagement", fetchtasksmanagement)
// router.put("/updateOpportunityStage", updateOpportunityStage)
router.patch("/opportunity/:id/stage", updateOpportunityStage);
// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Route Definition
router.post("/tasksmanagementAPI", upload.single('ownerPhoto'), tasksmanagementAPI);



export default router