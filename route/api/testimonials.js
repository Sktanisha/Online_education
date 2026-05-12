const express = require("express");
const { addTestimonialsController, 
        deleteTestimonialsController, 
        getAllTestimonialsController, 
    } = require("../../controller/testimonials.controller");
const router = express.Router();
const upload = require("../../utils/upload");
const { authorize } = require("../../middleware/authorize");
const { authorizeRole } = require("../../middleware/authorizeRole");
router.post(
            "/add-testimonial", 
            authorize, 
            authorizeRole("admin"),
            upload.single("profile-image"), 
            addTestimonialsController
        );

router.delete(
            "/delete-tetimonial/:id",
            authorize, 
            authorizeRole("admin"),
            deleteTestimonialsController
 );

router.get("/testimonials", getAllTestimonialsController);

module.exports = router;