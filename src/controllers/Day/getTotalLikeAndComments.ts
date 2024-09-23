import { Request, Response } from "express";
import likeModel from "../../models/likeSchema";
import commentModel from "../../models/commentSchema";

const getTotalLikeAndComments = async(req: Request, res: Response) => {
    const {_id} = (req as any).user
    const {myDayId, userId} = req.body
    
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

        const commentData = await commentModel.countDocuments({myDayId})

        const myLike = likeData.myLike.length > 0 ? true : false
        const totalLike = likeData.totalLike[0]?.totalLike || 0
        const totalComment = commentData || 0
        
        res.status(200).send({myLike, totalLike, totalComment})
    } catch (error) {
        res.send(error)
    }
}
export default getTotalLikeAndComments