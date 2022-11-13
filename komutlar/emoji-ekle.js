module.exports = {
    calistir: async(client, message, args) => {
            if(!message.member.permissions.has("ADMINISTRATOR")) return;
      const emoteRegex = /<:.+:(\d+)>/gm
      const animatedEmoteRegex = /<a:.+:(\d+)>/gm
    
      if (emoji = emoteRegex.exec(message)) {
        if(message.guild.emojis.cache.map(e => e.name).includes(emoji[0].split(":")[1])) return message.reply({content: ` **Bu isimde bir emoji bulunuyor.**`}); 
      const url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".png?v=1"
      message.guild.emojis.create(url, emoji[0].split(":")[1]).then(em => {message.reply({content: ` **(${em}), eklendi.**`})}).catch((err) => {message.reply({content: ` **Emoji eklenirken hata oldu.**`})})
      }
      else if (emoji = animatedEmoteRegex.exec(message)) {
        if(message.guild.emojis.cache.map(e => e.name).includes(emoji[0].split(":")[1])) return message.reply({content: ` **Bu isimde bir emoji bulunuyor.**`}); 
      const url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".gif?v=1"
      message.guild.emojis.create(url, emoji[0].split(":")[1]).then(em => {message.reply({content: ` **(${em}), eklendi.**`})}).catch((err) => {message.reply({content: ` **Emoji eklenirken hata oldu.**`})})
      }
      else {
      message.reply(` **Özel emoji gönderin.**`)
      }    
    },
    
    name: "emojiekle",
    description: "",
    aliases: ['ekle'],
    kategori: "",
    usage: "",
    }