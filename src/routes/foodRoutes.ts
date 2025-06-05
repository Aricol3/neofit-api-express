import { Router } from "express";
import {
    createFood,
    getFoodByBarcode,
    getDietOverviewForDay
} from "../controllers/foodController";

const router = Router();

router.post("/", createFood);
router.get("/", getFoodByBarcode);
router.post("/overview", getDietOverviewForDay);

export default router;
