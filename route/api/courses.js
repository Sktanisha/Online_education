const express = require("express");
const { addCoursesController, 
        deleteCourseController, 
        getAllCoursesController, 
    } = require("../../controller/courses.controller");
const router = express.Router();
const upload = require("../../utils/upload");
const { authorize } = require("../../middleware/authorize");
const { authorizeRole } = require("../../middleware/authorizeRole");
router.post(
            "/add-courses", 
            authorize, 
            authorizeRole("admin"),
            upload.single("course-image"), 
            addCoursesController
        );

router.delete(
            "/delete-course/:id",
            authorize, 
            authorizeRole("admin"),
            deleteCourseController
 );

router.get("/courses", getAllCoursesController);

module.exports = router;