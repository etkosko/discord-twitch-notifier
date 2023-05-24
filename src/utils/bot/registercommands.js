import { EmbedBuilder } from "discord.js";
import { Guild, REST, Routes } from "discord.js";
import "dotenv/config";

export default async (guild) => {
    const { client } = guild;

    const rest = new REST({ version: "10" }).setToken(process.env.token);
    const body = client.commands.map((command) => command.slash_data);

    try {
        await rest.put(Routes.applicationCommands("ID"), {
            body,
        });
    } catch (error) {
        if (error.code == 50001 || error.code == 50013) {
            const embed = new EmbedBuilder()
                .setTitle("🚫 Acces Error 50001")
                .setDescription(
                    "Acces error bot no have perm"
                );

            const owner = await guild.fetchOwner();
            owner.send({ embeds: [embed] }).catch(() => { });
        }
        console.error(error);
    }
};
