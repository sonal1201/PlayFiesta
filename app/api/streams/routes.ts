import { prismaClient } from "@/app/lib/db";
import { Regex } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"

const YT_REGEX = new RegExp("^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$")

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string()
})

export async function POST(req: NextRequest , res:NextResponse){
    try {
        const data = CreateStreamSchema.parse(await req.json())
        const isYoutube = YT_REGEX.test(data.url)

        if(!isYoutube){
            return NextResponse.json({
                message: "Wrong Url Format! Provide Correct Url"
            },{
                status: 411
            })
        }

        const extractedId = data.url.split("?v=")[1]

       await  prismaClient.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "youtube"
            }
            
        })

    } catch (e) {
        return NextResponse.json({
            message: "Error while adding the Stream"
        },{
            status: 411
        })
    }
    

}