import { Router } from "express";
import {create} from "../controllers/register"
const router: Router = Router()

router.route("/")
    .post(create)


export default router