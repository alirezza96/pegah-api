import { Router } from "express";
import { findById } from "../controllers/user";
const router = Router()

router.route("/")
    .get(findById)


export default router