import { Router } from "express";
import {
    createFood,
    getFoodByBarcode,
    getDietOverviewForDay, searchFoods
} from "../controllers/foodController";

const router = Router();

router.post("/", createFood);
router.get("/", getFoodByBarcode);
router.get("/search", searchFoods);
router.post("/overview", getDietOverviewForDay);

export default router;
