const express = require("express");
const router = express.Router();

const {
    getLink,
    getLinks,
    createLink,
    deleteLink,
    

} = require("../controller/linkController");
const { auth } = require("../middlewares/auth");
 
router.use(auth);
router 
    .post('/', createLink)
    .get("/:id", getLink)
    .get("/",  getLinks)
    .delete('/:id', deleteLink)

module.exports = router;

// bcrypt.hash()
// bcrypt.compare()