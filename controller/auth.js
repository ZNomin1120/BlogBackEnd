const MyError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwp = require("jsonwebtoken");

exports.register = asyncHandler(async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  const user = await req.db.User.create(req.body);
  const token = jwp.sign({ id: req.body.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });

  res.status(200).json({
    success: true,
    token: token,
    data: user,
  });
});
exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new MyError("Нэвтрэх нэр болон нууц үгээ оруулна уу?", 400);
  }

  let user = await req.db.User.findAll({ where: { username: username } });

  if (!user) {
    throw new MyError("Email болон нууц үгээ зөв оруулна уу?", 401);
  }
  user = user[0].dataValues;

  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    throw new MyError("Email болон нууц үгээ зөв оруулна уу?", 401);
  }

  const token = jwp.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });

  req.userId = user.id;

  res.status(200).json({
    sucess: true,
    token: token,
    message: user,
  });
});
