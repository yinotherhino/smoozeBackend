const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const session = require("express-session");

const { UserInstance } = require("../../model/index");

module.exports = googleoAuthentry = async (app) => {
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: "SECRET",
    })
  );
  var userProfile;

  app.use(passport.initialize());
  // app.use(passport.session());

  app.get("/success", (req, res) => res.send(userProfile));
  app.get("/error", (req, res) => res.send("error logging in"));

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });

  /*  Google AUTH  */

  const GOOGLE_CLIENT_ID =
    "1054496903326-u4ljs14hl6pqm8plbtpo44egqkhlquj6.apps.googleusercontent.com";
  const GOOGLE_CLIENT_SECRET = "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";
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000",
      },
      function (accessToken, refreshToken, profile, done) {
        userProfile = profile;
        return done(null, userProfile);
      }
    )
  );

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/error" }),
    function (req, res) {
      // Successful authentication, redirect success.
      res.redirect("/success");
    }
  );

  // console.log("up and runnimg ");
  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: process.env.GOOGLE_CLIENT_ID,
  //       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //       callbackURL: process.env.REDIRECT_URI,
  //       access_type: "offline",
  //       response_type: "code",
  //     },
  //     async function (accessToken, refreshToken, profile, done) {
  //       //find usr in db with profile id to check wetherthey arerefgistered
  //       // console.log(accessToken, refreshToken, profile, done);
  //       let user = { accessToken, refreshToken, ...profile._json };
  //       let userMail = user["email"]; //get email of the user
  //       //check if user already exist in database
  //       //if user exist update the tokens and update google details  and log user in
  //       //else create new user with google auth and details and log them into the session
  //       try {
  //         // UserInstance.findOne({ email: userMail }).then((data) => {
  //         //   if (data) {
  //         //     data.is_active = user["email_verified"];
  //         //     data.googleId = user["sub"];
  //         //     data.picture = user["picture"];
  //         //     data.accessToken = accessToken;
  //         //     data.refreshToken = refreshToken;
  //         //     data.family_name = user["family_name"];
  //         //     data.sub = user["sub"];
  //         //     data.given_name = user["given_name"];
  //         //     data.save().then((u, e) => {
  //         //       if (e) return done(null, false);
  //         //       return done(null, u);
  //         //     });
  //         //     return;
  //         //   } else {
  //         //     console.log("create data............");
  //         //     // generate password from google id
  //         //     //send password to user email
  //         //     genPassword(user["sub"]).then((password) => {
  //         //       const { hash, salt } = password;
  //         //       console.log(hash, salt);

  //         //       try {
  //         //         newUser.save().then((saved, error) => {
  //         //           return done(null, saved._id);
  //         //         });
  //         //       } catch (error) {
  //         //         return done(null, false);
  //         //       }
  //         //     });
  //         //     return;
  //         //   }
  //         // });
  //         console.log(user);
  //         return;
  //       } catch (error) {
  //         done(null, false);
  //         return;
  //       }
  //     }
  //   )
  // );
  // module.exports = {
  //   googleoAuthentry: passport.authenticate("google", {
  //     scope: [
  //       "https://www.google.com/m8/feeds",
  //       "https://www.googleapis.com/auth/contacts",
  //       "https://www.googleapis.com/auth/spreadsheets",
  //       "https://www.googleapis.com/auth/userinfo.profile",
  //       "https://www.googleapis.com/auth/userinfo.email",
  //       "https://www.googleapis.com/auth/cloud-platform",
  //       "https://www.googleapis.com/auth/script.container.ui",
  //     ],
  //     accessType: "offline",
  //     responseType: "code",
  //     prompt: "consent",
  //     successRedirect: "/google/callback",
  //     failureRedirect: "/",
  //   }),
  // };

  // app.get("/auth/google", (req, res) => {
  //   res.sned("hello");
  // });
  // // app.get(
  // //   "api/user/auth/google",
  // //   passport.authenticate("google", { scope: ["profile", "email"] })
  // // );

  // // app.get(
  // //   "api/user/auth/google/callback",
  // //   passport.authenticate("google", { failureRedirect: "/error" }),
  // //   function (req, res) {
  // //     // Successful authentication, redirect success.
  // //     res.redirect("/success");
  // //   }
  // // );
};
