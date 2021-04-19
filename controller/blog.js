const MyError = require("../utils/myError");
const path = require("path");
const asyncHandler = require("../middleware/asyncHandler");

exports.getAllBlogs = asyncHandler(async (req, res, next) => {
  const blogs = await req.db.Blog.findAll();

  res.status(200).json({
    success: true,
    count: blogs.length,
    data: blogs,
  });
});

exports.getBlog = asyncHandler(async (req, res, next) => {
  const blog = await req.db.Blog.findByPk(req.params.id);

  if (!blog) {
    throw new MyError(`${req.params.id}-тай блог олдсонгүй`);
  }

  res.status(200).json({
    success: true,
    data: blog,
  });
});

exports.createBlog = asyncHandler(async (req, res, next) => {
  req.body.author = req.userId;
  const blogs = await req.db.Blog.create(req.body);

  res.status(200).json({
    success: true,
    data: blogs,
  });
});

exports.updateBlog = asyncHandler(async (req, res, next) => {
  let blog = await req.db.Blog.findByPk(req.params.id);

  if (!blog) {
    throw new MyError(`${req.params.id}-тай блог олдсонгүй`);
  }
  blog = await blog.update(req.body);

  res.status(200).json({
    success: true,
    data: blog,
  });
});

exports.deleteBlog = asyncHandler(async (req, res, next) => {
  let blog = await req.db.Blog.findByPk(req.params.id);

  if (!blog) {
    throw new MyError(`${req.params.id} ID-тай блог олдсонгүй`);
  }
  blog = await blog.destroy(req.body);

  res.status(200).json({
    success: true,
    message: "Устгагдлаа",
    data: blog,
  });
});

exports.sendImage = asyncHandler(async (req, res, next) => {
  const name = req.params.name;
  res.status(200).sendFile(path.join(__dirname, `../public/blog/${name}`));
});

exports.uploadPhoto = asyncHandler(async (req, res, next) => {
  let blog = await req.db.Blog.findByPk(req.params.id);

  if (!blog) {
    throw new MyError(`${req.params.id} ID-тай блог олдсонгүй`);
  }
  

  const photo = req.files.photo;

  if (!photo.mimetype.startsWith("image")) {
    throw new MyError("Та заавал зураг оруулна уу!", 400);
  }
  if (photo.size > process.env.MAX_UPLOAD_FILE_SIZE) {
    throw new MyError("Та заавал зураг оруулна уу!", 400);
  }

  photo.name = `blog_${req.params.id}${path.parse(photo.name).ext}`;

  photo.mv(`${process.env.PHOTO_UPLAOD_PATH}/${photo.name}`, (err) => {
    if (err) {
      throw new MyError("File хуулах явцад алдаа гарлаа" + err, 400);
    }
  });

  req.body.photo = photo.name;
  blog = await blog.update(req.body);

  res.redirect("http://localhost:3000/admin.html")
});
