const path = require('path');
const fs = require('fs/promises');
const jimp = require('jimp');
const { User } = require('../../models/user');

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars');
const updateAvatar = async (req, res, next) => {
  const { path: tempDir, originalname } = req.file;
  const { _id } = req.user;
  const [extention] = originalname.split('.').reverse();
  const newNameAvatar = `${_id}.${extention}`;
  const resultDir = path.join(avatarDir, newNameAvatar);
  await fs.rename(tempDir, resultDir);

  const file = await jimp.read(resultDir);
  const fileResize = await file.resize(250, 250);
  await fileResize.write(resultDir);

  const avatarURL = path.join('avatars', newNameAvatar);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = updateAvatar;
