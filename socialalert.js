import register_commands from "../test/register_commands.js";
import mongoose from 'mongoose';
import fetch from "node-fetch"
import { EmbedBuilder } from "discord.js";

const cache_guild = {};

export default (client) => {
    // client.once("ready", async () => {
    console.log(`Watching api.twitch.tv streams ✅`);

    const clientId = '239n3w2ayc7mw35f17zaqdt1mipkxa';
    const accessToken = 'axu95u8zdtdqesddloheom2fmzjcez';
    const db = mongoose.connection;
    const collection = db.collection('guilds');

    setInterval(() => {
        collection.find({ twitch: { $exists: true } }).forEach((doc) => {
            if (!cache_guild.hasOwnProperty(doc.guild_id)) {
                fetch(`https://api.twitch.tv/helix/streams?user_login=${doc.twitch[0]}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        'Client-Id': clientId
                    }
                }).then(response => response.json().then(res => {
                    if (!res.data?.length) {
                        if (cache_guild[doc.guild_id]) delete cache_guild[doc.guild_id];
                        return;
                    };
                    const channel = client.channels.cache.get(doc.twitch[1])
                    if (!channel) return;

                    const random1 = 500 + Math.floor(Math.random() * 25)
                    const random2 = 250 + Math.floor(Math.random() * 25)

                    const thumbnail = res.data[0].thumbnail_url.replace("{width}", random1).replace("{height}", random2)
                    const twitchEmbed = new EmbedBuilder()
                        .setTitle(`${res.data[0].user_name} - Twitch`)
                        .setURL(`https://www.twitch.tv/${res.data[0].user_login}`)
                        .addFields(
                            {
                                name: `${res.data[0].title}`,
                                value: `${res.data[0].game_name}`,
                                inline: true
                            },
                            {
                                name: " ",
                                value: `${res.data[0].tags}`,
                            },
                        )
                        .setImage(`${thumbnail}`)
                        .setColor("#8e42fe")
                        .setTimestamp();

                    cache_guild[doc.guild_id] = true

                    channel.send({ content: `${doc.twitch[2]} `, embeds: [twitchEmbed] })
                }))
                    .catch((e) => {
                        console.error(e)
                    })
            } else {
                fetch(`https://api.twitch.tv/helix/streams?user_login=${doc.twitch[0]}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        'Client-Id': clientId
                    }
                }).then(response => response.json().then(res => {
                    if (!res.data?.length && cache_guild[doc.guild_id]) {
                        delete cache_guild[doc.guild_id];
                    }
                }))
                    .catch((e) => {
                        console.error(e)
                    })
            }
        });
    }, 60000);
};
