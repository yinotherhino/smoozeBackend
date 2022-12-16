import dotenv from 'dotenv'
dotenv.config()
export default {
  GMAIL_PASS: "lxideqvkiznxipjs",
  GMAIL_USER: "smooveappro@gmail.com",
  FROM_ADMIN_EMAIL: "smooveappro@gmail.com",
  userSubject: " Welcome To Smooze App!",
  port: process.env.PORT || process.env.PORT || 7000,
  BASE_URL: process.env.BASE_URL,
  FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL,
  DATABASE_URL:
    "postgres://rtajhzcb:vEUxVGeppmcvGoMPCxYsryRU76SGLzy4@ruby.db.elephantsql.com/rtajhzcb",
  APP_SECRETE: "blablabla",
  JWT_SECRETE: "blablabla",
  DATABASE_USERNAME: "rtajhzcb",
  DATABASE_HOST: "ruby.db.elephantsql.com",
  DATABASE_DATABASE_NAME: "rtajhzcb",
  DATABASE_PASSWORD: "vEUxVGeppmcvGoMPCxYsryRU76SGLzy4",
  DATABASE_PORT: 5432,
};
console.log("running production mode");
