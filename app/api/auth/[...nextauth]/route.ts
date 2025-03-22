import nextAuth from "@/node_modules/next-auth/index";
import GoogleProvider from "next-auth/providers/google";

const handler = nextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "", 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ]
})

export {handler as GET, handler as POST}