import {
  ExtractJwt,
  Strategy as JwtStrategy,
  VerifiedCallback,
} from "passport-jwt";
import { SECRET_KEY } from "../config";
import { PassportStatic } from "passport";
import User from "../models/user";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

const _passportJwt = (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(options, async (payload, done: VerifiedCallback) => {
      try {
        const user = await User.findById(payload.id);

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        console.log(error);
      }
    })
  );
};

export { _passportJwt };
