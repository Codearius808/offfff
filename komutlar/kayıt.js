const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
    calistir: async(client, message, args, prefix) => {
    if(message.author.id == "540155751696433163"){
        const row = new MessageActionRow()
        .addComponents(
        new MessageButton()
        .setCustomId('KayıtOL')
        .setLabel('Kayıt Ol')
        .setEmoji("1041324824422780981")
        .setStyle('SECONDARY'),    
        );
        message.channel.send({
            content: "**Kayıt olmak için butona basınız, saniyeler içerisinde kaydınız tamamlanacaktır.**", components: [row]
        });
     }else{message.reply(`Bu komudu kullanmak için yetkin yok`)}    
},

name: "kayıt",
description: "",
aliases: [],
kategori: "",
usage: "",
}