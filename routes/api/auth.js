const express = require("express");
const router = express.Router();

const { validation } = require("../../midlewares");
const { userSchemas } = require("../../models");

const { auth: ctrl } = require("../../controllers");

router.post("/signup", validation(userSchemas.joiRegisterSchema), ctrl.signUp);

module.exports = router;
