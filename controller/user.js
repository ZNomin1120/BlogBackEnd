const MyError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await req.db.User.findAll();

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await req.db.User.findByPk(req.params.id);

  if (!user) {
    throw new MyError(`${req.params.id}-тай хэрэглэгч олдсонгүй`);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  let user = await req.db.User.findByPk(req.params.id);

  if (!user) {
    throw new MyError(`${req.params.id}-тай хэрэглэгч олдсонгүй`);
  }
  user = await user.update(req.body);

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  let user = await req.db.User.findByPk(req.params.id);

  if (!user) {
    throw new MyError(`${req.params.id}-тай хэрэглэгч олдсонгүй`);
  }
  user = await user.destroy(req.body);

  res.status(200).json({
    success: true,
    message: "Устгагдлаа",
    data: user,
  });
});
