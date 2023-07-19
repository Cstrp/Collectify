import { Request, Response } from "express";
import { errorHandler } from "../utils";
import { Role, User as Usr } from "../types";
import User from "../models/user";

const getUsers = async (req: Request, res: Response) => {
  try {
    const user = req.user as Usr;

    if (user && user.role !== Role.ADMIN) {
      errorHandler(res, 401, "Huh?");
      return;
    }

    const users = await User.find({}).exec();

    if (!users) {
      errorHandler(res, 404, "Users not found");
      return;
    }

    const _users = users.map(user => ({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    }));

    res.status(200).json(_users);
  } catch (error) {
    errorHandler(res, 500, `Internal Server Error ${error}`);
  }
};

const changeRole = async (req: Request, res: Response) => {
  try {
    const user = req.user as Usr;

    if (user && user.role !== Role.ADMIN) {
      errorHandler(res, 401, "Huh?");
      return;
    } else {
      const foundedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: false }
      );

      if (!foundedUser) {
        errorHandler(res, 404, "User not found");
        return;
      }
    }

    res.status(200).json({ message: "Role has been changed!" });
  } catch (error) {
    errorHandler(res, 500, `Internal Server Error ${error}`);
  }
};

const removeUser = async (req: Request, res: Response) => {
  try {
    const user = req.user as Usr;
    const { id } = req.params;

    if (user && user.role !== Role.ADMIN) {
      errorHandler(res, 401, "Huh?");
      return;
    }
    const foundedUser = await User.findOneAndDelete({ _id: id }).exec();

    if (!foundedUser) {
      errorHandler(res, 404, "User not found");
      return;
    }
    res.status(200).json({ message: "User has been removed" });
  } catch (error) {
    errorHandler(res, 500, `Internal Server Error ${error}`);
  }
};

export { getUsers, changeRole, removeUser };
