module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgres://cdfnarvkmkdnuo:077e5ac78ac01c40661fdfa5bbc0c4b2b0d7f77fef0efaebcba50e1b849f9681@ec2-52-44-55-63.compute-1.amazonaws.com:5432/d46cu66e7sau04",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "3h",
  JWT_SECRET: process.env.JWT_SECRET || "change-secret",
  REQUEST_ORIGIN:
    process.env.NODE_ENV === "production"
      ? "https://trello-clone-mu.vercel.app"
      : "http://localhost:3000",
};

// module.exports = {
//   PORT: process.env.PORT || 8000,
//   NODE_ENV: process.env.NODE_ENV || "development",
//   DATABASE_URL:
//     process.env.DATABASE_URL ||
//     "postgresql://ryannicoletti@localhost/trello",
//   JWT_EXPIRY: process.env.JWT_EXPIRY || "3h",
//   JWT_SECRET: process.env.JWT_SECRET || "change-secret",
//   REQUEST_ORIGIN:
//     process.env.NODE_ENV === "production"
//       ? "https://trello-clone-mu.vercel.app"
//       : "http://localhost:3000",
// };
