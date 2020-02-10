module.exports = {
  mongoURI: process.env.MONGODB_URI || "mongodb://localhost/nowAndLaterDevDb",
  secretOrKey: "secret"
};

console.log("################# >>>>>>>>>>", process.env.MONGODB_URI)
