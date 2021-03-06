const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const User = require("../models/user");
const postScore = async (req, res) => {
  const { quizId, score, remarks } = req.body;
  const { _id } = req.user;

  if (quizId < 1 || quizId > 4) {
    throw new BadRequestError("Quiz Id parameter is wrong");
  }
  const quizProperty = "quizCat" + quizId.toString();
  //   [] stands for dynamic property name
  await User.findByIdAndUpdate(_id, {
    $push: { [quizProperty]: { score, remarks } },
  });
  res
    .status(StatusCodes.OK)
    .json({ status: "success", data: { score, remarks } });
};

const getScore = async (req, res) => {
  const { quizId } = req.query;
  const { _id } = req.user;

  if (quizId < 1 || quizId > 4) {
    throw new BadRequestError("Quiz Id parameter is wrong");
  }

  const quizProperty = "quizCat" + quizId.toString();
  const user = await User.findOne({ _id });
  return res
    .status(StatusCodes.OK)
    .json({ status: "success", data: { scoreArr: user[quizProperty] } });
};
module.exports = { postScore, getScore };
