import { Router } from "express";
import * as URLController from "../controllers/url.controller";

const router: Router = Router();

router.get("/:url", URLController.getOriginalURL);
router.post("/", URLController.shortenURL);

export default router;
