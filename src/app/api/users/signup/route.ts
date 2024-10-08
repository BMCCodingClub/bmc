import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/UserModel"
import { NextRequest , NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

connect()


export async function POST(request:NextRequest) {
    try {
        const requestBody = await request.json()
        const {username,email,password} = requestBody
        console.log(requestBody)

        //check if exits
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error:"user alredy exits"},
                {status:400}
            )
        }
//hash pass
const salt = await bcryptjs.genSalt(10)
const hashedPassword = await bcryptjs.hash(password,salt)

const newUser = new User({
    username,
    email :email,
    password:hashedPassword
})
const savedUser = await newUser.save()
console.log(savedUser)
return NextResponse.json({
    message:"user created succefully",
    succes :true,
    savedUser
})
    } catch (error:any) {4
        return NextResponse.json({error:error.message},{
        status:500
        })
        
    }
    
}
