const Instrument = require("../models/Instrument");
const Amplifier = require("../models/Amplifier");
const Other = require("../models/Other");

const createNewOffer = async (req) => {
  const offerType = setOfferType(req);
  let validate = validator(offerType, req);
  //if object body doesn't pass validation, don't send request
  if (!validate) return;

  let documentBody = createNewDocumentBody(req, offerType);

  let newDocument;
  switch (offerType) {
    case "amp":
      newDocument = new Amplifier(documentBody);
      break;
    case "instrument":
      newDocument = new Instrument(documentBody);
      break;
    case "other":
      newDocument = new Other(documentBody);
      break;
  }
  await newDocument.save();
};

function setOfferType(req) {
  if (req.body.otherForm) return "other";
  if (req.body.instrumentForm) return "instrument";
  if (req.body.ampForm) return "amp";
}

function validateName(str) {
  if (str.length < 5 && str.length > 0) {
    return false;
  } else if (str.length == 0) {
    return false;
  } else {
    return true;
  }
}

function validateDescription(str) {
  if (str.length < 8 && str.length > 0) {
    return false;
  } else {
    return true;
  }
}

function validatePrice(num) {
  num = Number(num);
  if (num < 0) {
    return false;
  } else {
    return true;
  }
}

function validateImageField(str) {
  if (str.length > 0) {
    if (str.startsWith("http")) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

function validateWattage(num) {
  num = Number(num);
  if (num < 0) {
    return false;
  } else {
    return true;
  }
}

function validator(offerType, req) {
  let isValid = true;

  if (offerType == "other") {
    //otherForm fields: productName, description, imageUrl, price
    if (
      !validateName(req.body.productName) ||
      !validateDescription(req.body.description) ||
      !validateImageField(req.body.imageUrl) ||
      !validatePrice(req.body.price)
    ) {
      isValid = false;
    }
  } else if (offerType == "instrument") {
    if (
      !validateName(req.body.productName) ||
      !validateDescription(req.body.description) ||
      !validateImageField(req.body.imageUrl) ||
      !validatePrice(req.body.price)
    ) {
      isValid = false;
    }
  } else if (offerType == "amp") {
    if (
      !validateName(req.body.productName) ||
      !validateImageField(req.body.imageUrl) ||
      !validatePrice(req.body.price) ||
      !validateWattage(req.body.wattage)
    ) {
      isValid = false;
    }
  }

  return isValid;
}

function createNewDocumentBody(req, offerType) {
  let documentBody = {};

  documentBody.ownerId = req.body.ownerId;
  documentBody.productName = req.body.productName;
  documentBody.price = req.body.price;
  documentBody.imageUrl = req.body.imageUrl;

  if (offerType == "other") {
    documentBody.description = req.body.description;
  } else if (offerType == "instrument") {
    documentBody.description = req.body.description;
    documentBody.condition = req.body.condition;
  } else if (offerType == "amp") {
    documentBody.wattage = req.body.wattage;
    documentBody.valves = req.body.valves;
    documentBody.condition = req.body.condition;
  }

  return documentBody;
}

module.exports = { createNewOffer };