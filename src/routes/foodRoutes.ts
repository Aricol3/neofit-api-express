import {Router} from "express";
import {
    createFood,
    getFoodByBarcode,
    getDietOverviewForDay, searchFoods
} from "../controllers/foodController";
import {verifyToken} from "../middleware/verifyToken.ts";

const router = Router();

router.post("/", verifyToken(false), createFood);
router.get("/", getFoodByBarcode);
router.get("/search", searchFoods);
router.post("/overview", getDietOverviewForDay);

export default router;
