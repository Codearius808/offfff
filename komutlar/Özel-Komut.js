const { MessageEmbed } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
calistir: async(client, message, args) => {
	if (!message.member.permissions.has("ADMINISTRATOR")) return;
	if(args[0] == "ekle"){
		if(!args[1]) return message.reply({embeds: [{color: "RED", author: {name: `${message.guild.name}`,url: `https://discord.gg/mercedes`, icon_url: message.guild.iconURL({dynamic: true})}, description: `:x: **Bir komut giriniz.**`,footer: {text: `${message.author.tag} tarafından kullanıldı.`, icon_url: message.author.avatarURL({dynamic: true})}}]})
		const isCommandExists = client.commands.get(args[1]) || client.commands.get(client.aliases.get(args[1]));
		if(isCommandExists) return message.reply({embeds: [{color: "RED", author: {name: `${message.guild.name}`,url: `https://discord.gg/mercedes`, icon_url: message.guild.iconURL({dynamic: true})}, description: `:x: **${args[1]} isimli komut botunuzda bulunuyor.**`,footer: {text: `${message.author.tag} tarafından kullanıldı.`, icon_url: message.author.avatarURL({dynamic: true})}}]})
		if(!args[2]) return message.reply({embeds: [{color: "RED", author: {name: `${message.guild.name}`,url: `https://discord.gg/mercedes`, icon_url: message.guild.iconURL({dynamic: true})}, description: `:x: **Bir rol etiketleyin.**`,footer: {text: `${message.author.tag} tarafından kullanıldı.`, icon_url: message.author.avatarURL({dynamic: true})}}]})
		let özelKomut = args[1]
		let özelRol = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
		if(await db.get("komutlar."+message.guild.id+"."+özelKomut)) return message.reply({embeds: [{color: "RED", author: {name: `${message.guild.name}`,url: `https://discord.gg/mercedes`, icon_url: message.guild.iconURL({dynamic: true})}, description: `:x: **Bu isimde özel komut bulunuyor.**`,footer: {text: `${message.author.tag} tarafından kullanıldı.`, icon_url: message.author.avatarURL({dynamic: true})}}]})
		await db.set("komutlar."+message.guild.id+"."+özelKomut, özelRol.id)
		await message.reply({embeds: [{color: "GREEN", author: {name: `${message.guild.name}`,url: `https://discord.gg/mercedes`, icon_url: message.guild.iconURL({dynamic: true})}, description: `:ballot_box_with_check: **${özelKomut} oluşturuldu. Vereceği rol: ${özelRol}**`,footer: {text: `${message.author.tag} tarafından kullanıldı.`, icon_url: message.author.avatarURL({dynamic: true})}}]})
	}else if(args[0] == "sil"){
		if(!args[1]) return message.reply({embeds: [{color: "RED", author: {name: `${message.guild.name}`,url: `https://discord.gg/mercedes`, icon_url: message.guild.iconURL({dynamic: true})}, description: `:x: **Silmek istediğiniz komutu giriniz.**`,footer: {text: `${message.author.tag} tarafından kullanıldı.`, icon_url: message.author.avatarURL({dynamic: true})}}]})
		if(!await db.get("komutlar."+message.guild.id+"."+args[1])) return message.reply({content: `Bu isimde özel komut bulunmuyor.`});
		await db.delete("komutlar."+message.guild.id+"."+args[1])
		await message.reply({embeds: [{color: "GREEN", author: {name: `${message.guild.name}`,url: `https://discord.gg/mercedes`, icon_url: message.guild.iconURL({dynamic: true})}, description: `:ballot_box_with_check: **${args[1]} komutu silindi.**`,footer: {text: `${message.author.tag} tarafından kullanıldı.`, icon_url: message.author.avatarURL({dynamic: true})}}]})
	}else if(args[0] == "göster"){
		const komutlar = await db.get("komutlar")
		if(!komutlar) return message.reply({embeds: [{color: "RED", author: {name: `${message.guild.name}`,url: `https://discord.gg/mercedes`, icon_url: message.guild.iconURL({dynamic: true})}, description: `:x: **Özel komut bulunmuyor.**`,footer: {text: `${message.author.tag} tarafından kullanıldı.`, icon_url: message.author.avatarURL({dynamic: true})}}]})
		const komutlarTablo = []
		Object.entries(komutlar[message.guild.id]).forEach(([key, value]) => {
			komutlarTablo.push(`**Komut:** !${key}, **Rol:** ${message.guild.roles.cache.get(value)}`)
        });
		if(komutlarTablo.length === 0) return message.reply({embeds: [{color: "RED", author: {name: `${message.guild.name}`,url: `https://discord.gg/mercedes`, icon_url: message.guild.iconURL({dynamic: true})}, description: `:x: **Özel komut bulunmuyor.**`,footer: {text: `${message.author.tag} tarafından kullanıldı.`, icon_url: message.author.avatarURL({dynamic: true})}}]})
		message.reply({embeds: [{color: "RANDOM", author: {name: `${message.guild.name}`,url: `https://discord.gg/mercedes`, icon_url: message.guild.iconURL({dynamic: true})}, title: "Özel Komutlar", description: `${komutlarTablo.join("\n")}`,footer: {text: `${message.author.tag} tarafından istendi.`, icon_url: message.author.avatarURL({dynamic: true})}}]})
	}else return message.reply({embeds: [{color: "RED", author: {name: `${message.guild.name}`,url: `https://discord.gg/mercedes`, icon_url: message.guild.iconURL({dynamic: true})}, description: `**!özel-komut (ekle/sil/göster)**`,footer: {text: `${message.author.tag} tarafından kullanıldı.`, icon_url: message.author.avatarURL({dynamic: true})}}]})
},

name: "özelkomut",
description: "",
aliases: ['ök', 'özel-komut', 'komutoluştur'],
kategori: "",
usage: "",
}