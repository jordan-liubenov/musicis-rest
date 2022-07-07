const User = require("../models/User");

const settings = require("../configurations/settings");

//auth-related imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = settings.saltRounds;

const validateEmail = (email) => {
  let isValid = false;
  if (email.length > 0) {
    //if length is above 0, check for other requirements
    if (email.includes("@") && email.includes(".")) {
      //if it includes both symols return true
      isValid = true;
    } else {
      isValid = false;
    }
  }
  return isValid;
};

const validateUsername = (username) => {
  let isValid = false;
  if (username.length < 6 && username.length > 0) {
    //if length is correct, return true
    isValid = true;
  } else {
    isValid = false;
  }
  return isValid;
};

const validatePassword = (password) => {
  let isValid = false;
  if (password.length < 8) {
    if (checkForNumber(password) && checkForUpper(password)) {
      //if it has atleast one Num, and one Uppercase char, return true
      isValid = true;
    } else {
      isValid = false;
    }
  } else {
    isValid = false;
  }
  return isValid;
};

const validate = (email, username, password) => {
  let isValid = false;
  if (
    validateEmail(email) &&
    validateUsername(username) &&
    validatePassword(password)
  ) {
    isValid = true;
  } else {
    isValid = false;
  }
  return isValid;
};

const register = async (req) => {
  const email = req.body.email;
  const username = req.body.user;
  const password = req.body.pass;
  const rePass = req.body.rePass;

  // const validationResult = validate(email, username, password);
  // if (!validationResult) {
  //   //TO-DO: Add error to be returned so it can be send to the front end and displayed to the user
  //   return;
  // }

  // if (password != rePass) {
  //   //TO-DO: Add error to be returned in case of non-matching passwords
  //   return;
  // }

  // //if everything is valid, continue register operation

  // const usernameQuery = {
  //   username: username,
  // };
  // const findUser = await User.findOne(usernameQuery); // check if there is an existing user
  // if (findUser != null) {
  //   //TO-DO: Add error to be returned in case of existing user
  //   return;
  // }

  // const emailQuery = {
  //   email: email,
  // };
  // const findByEmail = await User.findOne(emailQuery);
  // if (findByEmail != null) {
  //   //TO-DO: add error for existing user again
  //   return;
  // }

  //if there is no existing user, continue with the registration  process
  try {
    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hashedPassword = await bcrypt.hash(password, salt);

    const newUserEntry = new User({
      email: email,
      username: username,
      password: hashedPassword,
    });

    //await user.save(); - saves to MongoDB
    console.log(newUserEntry);
  } catch (error) {
    console.log(error);
  }
};

const login = async (req) => {
  const username = req.body.user;
  const password = req.body.pass;

  const usernameQuery = {
    username: username,
  };
  const findUsername = await User.findOne(usernameQuery);
  if (findUsername == null) {
    //TO-DO: if Null, no such user exists, thus return an error
    return;
  }

  //if user exists, continue and compare the passwords
  const passwordCheck = await bcrypt.compare(password, findUsername.password);
  if (!passwordCheck) {
    //TO-DO: add error for wrong password
    return;
  }

  //if password is correct, return new jwt token
  return new Promise((resolve, reject) => {
    jwt.sign(
      { _id: foundUser.id, username: foundUser.username },
      settings.secret,
      { expiresIn: "5d" },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
      }
    );
  });
};

function checkForNumber(string) {
  //check if password has atleast 1 number
  let hasNum = false;
  for (let i = 0; i < string.length; i++) {
    let current = string.charAt(i);
    if (Number(current)) {
      hasNum = true;
    }
  }
  return hasNum;
}

function checkForUpper(string) {
  //check if string has atleast 1 uppercase char
  let hasUpper = false;
  for (let i = 0; i < string.length; i++) {
    if (string.charAt(i) == string.charAt(i).toUpperCase()) {
      hasUpper = true;
    }
  }
  return hasUpper;
}

module.exports = register;