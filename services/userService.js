const User = require("../models/User");

const settings = require("../configurations/settings");

//auth-related imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = settings.saltRounds;

const validateEmail = (email) => {
  let isValid = false;

  let reg = /^[A-Za-z\d]+[@][A-Za-z]+\.[a-z]+$/g;
  if (email.length > 0) {
    if (reg.test(email)) {
      isValid = true;
    } else {
      isValid = false;
    }
  } else {
    isValid = true;
  }

  return isValid;
};

const validateUsername = (username) => {
  let isValid = false;
  if (username.length >= 6) {
    //if length is correct, return true
    isValid = true;
  } else {
    isValid = false;
  }
  return isValid;
};

const validatePassword = (password) => {
  let isValid = false;
  if (password.length >= 8) {
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

  const validationResult = validate(email, username, password);
  if (!validationResult) {
    //TO-DO: Add error to be returned so it can be send to the front end and displayed to the user
    console.log("one of the fields was not validated");
    return;
  }

  if (password != rePass) {
    //TO-DO: Add error to be returned in case of non-matching passwords
    console.log("passwords dont match");
    return;
  }

  // //if everything is valid, continue register operation

  const usernameQuery = {
    username: username,
  };
  const findUser = await User.findOne(usernameQuery); // check if there is an existing user
  if (findUser != null) {
    //TO-DO: Add error to be returned in case of existing user
    console.log("user with username already exists");
    return;
  }

  const emailQuery = {
    email: email,
  };
  const findByEmail = await User.findOne(emailQuery);
  if (findByEmail != null) {
    //TO-DO: add error for existing user again
    console.log("user with this email already exists");
    return;
  }

  //if there is no existing user, continue with the registration  process
  try {
    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hashedPassword = await bcrypt.hash(password, salt);

    const newUserEntry = new User({
      email: email,
      username: username,
      password: hashedPassword,
    });

    await newUserEntry.save(); //saves to MongoDB
    console.log(newUserEntry);
  } catch (error) {
    console.log(error);
  }
};

const login = async (req) => {
  const username = req.body.user;
  const password = req.body.pass;

  if (username.length == 0 || password.length == 0) return;

  const usernameQuery = {
    username: username,
  };
  const findUsername = await User.findOne(usernameQuery);
  if (findUsername == null) {
    let errorObj = { usernameErr: true };
    return errorObj;
  }

  //if user exists, continue and compare the passwords
  const passwordCheck = await bcrypt.compare(password, findUsername.password);
  if (!passwordCheck) {
    //TO-DO: add error for wrong password
    let errorObj = { passwordErr: true };
    return errorObj;
  }

  //if password is correct, return new jwt token
  return new Promise((resolve, reject) => {
    jwt.sign(
      { _id: findUsername.id, username: findUsername.username },
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

module.exports = { register, login };
