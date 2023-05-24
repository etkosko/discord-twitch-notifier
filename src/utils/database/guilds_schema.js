import mongoose from "mongoose";

export default mongoose.model(
    "guilds",
    new mongoose.Schema(
        {
            guild_id: { type: String, unique: true, required: true },
            twitch: { type:Array }
        },
        {
            versionKey: false, // You should be aware of the outcome after set to false
        }
    )
);
