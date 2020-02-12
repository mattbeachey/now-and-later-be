module.exports = {
  mongoURI: process.env.MONGODB_URI || "mongodb://localhost/nowAndLaterDevDb",
  secretOrKey: process.env.SECRET 
};

console.log("################# >>>>>>>>>>", process.env.MONGODB_URI)
