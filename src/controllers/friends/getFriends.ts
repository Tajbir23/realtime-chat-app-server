import { Request, Response } from "express";
import connectionModel from "../../models/connectionSchema";
import friendsInterface from "../../interface/friendsInterface";

const getFriends = async (req: Request, res: Response) => {
  const { _id, email } = (req as any).user;
  const { currentPage = 1} = (req as any).query;

  try {
    const skip = (Number(currentPage - 1) * 10)
    const friends: friendsInterface[] = await connectionModel
    .find({
      $or: [{ receiverId: _id }, { senderId: _id }],
    })
    .populate("senderId", "-password")
    .populate("receiverId", "-password")
    .skip(skip)
    .limit(10)
    .lean();

    console.log("friends",friends)
  const data = friends.map((friend) => {
    if (friend.senderId.email === email) {
      return friend.receiverId;
    } else {
      return friend.senderId;
    }
  });

  console.log("filter friends", friends)
  res.send(data);
  } catch (error) {
    res.send(error)
  }
};

export default getFriends;
