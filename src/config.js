module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://trelloadmin:securePassword@localhost/trello",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "3h",
  JWT_SECRET: process.env.JWT_SECRET || "change-secret",
  REQUEST_ORIGIN:
    process.env.NODE_ENV === "production"
      ? "https://trello-clone-mu.vercel.app"
      : "http://localhost:3000",
};
