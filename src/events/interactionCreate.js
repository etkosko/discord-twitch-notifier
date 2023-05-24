import { t } from "i18next";

export default (client) => {
    client.on("interactionCreate", async (interaction) => {

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        const veri = await client.database.fetchAll({
            guild_id: interaction.guild.id,
        });

        try {
            command.data.execute(client, interaction);
        } catch (e) {
            interaction.reply("something went wrong");
            console.log(e);
        }
    });
};
