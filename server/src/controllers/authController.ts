import { Request, Response } from "express";
import { checkBody, checkPassword, encrypt, errorHandler } from "../utils";
import { generateToken } from "../utils/generateToken";
import User from "../models/user";

const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const err = checkBody(req.body, ["email", "password"]);
    const foundedUser = await User.findOne({ email });

    if (err) errorHandler(res, 400, `Bad Request, ${err}`);

    if (foundedUser) {
      const correctPassword = checkPassword(password, foundedUser.password);

      if (correctPassword && foundedUser._id) {
        res.status(200).json({
          token: `Bearer ${generateToken(foundedUser._id, email)}`,
        });
      } else {
        errorHandler(res, 401, "Incorrect password or email");
      }
    }
  } catch (error) {
    errorHandler(res, 500, `Internal Server Error ${error}`);
  }
};

const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    const err = checkBody(req.body, ["email", "password", "username"]);

    const foundedUser = await User.findOne({ email });
    const encryptedPassword = encrypt(password);

    if (err) errorHandler(res, 400, "Bad Request");

    if (foundedUser) {
      errorHandler(res, 409, "User already exists!");
      return;
    }

    const newUser = await new User({
      email,
      password: encryptedPassword,
      username,
    }).save();

    const token = generateToken(newUser._id, email);

    res.status(201).json({
      message: "New user has been created!",
      token: `Bearer ${token}`,
    });
  } catch (error) {
    errorHandler(res, 500, `Internal Server Error ${error}`);
  }
};

export { signIn, signUp };
