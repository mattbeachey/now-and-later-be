module.exports = {
  mongoURI: process.env.MONGODB_URI || "mongodb://localhost/nowAndLaterDevDb",
  secretOrKey: process.env.SECRET || "secret"
};

console.log("################# >>>>>>>>>>", process.env.MONGODB_URI)
