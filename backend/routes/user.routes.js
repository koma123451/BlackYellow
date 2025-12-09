import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";
import { getAllUsers, deleteUser, makeAdmin } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protect, adminOnly, getAllUsers);
router.delete("/:id", protect, adminOnly, deleteUser);
router.patch("/admin/:id", protect, adminOnly, makeAdmin);

export default router;
