import express from 'express'
import passport from 'passport'
import passportFacebook from 'passport-facebook'
const FacebookStrategy = passportFacebook.Strategy
import session from 'express-session'
import dotenv from 'dotenv'
dotenv.config()
import {UserInstance} from '../../model'
import {GeneratePassword, GenerateSalt, GenerateSignature} from '../../utils/auth-utils'
import {UserAttributes} from '../../interface/UserAttributes'
import {v4 as UUID} from 'uuid'
// import config from '../../config'


export const facebookRoute = express.Router();
facebookRoute.use(session({secret:"secret"}));
let userProfile:any;
// var signature:any ;
facebookRoute.use(passport.initialize())
facebookRoute.use(passport.session())
passport.serializeUser(function(user,cb){
	cb(null,user)
})

passport.deserializeUser(function(obj:string,cb){
	cb(null,obj)
})

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID!,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    callbackURL: process.env.SECRETS!,
    profileFields: ['id', 'displayName', 'email']
  },
  async function (
        accessToken: any,
        refreshToken: any,
        profile: any,
        done: any
      ) {
        userProfile = profile;
        console.log(accessToken, refreshToken, profile);
        const facebookUser = profile._json;
        const { sub, name, picture, email, email_verified } = facebookUser;

        //add user to db
        //check if user exists
        const userExits = await UserInstance.findOne({
          where: {
            email: email,
            facebookId: sub,
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
              // let signature = token;
              done(null, token);
              // // const temp = welcomeEmail(userName, token);
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
    
));

facebookRoute.get('/',passport.authenticate('facebook'));

facebookRoute.get('/secrets',
  passport.authenticate('facebook', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/facebook/profile');
  });

  facebookRoute.get("/failed",(req,res)=>{
	res.send("YOUR FAILED LOGIN !!!")
})

facebookRoute.get("/profile",(req,res)=>{
	console.log(req.user)
	res.send("successs login " + JSON.stringify(req.user))
})
