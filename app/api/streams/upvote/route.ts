import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"

const DownVoteSchema = z.object({
    streamId: z.string()
})


export async function POST(req: NextRequest){
    const session = await getServerSession();

    //can get rid of db call (optimization)
    const user = await prismaClient.user.findFirst({
        where:{
            email: session?.user?.email ?? ""
        }
    })

    if(!user){
        return NextResponse.json({
            message: "Unauthenticated"
        },{
            status: 403
        })
    }

    try {
        const data =  DownVoteSchema.parse(await req.json());
        await prismaClient.upvote.create({
            data:{
                userId: user.id,
                streamId: data.streamId
            }
        })
    }
    catch (error) {
        return NextResponse.json({
            message:"Already Upvoated"
        },{
            status: 403
        })
    }

}
   