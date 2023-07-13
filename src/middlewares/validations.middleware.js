exports.validuser = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      message: 'the name isd require',
    });
  }
  console.log(name);
  next();
};
