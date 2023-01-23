const express = require("express");
const router = express.Router();

const {
    getUser,
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    login

} = require("../controller/userController");
const { auth } = require("../middlewares/auth");
 
router 
    .get("/:id", getUser)
    .get("/", getUsers)
    .post('/signup',  createUser)
    .post('/login', login)
    .delete('/:id', auth, deleteUser)
    .put('/:id', auth, updateUser)

module.exports = router;