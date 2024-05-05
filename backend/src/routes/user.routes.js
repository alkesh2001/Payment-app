import {Router} from "express"
import { getAllUser, getCurrentUser, loginUser, logoutUser, registerUser } from "../controller/user.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";
import { accountFetch } from "../controller/account.controller.js";

const router = Router()

router.route('/register').post(registerUser);

router.route('/login').post( loginUser)

// secure routes
router.route('/logout').post(verifyJWT , logoutUser)
router.route('/current-User').get( getCurrentUser)
router.route('/getAllUser').get(verifyJWT , getAllUser)


// router.route("/balance").get(verifyJWT, accountFetch)

export default router