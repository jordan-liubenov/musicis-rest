const Amplifier = require("../models/Amplifier");
const Instrument = require("../models/Instrument");
const Other = require("../models/Other");

const addRating = async (req) => {
  const entryId = req.body._id;

  const ratingType = req.body.ratingType;

  const currentUserId = req.body.currentUserId;

  const idQuery = {
    _id: entryId,
  };

  //collections have "likes" and "dislikes" as a property
  const findInstrument = await Instrument.findById(idQuery).lean();
  const findAmplifier = await Amplifier.findById(idQuery).lean();
  const findOther = await Other.findById(idQuery).lean();

  let currentRatings; //counter for the current likes or dislikes, depending on the type of rating being done in the request
  let currentRatedBy; //array of user IDs that have rated the current post
  if (findInstrument != null) {
    currentRatedBy = findInstrument.ratedBy;
    if (ratingType == "like") {
      currentRatedBy.push(currentUserId);

      currentRatings = findInstrument.likes;
      currentRatings++;

      findInstrument.likes = currentRatings;

      await Instrument.findByIdAndUpdate(idQuery, { likes: currentRatings });
      await Instrument.findByIdAndUpdate(idQuery, { ratedBy: currentRatedBy });
    } else if (ratingType == "dislike") {
      currentRatedBy.push(currentUserId);

      currentRatings = findInstrument.dislikes;
      currentRatings++;

      findInstrument.dislikes = currentRatings;

      await Instrument.findByIdAndUpdate(idQuery, { dislikes: currentRatings });
      await Instrument.findByIdAndUpdate(idQuery, { ratedBy: currentRatedBy });
    }
  } else if (findAmplifier != null) {
    currentRatedBy = findAmplifier.ratedBy;
    if (ratingType == "like") {
      currentRatedBy.push(currentUserId);

      currentRatings = findAmplifier.likes;
      currentRatings++;

      findAmplifier.likes = currentRatings;

      await Amplifier.findByIdAndUpdate(idQuery, { likes: currentRatings });
      await Amplifier.findByIdAndUpdate(idQuery, { ratedBy: currentRatedBy });
    } else if (ratingType == "dislike") {
      currentRatedBy.push(currentUserId);

      currentRatings = findAmplifier.dislikes;
      currentRatings++;

      findAmplifier.dislikes = currentRatings;

      await Amplifier.findByIdAndUpdate(idQuery, { dislikes: currentRatings });
      await Amplifier.findByIdAndUpdate(idQuery, { ratedBy: currentRatedBy });
    }
  } else if (findOther != null) {
    currentRatedBy = findOther.ratedBy;
    if (ratingType == "like") {
      currentRatedBy.push(currentUserId);

      currentRatings = findOther.likes;
      currentRatings++;

      findOther.likes = currentRatings;

      await Other.findByIdAndUpdate(idQuery, { likes: currentRatings });
      await Other.findByIdAndUpdate(idQuery, { ratedBy: currentRatedBy });
    } else if (ratingType == "dislike") {
      currentRatedBy.push(currentUserId);

      currentRatings = findOther.dislikes;
      currentRatings++;

      findOther.dislikes = currentRatings;

      await Other.findByIdAndUpdate(idQuery, { dislikes: currentRatings });
      await Other.findByIdAndUpdate(idQuery, { ratedBy: currentRatedBy });
    }
  }
};

module.exports = {
  addRating,
};
