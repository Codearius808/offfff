const { MessageEmbed } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
calistir: async(client, message, args) => {
	let reason = args.slice(0).join(" ") || "Belirtmemiş ki salak."
	if(await db.get("afklar."+message.author.id+".sebep")){ 
	message.reply({embeds: [new MessageEmbed().setColor("GREEN").setDescription(`**Artık AFK değilsin. İyi eğlenceler.**`)]}).then(msg => {setTimeout(() => {msg.delete().catch((err) => { })}, 10000)})
	await db.delete("afklar."+message.author.id+".sebep")
	return;}
	await db.set("afklar."+message.author.id+".sebep", reason)
	await message.reply({embeds: [new MessageEmbed().setColor("GREEN").setDescription(`${message.author}, klavyeden uzaklaştı.\n**Sebep:** ${reason}`)]}).then(msg => {setTimeout(() => {msg.delete().catch((err) => { })}, 10000)})
	let nickname = await message.member.nickname || await message.author.username 
	message.member.setNickname(`[AFK] ${nickname}`).catch((err) => { })
},

name: "afk",
description: "",
aliases: [],
kategori: "",
usage: "",
}