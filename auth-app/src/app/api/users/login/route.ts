import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email , password} = reqBody;
        console.log("🚀 ~ POST ~ reqBody:", reqBody)

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exists"})
        }
        console.log("User exists")
        const vaildPassword = bcryptjs.compare(password, user.password)
        if(!vaildPassword){
              return NextResponse.json({error: "Check your credentials"}, {status: 400})
        }
        const tokenPayload = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = await jwt.sign(tokenPayload,process.env.TOKEN_SECRET!,{expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Logged In Success",
            success: true
        })
        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response;
    } catch (error:any) {
        return NextResponse.json({error: error.messgae},
        {status: 500})
    }

}
