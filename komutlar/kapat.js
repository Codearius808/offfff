const Discord = require("discord.js");
const db = require("nrc.db")
const { MessageActionRow, MessageButton } = require("discord.js")
const config = require("../config.json");
module.exports = {
    calistir: async (client, message, args) => {

        let üstYetki = config.üstYetki
        let kayıtlıRol = config.kayıtlıRol

        if (message.member.roles.cache.has(üstYetki) || message.member.permissions.has("ADMINISTRATOR")) {
            let user = message.mentions.users.first() || client.users.cache.get(args[0])
            if (user) {
                message.channel.permissionOverwrites.edit(user, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: false
                }).then(() => {
                    message.channel.send({ embeds: [new Discord.MessageEmbed().setColor('GREEN').setDescription(`**Bu kanal ${user} kişisine kapatıldı.**`)] });
                });
            } else {
                let role = message.guild.roles.cache.find(c => c.id === kayıtlıRol);
                message.channel.permissionOverwrites.edit(role, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: false
                }).then(() => {
                    message.channel.send({ embeds: [new Discord.MessageEmbed().setColor('GREEN').setDescription(`**Bu kanal ${message.author} tarafından kilitlendi.**`)] });
                });
            }
        } else return message.reply({ content: `:x: Bunu yapabilmek için yetkin yok!` })
    },

    name: "kapat",
    description: "",
    aliases: [],
    kategori: "",
    usage: "",
}