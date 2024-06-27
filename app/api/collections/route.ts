import Collection from "@/lib/models/Collection";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        console.log('auth: ', auth());

        const { userId } = auth();
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 403 });
        }
        await connectToDB();
        const { title, description, image } = await req.json();
        const existingCollection = await Collection.findOne({ title });
        if (existingCollection) {
            return new NextResponse('Collection already exits', { status: 400 });
        }
        const newCollection = await Collection.create({
            title, description, image
        });
        await newCollection.save();
        return NextResponse.json(newCollection, { status: 200 });

    } catch (error) {
        console.log("[collections_POST]", error)
        return new NextResponse("Internal server error", { status: 500 });
    }
}

export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();
        const collections = await Collection.find().sort({
            createdAt: 'desc'
        })

        return NextResponse.json(collections, { status: 200 });
    } catch (error) {
        console.log("[collections_GET]", error)
        return new NextResponse("Internal server error", { status: 500 });
    }
}

export const dynamic = "force-dynamic";
