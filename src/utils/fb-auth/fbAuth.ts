import { Application, Request, Response } from "express";
import { v4 as UUID } from "uuid";
import { UserAttributes } from "../../interface";
import { UserInstance } from "../../model";
import {
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
} from "../auth-utils";
import passport from "passport";
import passportFacebook from "passport-facebook";
const FacebookStrategy = passportFacebook.Strategy;
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

export const fboauth = (app: Application) => {
  app.post("/fb-auth", async (req, res) => {
    try {
      const { userId, accessToken, name, email, image, firstName, lastName } =
        req.body;
      const user = await UserInstance.findOne({ where: { email } });
      if (user) {
        return res.status(400).json({
          Error: "User already registered, please Login.",
        });
      }
      const uuiduser = UUID();
      const newUser = await UserInstance.create({
        salt: "Facebook Default",
        id: uuiduser,
        email,
        firstName,
        lastName,
        facebookId: userId,
        faceBookToken: accessToken,
        profileImage: image,
        password: "Facebook Default",
        userName: name,
      });
      if (newUser) {
        return res.status(201).json({
          message: "Registration successful",
          user: newUser,
        });
      }
      return res.status(400).json({
        Error: "An error occured.",
        statusCode: 400,
      });
    } catch (err) {
      res.status(500).json({
        Error: "An error occured.",
        statusCode: 500,
      });
    }
  });

  app.post("/fb-auth-login", async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
      const user = (await UserInstance.findOne({
        where: { facebookId: userId },
      })) as unknown as UserAttributes;

      if (user) {
        const token = GenerateSignature({
          id: user.facebookId,
          email: user.email,
          token: user.faceBookToken,
        });
        return res.status(200).json({
          message: "Login successful",
          user,
          token,
        });
      }
      return res.status(400).json({
        Error: "Please signup. User not found.",
        statusCode: 400,
      });
    } catch (error) {
      res.status(500).json({
        Error: "An error occured.",
        statusCode: 500,
      });
    }
  });
};

export const fboauthBackend = async (app: Application) => {
  app.use(session({ secret: "secret" }));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj: string, cb) {
    cb(null, obj);
  });

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID!,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        callbackURL: process.env.CALL_BACK_kURL || "",
        authorizationURL: "https://www.facebook.com/v10.0/dialog/oauth",
        tokenURL: "https://graph.facebook.com/v10.0/oauth/access_token",
        profileFields: [
          "id",
          "displayName",
          "email",
          "gender",
          "picture.type(large)",
        ],
      },
      async function (
        accessToken: any,
        refreshToken: any,
        profile: any,
        done: any
      ) {
        console.log(accessToken, profile, refreshToken);
        profile.accessToken = accessToken;
        done(null, profile);
      }
    )
  );
  app.get("/facebook", passport.authenticate("facebook"));

  app.get(
    "/facebook/auth/:secrets",
    passport.authenticate("facebook", {
      successRedirect: "/facebook/profile",
      scope: ["email", "public_profile"],
      failureRedirect: "/failed",
    })
  );

  app.get("/failed", (req, res) => {
    res.send("YOUR FAILED LOGIN !!!");
    //
  });

  app.get("/facebook/profile", async (req: any, res: any) => {
    try {
      const { accessToken, email, displayName, id, gender, photos } = req.user;
      const user = (await UserInstance.findOne({
        where: {
          facebookId: id,
        },
      })) as unknown as UserAttributes;
      if (!user) {
        const uuiduser = UUID();
        const salt = await GenerateSalt();
        const userPassword = await GeneratePassword(displayName, salt);
        //check if user already exists using key value pairs in the object

        const newUser = (await UserInstance.create({
          id: uuiduser,
          email: email || `${id}@gmail.com`,
          userName: displayName,
          password: userPassword,
          salt,
          verified: true,
          facebookId: id,
          profileImage: photos[0].value,
          faceBookToken: accessToken,
          gender,
        })) as unknown as UserAttributes;

        if (newUser) {
          const token: any = await GenerateSignature({
            id: newUser.id,
            email: newUser.email,
            verified: newUser.verified,
            isLoggedIn: true,
          });
          return res.redirect(
            `${process.env.FRONTEND_BASE_URL}/auth/google/?token=${token}`
          );
        } else {
          return res.redirect(
            `${process.env.FRONTEND_BASE_URL}/auth/google/?token=error`
          );
        }
      } else {
        const token: any = await GenerateSignature({
          id: user.id,
          email: user.email,
          verified: user.verified,
          isLoggedIn: true,
        });
        return res.redirect(
          `${process.env.FRONTEND_BASE_URL}/auth/google/?token=${token}`
        );
      }
    } catch (error) {
      console.log(error);
      return res.redirect(
        `${process.env.FRONTEND_BASE_URL}/auth/google/?token=error`
      );
    }
  });
};
