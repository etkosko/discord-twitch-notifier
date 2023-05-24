import register_commands from "../test/register_commands.js";
export default (client) => {
    client.once("ready", async () => {
        console.log(`${client.user.username} is ready ✅`);

        setInterval(() => {
            const PRESENCE_LIST = [
                `Etkosko Github`,
            ];
            const randomer = Math.floor(Math.random() * PRESENCE_LIST.length);
            client.user.setPresence({
                activities: [{ name: PRESENCE_LIST[randomer], type: 2 }],
                status: "idle",
            });
        }, 10000);
        register_commands(client, "global");
    });
};
