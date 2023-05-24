import { SlashCommandBuilder } from "discord.js";
import { t } from "i18next";

export const data = {
    name: "notwitchalert",
    permission: "ManageGuild",
    description: "Twitch disables broadcast notification",
    AvalibleSystemNoSee: true,
    async execute(client, interaction) {

        const query = await client.database.fetchAll({ guild_id: interaction.guild.id })
        if (query[0].twitch.length <= 0 || undefined || null) return interaction.reply({ content: `${t("twitch.msg1", { lng: interaction.locale })}`, ephemeral: true });
        await client.database.update(interaction.guild.id, {
            $unset: { twitch: "" },
        });
        interaction.reply({ content: `${t("twitch.msg2", { lng: interaction.locale })}`, ephemeral: true });
    },
};

export const slash_data = new SlashCommandBuilder()
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    .setNameLocalizations({
        tr: "twbildirimikapalı",
    })
    .setDescriptionLocalizations({
        tr: "Twitch yayın bildirimini devre dışı bırakır",
        de: "Deaktiviert die Twitch-Broadcast-Benachrichtigung",
    })
