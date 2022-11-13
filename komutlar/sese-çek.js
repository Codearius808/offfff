const Discord = require("discord.js");
const { joinVoiceChannel } = require('@discordjs/voice');
module.exports = {
calistir: async(client, message, args) => {
    if(!args[0]) return message.reply({content: `Sesli kanal ID giriniz.`});
    let channel = message.guild.channels.cache.get(args[0])
    if(channel.type != "GUILD_VOICE") return message.reply({content: `Sadece sesli kanal ID giriniz.`})
        joinVoiceChannel({
            channelId: channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        })
        message.reply({content: `${channel} kanalına giriş yaptım.`})
},

name: "gir",
description: "",
aliases: [],
kategori: "",
usage: "",
}