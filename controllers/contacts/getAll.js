const { Contact } = require("../../models");
const createError = require("http-errors");

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const allContacts = await Contact.find(
      { owner: _id },
      "-createdAt -updatedAt"
    ).populate("owner", "_id email subscription");
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
};

module.exports = getAll;
