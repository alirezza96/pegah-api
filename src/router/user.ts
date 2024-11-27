import { Router } from "express";
import {  getUser, updateStatus } from "../controllers/user";
const router = Router()

router.route("/")
    .get(getUser)
    .put(updateStatus)


export default router