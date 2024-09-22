import { Request, Response } from "express";
import likeModel from "../../models/likeSchema";

const getTotalLikeAndComments = async(req: Request, res: Response) => {
    const {_id} = (req as any).user
    const {myDayId, userId} = req.body
    console.log(myDayId, userId)
    try {
        const [likeData] = await likeModel.aggregate([
            {$facet : {
                myLike: [
                    {$match: {myDayId, reactorId: _id, posterId: userId}},
                    {$limit: 1}
                ],
                totalLike: [
                    {$match: {myDayId, posterId: userId}},
                    {$count: "totalLike"}
                ]
            }}
        ])

        const myLike = likeData.myLike.length > 0 ? true : false
        const totalLike = likeData.totalLike[0]?.totalLike || 0
        console.log(myLike, totalLike)
        res.status(200).send({myLike, totalLike})
    } catch (error) {
        res.send(error)
    }
}
export default getTotalLikeAndComments