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

  //FIXME reformat this atrocity

  let currentRatings;
  let currentRatedBy;
  if (findInstrument != null) {
    if (ratingType == "like") {
      currentRatedBy = findInstrument.ratedBy;
      currentRatedBy.push(currentUserId);
      currentRatings = findInstrument.likes;
      currentRatings++;
      findInstrument.likes = currentRatings;
      await Instrument.findByIdAndUpdate(idQuery, { likes: currentRatings });
      await Instrument.findByIdAndUpdate(idQuery, { ratedBy: currentRatedBy });
    } else if (ratingType == "dislike") {
      currentRatings = findInstrument.dislikes;
      currentRatings++;
      findInstrument.dislikes = currentRatings;
      await Instrument.findByIdAndUpdate(idQuery, { dislikes: currentRatings });
      await Instrument.findByIdAndUpdate(idQuery, { ratedBy: currentRatedBy });
    }
  } else if (findAmplifier != null) {
    if (ratingType == "like") {
      currentRatedBy = findAmplifier.ratedBy;
      currentRatedBy.push(currentUserId);
      currentRatings = findAmplifier.likes;
      currentRatings++;
      findAmplifier.likes = currentRatings;
      await Amplifier.findByIdAndUpdate(idQuery, { likes: currentRatings });
      await Amplifier.findByIdAndUpdate(idQuery, { ratedBy: currentRatedBy });
    } else if (ratingType == "dislike") {
      currentRatings = findAmplifier.dislikes;
      currentRatings++;
      findAmplifier.dislikes = currentRatings;
      await Amplifier.findByIdAndUpdate(idQuery, { dislikes: currentRatings });
      await Amplifier.findByIdAndUpdate(idQuery, { ratedBy: currentRatedBy });
    }
  } else if (findOther != null) {
    if (ratingType == "like") {
      currentRatedBy = findOther.ratedBy;
      currentRatedBy.push(currentUserId);
      currentRatings = findOther.likes;
      currentRatings++;
      findOther.likes = currentRatings;
      await Other.findByIdAndUpdate(idQuery, { likes: currentRatings });
      await Other.findByIdAndUpdate(idQuery, { ratedBy: currentRatedBy });
    } else if (ratingType == "dislike") {
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
