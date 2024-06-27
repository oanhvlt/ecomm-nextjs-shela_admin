import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
    mongoose.set("strictQuery", true); //enforce strict checking of query conditions

    if (isConnected) {
        console.log('MongoDB is already connected!');
        return;
    }

    try {
        await mongoose.connect(process.env.DB_URL!);
        isConnected = true;
        console.log('MongoDB is connected successfully!');
    } catch (error) {
        console.log(error);
    }
}