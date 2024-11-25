import { Router } from "express";
import { findById, updateStatus } from "../controllers/user";
const router = Router()

router.route("/")
    .get(findById)
    .put(updateStatus)


export default router