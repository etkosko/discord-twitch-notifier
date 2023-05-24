import { Client, Collection, EmbedBuilder, Partials } from "discord.js";
import "dotenv/config";
import { readdirSync } from "fs";
import mongoose from "mongoose";
import * as database from "./src/utils/database/mongoose_m.js";


// * Twitch Acces Token get
// import fetch from "node-fetch"
// fetch("https://id.twitch.tv/oauth2/token?client_id=<clientid>&client_secret=<clientsecret>&grant_type=client_credentials" ,{
//     method: "POST"
// }).then(res => {
//     res.json().then(response => {
//         console.log(response)
//     })
// })

const client = new Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "GuildMembers",
        "MessageContent",
        "GuildPresences",
        "GuildVoiceStates",
        "DirectMessages",
        "DirectMessageTyping",
        "GuildMessageReactions",
        "DirectMessageReactions",
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});
client.database = database;

await mongoose.connect(process.env.DataBaseToken).then(() => {
    console.log("Connected to Mongoose ✅");
});

//* Event loader
readdirSync("./src/events").forEach(async (file) => {
    const event = await import(`./src/events/${file}`).then((m) => m.default);
    event(client);
});

//* Command loader
client.commands = new Collection();
readdirSync("./src/commands").forEach((category) => {
    readdirSync(`./src/commands/${category}`).forEach(async (file) => {
        const command = await import(`./src/commands/${category}/${file}`);
        client.commands.set(command.data.name, command);
    });
});

//* Login
client.login(process.env.token);