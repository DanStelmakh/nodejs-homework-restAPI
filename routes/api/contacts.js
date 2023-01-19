const express = require("express");
const contactOperations = require("../../models");
const createError = require("http-errors");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .required(),
  phone: Joi.number(),
});

const router = express.Router();
// GET /api/contacts/
router.get("/", async (req, res, next) => {
  try {
    const allContacts = await contactOperations.listContacts();
    if (!allContacts.length) {
      throw createError(404, `No contacts, please try later.`);
    }
    res.json({
      status: "Success",
      code: 200,
      result: allContacts,
    });
  } catch (error) {
    next(error);
  }
});
// GET /api/contacts/:contactId
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await contactOperations.getContactById(contactId);
    if (!contactById) {
      throw createError(404, `No contact with id:${contactId}`);
    }
    res.json({
      status: "Success",
      code: 200,
      result: contactById,
    });
  } catch (error) {
    next(error);
  }
});
// Post /api/contacts/
router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    const result = await contactOperations.addContact(req.body);
    if (error) {
      throw createError(
        400,
        `Name or e-mail entered incorrectly. Please try again`
      );
    }
    res.status(201).json({
      status: "Success",
      code: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});
// Delete /api/contacts/:contactId
router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
