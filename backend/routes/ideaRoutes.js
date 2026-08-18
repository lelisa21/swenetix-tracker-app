import express from "express";
import Idea from "../models/Idea.js";
const router  = express.Router();

// @route   GET /api/ideas
router.get("/" ,async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json(ideas)
  } catch (error) {
     res.status(500).json({error:error.message})
  }
});

// @route   POST /api/ideas
router.post("/",  async (req, res) => {
  try {
    const newIdea = new Idea(req.body);
    await newIdea.save()
    res.status(201).json(newIdea)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
});

export default router;
