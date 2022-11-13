const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const Gamedig = require("gamedig")
module.exports = {
    calistir: async (client, message, args) => {
        let durum = "Aktif"
        Gamedig.query({
            type: 'mtasa',
            host: '193.223.107.175',
        }).then((state) => {

            if (state.password) durum = "Kilitli"
            const mtaEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`**${state.name}\n\nSunucu Durumu: \`${durum}\`\nOyuncular: \`${state.raw.numplayers}/${state.maxplayers}\`\nGecikme: \`${state.ping}\`\nSunucu IP: \`${state.connect}\`**`)
                .setFooter({ text: `${message.author.tag} Tarafından Kullanıldı`, iconURL: message.author.avatarURL({ dynamic: true }) })
            message.reply({ embeds: [mtaEmbed] }).then(async msg => {
                setTimeout(async () => {
                    await msg.delete().catch(e => { })
                }, 10000)
            })

            // .catch((err) => { message.reply({ embeds: [new Discord.MessageEmbed().setColor("RED").setDescription(`:x: **Sunucu verilerine ulaşamadım...**`).setFooter({ text: `${message.author.tag} Tarafından Kullanıldı`, iconURL: message.author.avatarURL({ dynamic: true }) })] }) })

        })
    },

    name: "server",
    description: "",
    aliases: ['sw'],
    kategori: "",
    usage: "",
}