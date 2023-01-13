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
import config from "../../config";

export const fboauthBackend = async (app: Application) => {
  app.use(
    session({
      secret: config.SESSION_SECRET as string,
      saveUninitialized: false,
      resave: false,
    })
  );
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
        clientID: config.FACEBOOK_CLIENT_ID!,
        clientSecret: config.FACEBOOK_CLIENT_SECRET!,
        callbackURL: config.CALL_BACK_kURL,
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

  app.get("/failed", (req: Request, res: Response) => {
    res.send("YOUR FAILED LOGIN !!!");
    //
  });

  app.get("/facebook/profile", async (req: any, res: any) => {
    try {
      const { accessToken, email, displayName, id, gender, photos } = req.user;
      let userName = displayName.split(" ")[0];
      const user = (await UserInstance.findOne({
        where: {
          facebookId: id,
        },
      })) as unknown as UserAttributes;
      if (!user) {
        const uuiduser = UUID();
        const salt = await GenerateSalt();
        const userPassword = await GeneratePassword(userName, salt);
        //check if user already exists using key value pairs in the object

        const newUser = (await UserInstance.create({
          id: uuiduser,
          email: email || `${id}@gmail.com`,
          userName,
          password: userPassword,
          salt,
          verified: true,
          facebookId: id,
          profileImage: photos[0].value,
          faceBookToken: accessToken,
          gender,
          role: "user",
          is_premium: false,
        })) as unknown as UserAttributes;

        if (newUser) {
          const token: any = await GenerateSignature({
            id: newUser.id,
            email: newUser.email,
            verified: newUser.verified,
            isLoggedIn: true,
          });
          return res.redirect(
            `${config.FRONTEND_BASE_URL}/auth/social/?token=${token}`
          );
        } else {
          return res.redirect(
            `${config.FRONTEND_BASE_URL}/auth/social/?token=error`
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
          `${config.FRONTEND_BASE_URL}/auth/social/?token=${token}`
        );
      }
    } catch (error) {
      console.log(error);
      return res.redirect(
        `${config.FRONTEND_BASE_URL}/auth/social/?token=error`
      );
    }
  });
};
