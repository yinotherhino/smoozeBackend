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
var signature:any ;
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
      )
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
