import { Application, Request} from "express";

import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
import { OAuth2Strategy } from "passport-google-oauth";
import session from "express-session";
import config from "../../config";
import { UserInstance } from "../../model";
import {
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
} from "../auth-utils";
import { v4 as UUID } from "uuid";
import { UserAttributes } from "../../interface/UserAttributes";
// import { sendEmail } from "../notification/sendMail";

export const googleoAuthentry = async (app: Application) => {
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: "SECRET",
    })
  );
  let userProfile: any;
  let signature: any = "";

  app.use(passport.initialize());
  // app.use(passport.session());

  app.get("/googleUser/:user", (req, res) => {
    //set cookie
    res.status(200).json({ code: 200, data: userProfile });
  });

  app.get("/error", (req, res) => res.send("error logging in"));

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb: any): void {
    cb(null, obj);
  });

  passport.use(
    new OAuth2Strategy(
      {
        clientID:
          config.GOOGLE_CLIENT_ID || (process.env.GOOGLE_CLIENT_ID as string),
        clientSecret:
          config.GOOGLE_CLIENT_SECRET ||
          (process.env.GOOGLE_CLIENT_SECRET as string),
        callbackURL:
          config.GOOGLE_CALLBACK_URL ||
          (process.env.GOOGLE_CALLBACK_URL as string),
      },
      async function (
        accessToken: any,
        refreshToken: any,
        profile: any,
        done: any
      ) {
        userProfile = profile;
        console.log(accessToken, refreshToken, profile);
        const googleUser = profile._json;
        const {
          sub,
          name,
          given_name,
          family_name,
          picture,
          email,
          email_verified,
          locale,
        } = googleUser;

        console.log(
          sub,
          name,
          given_name,
          family_name,
          picture,
          email,
          email_verified,
          locale
        );

        //add user to db
        //check if user exists
        const userExits = await UserInstance.findOne({
          where: {
            email: email,
            googleId: sub,
          },
        });

        if (userExits) {
          done(null, userProfile);
        } else {
          try {
            const uuiduser = UUID();
            const salt = await GenerateSalt();
            const userPassword = await GeneratePassword(name, salt);
            //check if user already exists using key value pairs in the object
            const userCheck = await UserInstance.findOne({
              where: { email: email },
            });
            //Create User
            if (!userCheck) {
              let newUser = (await UserInstance.create({
                id: uuiduser,
                email,
                userName: name,
                gender: "",
                password: userPassword,
                salt,
                verified: email_verified,
                profileImage: picture,
              })) as unknown as UserAttributes;
              const token: any = await GenerateSignature({
                id: newUser.id,
                email: newUser.email,
                verified: newUser.verified,
                isLoggedIn: true,
              });
              // req.signature = token
              done(null, token);
              // const temp = welcomeEmail(userName, token);
              // await sendEmail(email, "Signup success", temp);

              // return res.status(201).json({
              //   message:
              //     "User created successfully, check your email to activate you account",
              //   token,
              // });
            } else {
              //User already exists
              throw { code: 400, message: "User already exists" };
            }
          } catch (err) {
            done(err);
          }
        }
        // return done(null, userProfile);
      }
    )
  );

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/error",
      successRedirect: `http://127.0.0.1:5173/user-dashboard/google/${signature}`,
    }),
    (req: Request | any, res) => {
      console.log(req.passport);
    }
  );
};
