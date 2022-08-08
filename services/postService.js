const Instrument = require("../models/Instrument");
const Amplifier = require("../models/Amplifier");
const Other = require("../models/Other");

//-----Create and Delete functions----
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

  /*
    How to flag a request as an Edit request:
    Add a boolean flag to the request body such as "editRequest.true"
    if that property exists in the req.body, take the current Item's _id and find it in the DB
    then find it and update it
  */

  let currentOffer;
  if (req.body.edit) {
    //if the sent request is an Edit request, find the already existing entry and update it's body
    currentOffer = req.body.currentOffer;
    let currentOfferIdQuery = {
      _id: currentOffer._id,
    };

    const findOther = await Other.findOne(currentOfferIdQuery);
    const findInstrument = await Instrument.findOne(currentOfferIdQuery);
    const findAmp = await Amplifier.findOne(currentOfferIdQuery);

    if (findOther != null) {
      delete req.body.currentOffer;
      await Other.findByIdAndUpdate(currentOfferIdQuery, req.body);
    } else if (findInstrument != null) {
      delete req.body.currentOffer;
      await Instrument.findByIdAndUpdate(currentOfferIdQuery, req.body);
    } else if (findAmp != null) {
      delete req.body.currentOffer;
      await Amplifier.findByIdAndUpdate(currentOfferIdQuery, req.body);
    }
  } else {
    await newDocument.save();
  }
};

//---Delete request----
const deleteEntry = async (req) => {
  const currentEntry = req.body;
  const idQuery = {
    _id: currentEntry._id,
  };

  switch (currentEntry.type) {
    case "Instrument":
      await Instrument.findOneAndDelete(idQuery);
      break;
    case "Amplifier":
      await Amplifier.findOneAndDelete(idQuery);
      break;
    case "Other":
      await Other.findOneAndDelete(idQuery);
      break;
  }
};

//--------Fetch functions---------
const fetchAllBySpecificUser = async (id) => {
  /*
  Use user Id as search query through each of the collections
  Amps, Instruments, Other
  after each document search
  check if anything was found, if yes - save documents in array and prepare them to send as request response
*/

  const resultArray = [];
  const ownerIdQuery = {
    ownerId: id,
  };

  let findOther = await Other.find(ownerIdQuery).lean();
  let findInstrument = await Instrument.find(ownerIdQuery).lean();
  let findAmp = await Amplifier.find(ownerIdQuery).lean();

  if (findOther != null) resultArray.push(findOther);
  if (findInstrument != null) resultArray.push(findInstrument);
  if (findAmp != null) resultArray.push(findAmp);

  return resultArray;
};

const fetchAllEntries = async () => {
  //search through all entries in each collection and save them in array, which will then be sent to the client
  const resultArray = [];

  const findOther = await Other.find().lean();
  const findInstrument = await Instrument.find().lean();
  const findAmp = await Amplifier.find().lean();

  //returns null only when findOne() is used, FIXME change if-else check to check if it returns an empty array (only returned from find())
  if (findOther != null) resultArray.push(findOther);
  if (findInstrument != null) resultArray.push(findInstrument);
  if (findAmp != null) resultArray.push(findAmp);

  return resultArray;
};

const fetchEntryById = async (id) => {
  const idQuery = { _id: id };

  const findOther = await Other.findOne(idQuery).lean();
  const findInstrument = await Instrument.findOne(idQuery).lean();
  const findAmp = await Amplifier.findOne(idQuery).lean();

  if (findOther != null) return findOther;
  if (findInstrument != null) return findInstrument;
  if (findAmp != null) return findAmp;
};

//-----utility functions-----
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

  documentBody.likes = 0;
  documentBody.dislikes = 0;
  documentBody.comments = [];

  if (offerType == "other") {
    documentBody.description = req.body.description;
    documentBody.type = "Other";
  } else if (offerType == "instrument") {
    documentBody.description = req.body.description;
    documentBody.condition = req.body.condition;
    documentBody.type = "Instrument";
  } else if (offerType == "amp") {
    documentBody.wattage = req.body.wattage;
    documentBody.valves = req.body.valves;
    documentBody.condition = req.body.condition;
    documentBody.type = "Amplifier";
  }

  return documentBody;
}

module.exports = {
  createNewOffer,
  deleteEntry,
  fetchAllBySpecificUser,
  fetchAllEntries,
  fetchEntryById,
};
