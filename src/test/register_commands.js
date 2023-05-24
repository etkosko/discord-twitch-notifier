export default (client, type = "global") => {
    const commands = client.commands.map((command) => command.slash_data);

    if (type == "global") {
        client.application.commands.set(commands).then(() => {
            console.log("Saved commands as Global commands ✅");
        });
    } else if (type == "guild") {
        const guild = client.guilds.cache.get("1037435126226882600");
        guild.commands.set(commands).then(() => {
            console.log("Saved commands as Guild commands");
        });
    }
};
