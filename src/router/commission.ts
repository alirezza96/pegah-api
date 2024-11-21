import { Router } from "express";
import { index } from "../controllers/commission";

const router = Router()
router.route("/")
    .get(index)


export default router