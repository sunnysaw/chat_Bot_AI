import express from "express";
import userQuery from "../services/agents.js";

const router = express.Router();

router.get("/agent", userQuery);

export default router;
