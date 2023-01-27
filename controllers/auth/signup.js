const { User } = require("../../models");
const createError = require("http-errors");

const signUp = async (req, res, next) => {
  try {
    const { email, subscription, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw createError(409, `User with email:${email} already registered`);
    }
    const result = await User.create({ subscription, email, password });
    res.status(201).json({
      status: "Created",
      code: 201,
      ResponseBody: {
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signUp;
