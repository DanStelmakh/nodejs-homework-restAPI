const express = require("express");
const contactOperations = require("../../models");
const createError = require("http-errors");

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
  res.json({ message: "template message" });
});
// Delete /api/contacts/:contactId
router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
