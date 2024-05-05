import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { accountFetch, transfar } from "../controller/account.controller.js";

const router = Router()

router.route('/balance').get(verifyJWT , accountFetch)
router.route('/transfar').post(verifyJWT , transfar)

export default router