const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const { validation, isValidId } = require("../../midlewares");
const { schemas } = require("../../models");
const router = express.Router();

// GET /api/contacts/
router.get("/", ctrl.getAll);

// GET /api/contacts/:contactId
router.get("/:contactId", isValidId, ctrl.getById);

// POST /api/contacts/
router.post("/", validation(schemas.addContactSchema), ctrl.add);

// DELETE /api/contacts/:contactId
router.delete("/:contactId", ctrl.remove);

// UPDATE All /api/contacts/:contactId
router.put("/:contactId", validation(schemas.addContactSchema), ctrl.update);

// UPDATE a part of the object /api/contacts/:contactId/favorite
router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(schemas.updateFavoriteFieldSchema),
  ctrl.updateFavorite
);

module.exports = router;
