import { Router } from "express";
import { userController, registerController } from "~/controllers/user.controllers";

const router = Router();

router.post("/login", userController);
router.post("/register", registerController);

export default router;
