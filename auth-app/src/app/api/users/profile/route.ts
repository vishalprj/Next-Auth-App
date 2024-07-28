import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from "@/helpers/deleteDataFromToken";

// Ensure database connection is established
connect()

export async function POST(request: NextRequest) {
    try {
        // Extract userId from the token
        const userId = await getDataFromToken(request);

        // Fetch the user data, excluding the password field
        const user = await User.findOne({ _id: userId }).select("-password");

        // Check if user exists
        if (!user) {
            return NextResponse.json({
                message: "User not found",
                data: null
            }, { status: 404 });
        }

        // Return the user data
        return NextResponse.json({
            message: "User found",
            data: user
        });
    } catch (error:any) {
        // Handle any errors that occur
        console.error("Error fetching user:", error);
        return NextResponse.json({
            message: "Internal Server Error",
            error: error.message
        }, { status: 500 });
    }
}
