const express = require("express");
const { addCategoryController, 
        deleteCategoryController, 
        getAllCategoryController, 
    } = require("../../controller/categories.controller");
const router = express.Router();
const upload = require("../../utils/upload");
const { authorize } = require("../../middleware/authorize");
const { authorizeRole } = require("../../middleware/authorizeRole");
router.post(
            "/add-category", 
            authorize, 
            authorizeRole("admin"),
            upload.single("category-image"), 
            addCategoryController
        );

router.delete(
            "/delete-category/:id",
            authorize, 
            authorizeRole("admin"),
            deleteCategoryController
 );

router.get("/categories", getAllCategoryController);

module.exports = router;