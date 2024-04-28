const { Cart } = require("./models/cart");
const { User } = require("./models/user");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, cb) {
      try {
        const user = await User.findOne({ email });

        if (!user) return cb(null, false);

        const is_password_valid = await user.is_password_correct(password);
        if (!is_password_valid) return cb(null, false);

        return cb(null, user);
      } catch (error) {
        return cb(error, false);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/oauth2/redirect/google",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log("profile", profile);
      try {
        const email = profile._json.email;

        let user = await User.findOne({ email });

        if (!user) {
          let new_user = {
            username: profile._json.given_name + Math.floor(Math.random() * 1000 + 1),
            email: email,
            // password: "",
            full_name: profile.displayName,
            avatar: profile._json.picture,
            mobile: 0,
          };
          user = await User.create(new_user);
          // creating user cart 
          await Cart.create({ user_id: user._id });
        }
        console.log(user);
        return cb(null, user);
      } catch (error) {
        return cb(error);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async function (id, cb) {
  try {
    const user = await User.findById(id);
    cb(null, user);
  } catch (error) {
    cb(error);
  }
});
