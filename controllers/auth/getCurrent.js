const getCurrent = async (req, res) => {
  const { email, name } = req.user;
  req.json({
    email,
    name,
  });
};

module.exports = getCurrent;
