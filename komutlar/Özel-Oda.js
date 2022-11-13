const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
    calistir: async(client, message, args, prefix) => {
    if(message.author.id != "540155751696433163") return
		const row = new MessageActionRow()
		.addComponents(
		new MessageButton()
		.setCustomId('GurluOda')
		.setLabel('Özel Odanı Oluştur')
		.setStyle('SUCCESS'),	
		);
		message.channel.send({content: `**Selam, ${message.guild.name} özel oda sistemine hoş geldin!**\n\nKendinize özel isimde ve sadece senin yönetebileceğin bir kanalın olabilir.\nBu kanala istediklerinin erişimine izin verebilir, istemediklerini odadan yasaklayabilirsin!\n\nİstersen odanı gizli yapıp sadece arkadaşlarınla eğlenebilir,\nYa da herkese açık yaparak yeni insanlarla tanışabilirsin.\n\nÖzel oda oluşturmak için alttaki butona bas.\nİyi sohbetler!`, components: [row]});	
},

name: "oda",
description: "",
aliases: [],
kategori: "",
usage: "",
}