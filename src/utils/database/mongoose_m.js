import guilds_schema from "./guilds_schema.js";

export const fetch = async (guild_id) => {
    let guild_db = await guilds_schema.findOne({ guild_id });

    if (guild_db) return guild_db;
    else {
        guild_db = new guilds_schema({ guild_id });
        await guild_db.save();
        return guild_db;
    }
};

export const fetchAll = async (filter = {}) => {
    const guild_db = await guilds_schema.find(filter);
    return guild_db;
};

export const update = async (guild_id, update_value) => {
    const returned = await guilds_schema.updateOne({ guild_id }, update_value, {
        upsert: true,
    });
};