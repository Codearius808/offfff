const {MessageActionRow, MessageButton, MessageEmbed} = require("discord.js")
const ytdl = require("ytdl-core")
const fs = require('fs')

module.exports = {
calistir: async(client, message, args) => {
    if(!message.member.permissions.has("ADMINISTRATOR")) return;
    if((!args[0]) || (!args[0].includes("youtu"))) return message.reply({embeds: [new MessageEmbed().setColor("ff0000").setDescription(`**Youtube Müzik Link Giriniz.**`).setFooter({text: `${message.author.tag}, tarafından kullanıldı.`, iconURL: message.author.avatarURL({dynamic: true})})]})//.then(mesaj => {setTimeout(() => {mesaj.delete()) }, 5000)});
message.reply({embeds: [new MessageEmbed().setColor("RANDOM").setDescription(`**Müzik Dönüştürülüyor.**`).setFooter({text: `${message.author.tag}, tarafından kullanıldı.`, iconURL: message.author.avatarURL({dynamic: true})})]}).then(async mesaj =>{        
    songInfo = await ytdl.getInfo(args[0])
    if(songInfo.videoDetails.lengthSeconds > 500) return mesaj.edit({embeds: [new MessageEmbed().setColor("ff0000").setDescription(`**Müzik Süresi Fazla.**`).setFooter({text: `${message.author.tag}, tarafından kullanıldı.`, iconURL: message.author.avatarURL({dynamic: true})})]});
const download = ytdl(args[0], { filter: 'audioonly', format: 'mp3' });
const writeStream = fs.createWriteStream(`./${songInfo.videoDetails.videoId}.mp3`);
download.pipe(writeStream)
    download.on('end', () => {
        client.channels.cache.get("1041066695906832405").send({files: [`./${songInfo.videoDetails.videoId}.mp3`]}).then(msg =>{
            fs.unlinkSync(`./${songInfo.videoDetails.videoId}.mp3`)
            msg.attachments.forEach(audio =>{
                const audioEmbed = new MessageEmbed()
                .setColor("BLUE")
                .setAuthor({name: songInfo.videoDetails.ownerChannelName, iconURL: songInfo.videoDetails.author.thumbnails[0].url, url: songInfo.videoDetails.author.channel_url})
                .setDescription(`**Şarkı Dönüştürüldü.** \n${songInfo.videoDetails.title}`)
                .setThumbnail(songInfo.videoDetails.thumbnails[0].url)
                .setFooter({text: `${message.author.tag}, tarafından kullanıldı.`, iconURL: message.author.avatarURL({dynamic: true})})
                const audioRow = new MessageActionRow()
                .addComponents(
                new MessageButton()
                .setLabel('MP3 Link')
                .setEmoji("1032290870013210684")
                .setURL(audio.url)
                .setStyle('LINK'),    
                );                  
                mesaj.edit({embeds: [audioEmbed], components: [audioRow]})
            })
        })
                .catch((err) => {message.reply({embeds: [new MessageEmbed().setColor("ff0000").setDescription(`**Müzik Dönüştürülemedi.**`).setFooter({text: `${message.author.tag}, tarafından kullanıldı.`, iconURL: message.author.avatarURL({dynamic: true})})]})})
    });    
    });    
        
},

name: "transcode",
description: "",
aliases: ["mp3"],
kategori: "",
usage: "",
}