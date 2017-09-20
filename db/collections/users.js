import db from './../config.js';
import User from './../models/base-models/user.js';


exports.getExistUser = (userid) => {
  return db.user.findAll({
    where: {
      google_id: userid,
    }
  })
  .then(user => {
    return user[0].dataValues;
  })
  .catch((error) => {
    console.log('User does not exist', error);
    return null;
  });
}


exports.createNewUser = ({ name, avatar, email, google_id }) => {
  console.log('createNewUser', name)

  return db.user.create({
    username: name,
    email: email,
    avatar: avatar,
    accessToken: 'abc123',
    google_token:'abc12345',
    google_id: google_id,
  })
  .then(user => {
    console.log(user)
    return user.dataValues;
  })
  .catch((error) => {
    console.log('User signUp failed', error);
    return null;
  });
}
