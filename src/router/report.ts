import { Router } from "express";
import { findByName } from "../controllers/report";
const router: Router = Router()

router.route("/:reportName")
    .get(findByName)


export default router
