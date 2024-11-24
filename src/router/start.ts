import { Router } from "express";
import startController from "../controllers/start";
const router = Router()

router.route("/")
    .get(startController)


export default router