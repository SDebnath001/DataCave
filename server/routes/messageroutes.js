import express from "express";
import { createMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

// POST message
router.post("/", createMessage);

// GET messages
router.get("/", getMessages);

export default router;