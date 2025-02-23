const { Contact } = require("../../models/");
const createError = require("http-errors");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await Contact.findById(
      contactId,
      "-createdAt -updatedAt"
    );
    if (!contactById) {
      throw createError(404, `Not found id:${contactId}`);
    }
    res.json({
      status: "Success",
      code: 200,
      result: contactById,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
