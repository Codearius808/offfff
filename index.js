const Discord = require("discord.js");
const { Intents, Collection } = Discord;
const client = new Discord.Client({ intents: 32767 });
const db = require("nrc.db");
require("discord-reply");

const { token, owners } = require("./config.json");

client.commands = new Collection();
client.aliases = new Collection();
client.stats = new Collection();
require("./handlers/Events.js")(client);
require(`./utils/komutcalistirici`)(client);
	

client.login(token).catch((error) =>
	console.error("Lütfen tokeni doğru biçimde girin!\n\n" + error)
);

Promise.prototype.del = (ms) => {
  if (this)
    this.then((m) => {
      if (m.deletable) setTimeout(() => m.delete(), Number(ms));
    });
};

process.on("uncaughtException", (err) => console.error(err.stack));
process.on("unhandledRejection", (err) => console.error(err.stack));
//kayıt
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;
  if(interaction.customId === "KayıtOL"){
      interaction.member.roles.add("1014963368815235254")
      interaction.reply({embeds: [new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${interaction.user}, **Başarılı şekilde kayıt oldunuz. İyi eğlenceler dileriz...**`)], ephemeral: true })
  }
});
//reklam-engel
client.on("messageCreate", async message=> {
  const reklam = ["discord.gg",];
  if (reklam.some(word => message.content.includes(word))) {
      if(!message.member.permissions.has("ADMINISTRATOR")){
      message.delete().catch((err) => {})
      message.channel.send({content: `${message.author}, **Reklam yapmaya çalıştı.**`}).then(msg => setTimeout(() => msg.delete().catch((err) => {}), 5000))
      }
}
});
//küfür engel
client.on("messageCreate", async msg => {
  const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
  if (kufur.some(word => msg.content.split().includes(word))) {
      if (!msg.member.permissions.has("ADMINISTRATOR")) {
          msg.delete().catch((err) => {})
          msg.channel.send(`${msg.author}, **Sunucuda küfür edemezsin.**`).then(mesaj => setTimeout(() => mesaj.delete().catch((err) => {}), 5000))
      }              
  }
});
client.on("messageUpdate", async (oldMessage, newMessage) => {
  const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
  if (kufur.some(word => newMessage.content.includes(word))) {
      if (!newMessage.member.permissions.has("ADMINISTRATOR")) {
          newMessage.delete().catch((err) => {})
          newMessage.channel.send(`${newMessage.author}, **Sunucuda küfür edemezsin.**`).then(msg => setTimeout(() => msg.delete().catch((err) => {}), 5000))
      }              
  }
});
//login-yazı
const figlet = require('figlet');
const chalk = require('chalk');

client.on("ready", () => {
figlet(client.user.tag, function(err, data) {
  if (err) {
    console.log('hata var kontrol edin (ready)');
    console.dir(err);
    return;
  }  
console.log(chalk.white.bold(data));
});
})
//mta-bot-durum
const Gamedig = require('gamedig');
client.on("ready", () => {
setInterval(function() {
            Gamedig.query({
            type: 'mtasa',
            host: '193.223.107.175',
            }).then((state) => {
                client.user.setPresence({activities: [{ name: `Aktif: "${state.raw.numplayers}" oyuncuyu`, type: `WATCHING` }],status: `dnd`,});    
            }).catch((err) => {client.user.setPresence({activities: [{ name: `Kalite.`, type: `WATCHING` }],status: `dnd`,});})
        }, 10000);  
})
//özel-komut
const { MessageEmbed } = require('discord.js')
const { QuickDB4 } = require("quick.db");
const db4 = new QuickDB();
const prefix = "!"

client.on("messageCreate", async message => {
	if(message.content.startsWith(prefix)){
	if(message.author.bot) return;
	if (!message.member.permissions.has("ADMINISTRATOR")) return;
	var args = message.content.split(/ +/g).slice(0);
	let özelKomutum = message.content.substring(message.content.indexOf(prefix)+1, args[0].length);
	let özelKomutlar = await db.get("komutlar."+message.guild.id+"."+özelKomutum)
	if(!özelKomutlar) return;	
		 if(args[1]){
			user = message.mentions.users.first() || client.users.cache.get(args[1])
		 }else{
			 user = message.mentions.users.first()
		 }
		if(!user) return message.reply({embeds: [{color: "RED", author: {name: `${message.guild.name}`,url: `https://discord.gg/mercedes`, icon_url: message.guild.iconURL({dynamic: true})}, description: ":x: **Rol verilecek üyeyi etiketleyin.**",footer: {text: `${message.author.tag} tarafından kullanıldı.`, icon_url: message.author.avatarURL({dynamic: true})}}]})
		let member = message.guild.members.cache.get(user.id)
		if(!member) return message.reply({embeds: [{color: "RED", author: {name: `${message.guild.name}`,url: `https://discord.gg/mercedes`, icon_url: message.guild.iconURL({dynamic: true})}, description: ":x: **Rol verilecek üyeyi etiketleyin.**",footer: {text: `${message.author.tag} tarafından kullanıldı.`, icon_url: message.author.avatarURL({dynamic: true})}}]})
		if(!message.guild.roles.cache.get(özelKomutlar)) return	message.reply({embeds: [{color: "RED", author: {name: `${message.guild.name}`,url: `https://discord.gg/mercedes`, icon_url: message.guild.iconURL({dynamic: true})}, description: ":x: **Verilecek rolü bulamadım.**",footer: {text: `${message.author.tag} tarafından kullanıldı.`, icon_url: message.author.avatarURL({dynamic: true})}}]})
			if(member.roles.cache.get(özelKomutlar)){
				member.roles.remove(özelKomutlar)
				.then(() => {message.reply({embeds: [{color: "GREEN", author: {name: `${message.guild.name}`,url: `https://discord.gg/mercedes`, icon_url: message.guild.iconURL({dynamic: true})}, description: `:ballot_box_with_check: **${member} üyesinden ${message.guild.roles.cache.get(özelKomutlar)} rolü alındı.**`,footer: {text: `${message.author.tag} tarafından kullanıldı.`, icon_url: message.author.avatarURL({dynamic: true})}}]})})
				.catch((err) => {message.reply({embeds: [{color: "GREEN", author: {name: `${message.guild.name}`,url: `https://discord.gg/mercedes`, icon_url: message.guild.iconURL({dynamic: true})}, description: `:x: **Verilecek rol kişinin veya benim üstümde.**`,footer: {text: `${message.author.tag} tarafından kullanıldı.`, icon_url: message.author.avatarURL({dynamic: true})}}]})})
			}else{
				member.roles.add(özelKomutlar)
				.then(() => {message.reply({embeds: [{color: "GREEN", author: {name: `${message.guild.name}`,url: `https://discord.gg/mercedes`, icon_url: message.guild.iconURL({dynamic: true})}, description: `:ballot_box_with_check: **${member} üyesine ${message.guild.roles.cache.get(özelKomutlar)} rolü verildi.**`,footer: {text: `${message.author.tag} tarafından kullanıldı.`, icon_url: message.author.avatarURL({dynamic: true})}}]})})
				.catch((err) => {message.reply({embeds: [{color: "GREEN", author: {name: `${message.guild.name}`,url: `https://discord.gg/mercedes`, icon_url: message.guild.iconURL({dynamic: true})}, description: `:x: **Verilecek rol kişinin veya benim üstümde.**`,footer: {text: `${message.author.tag} tarafından kullanıldı.`, icon_url: message.author.avatarURL({dynamic: true})}}]})})
			}
	 }	
});
//level-sistem
const {Collection2} = require("discord.js");
const { QuickDB2 } = require("quick.db");
const db2 = new QuickDB();
let levels = 1234

client.on("messageCreate", async message => {
if (message.author.bot) return;
  await db.add("stats."+message.guild.id+"."+message.member.id+".msg", 1);
  await db.add("stats."+message.guild.id+"."+message.member.id+".xp", 25);
  let user_info = await db.get("stats."+message.guild.id+"."+message.member.id);
  if(!user_info.level) await db.set("stats."+message.guild.id+"."+message.member.id+".level", 1);
  if(user_info.xp>levels*user_info.level){
	await db.add("stats."+message.guild.id+"."+message.member.id+".level", 1);
	await db.set("stats."+message.guild.id+"."+message.member.id+".xp", 25);
	message.reply({content:"🌟 **"+message.author.tag+"** seviye **"+(user_info.level+1)+"**'e yükseldin!"});
  } 
})

let voiceData = new Collection();
client.on('voiceStateUpdate', async (oldMember, newMember) => {
	if(newMember.member.user.bot) return;
  if(!oldMember.channel){
    voiceData.set(newMember.id, Date.now());
  }else if(!newMember.channel){
     if (voiceData.has(newMember.id)) {
      let time = await Date.now() - voiceData.get(newMember.id)
      await db.add("stats."+newMember.guild.id+"."+newMember.id+".voice", time)
      let newxp = parseInt(time/2000);
      await db.add("stats."+newMember.guild.id+"."+newMember.id+".xp", newxp)
      }
  }
}) 
//özel-oda
const {MessageActionRow, MessageButton} = require("discord.js")

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isButton()) return;
	if(interaction.customId === "GurluOda"){
			let kanalın = "YOK"
			interaction.guild.channels.cache.forEach(c => {
				if(c.type === "GUILD_TEXT"){
					if(c.topic){
						if(c.topic.includes(interaction.user.id)){
							kanalın = `${c} - ${interaction.guild.channels.cache.get(c.topic.split("_")[1])}`
						}
					}
				}
			})
			if(kanalın != "YOK") return interaction.reply({content: `Zaten bir özel oda oluşturmuşsunuz. ${kanalın}`, ephemeral: true})					
		const özelOda = await new Modal() 
		.setCustomId('GurluOzelOdaPanel')
		.setTitle(`${interaction.guild.name} Özel Oda Sistemi`)
		.addComponents(
		  new TextInputComponent() 
		  .setCustomId('odaName')
		  .setLabel('OLUŞTURMAK İSTEDİĞİNİZ KANALIN ADI?')
		  .setStyle('SHORT') 
		  .setMinLength(3)
		  .setMaxLength(25)
		  .setPlaceholder('Kanal adını girin...')
		  .setRequired(true)
		)
		.addComponents(
		  new TextInputComponent() 
		  .setCustomId('odaGizli')
		  .setLabel('SES HERKESE AÇIK OLSUN MU?.')
		  .setStyle('SHORT') 
		  .setMinLength(4)
		  .setMaxLength(5)
		  .setPlaceholder('Sadece EVET veya HAYIR yazın!')
		  .setRequired(true)
		)
		await showModal(özelOda, {
			client: client, 
			interaction: interaction 
		  })
	}
	if(interaction.customId === "ÖzelOdaSil"){
		await interaction.reply({content: `**Kanallar 5 saniye içerisinde silinecek.**`})
		setTimeout(async()=>{	
			if(!interaction.channel) return;
			await interaction.guild.channels.cache.get(interaction.channel.topic.split("_")[1]).delete().catch(()=>{})
			await interaction.channel.delete().catch(()=>{})
		}, 5000)
	}
	if(interaction.customId === "ÖzelOdaGizli"){
		if(!interaction.channel.topic) return interaction.reply({content: `**Ses kanalını bulamıyorum.**`, ephemeral: true})
		const sesKanal = interaction.guild.channels.cache.get(interaction.channel.topic.split("_")[1])
		if(!sesKanal) return interaction.reply({content: `**Ses kanalını bulamıyorum.**`, ephemeral: true})
			await sesKanal.permissionOverwrites.edit(interaction.guild.roles.cache.get(interaction.guild.id), {CONNECT:false,})
			await interaction.reply({content: `Ses kanalınız üyelere gizlendi.`, ephemeral: true})
			await interaction.message.edit({components:[
			new MessageActionRow()
			.addComponents(	
			new MessageButton()
			.setCustomId('ÖzelOdaAcik')
			.setLabel('(SES) Kanalı herkese açık yap.')
			.setStyle('PRIMARY'),
			new MessageButton()
			.setCustomId('ÖzelOdaİzinVer')
			.setLabel('Kullanıcı izni ver')
			.setStyle('PRIMARY'),						
			new MessageButton()
			.setCustomId('ÖzelOdaİzinSil')
			.setLabel('Kullanıcı yasakla')
			.setStyle('PRIMARY'),						
			new MessageButton()
			.setCustomId('ÖzelOdaSil')
			.setLabel('KANALLARI SİL')
			.setStyle('DANGER'),	
			)]		
			})
	}
	if(interaction.customId === "ÖzelOdaAcik"){
		if(!interaction.channel.topic) return interaction.reply({content: `**Ses kanalını bulamıyorum.**`, ephemeral: true})
		const sesKanal = interaction.guild.channels.cache.get(interaction.channel.topic.split("_")[1])
		if(!sesKanal) return interaction.reply({content: `**Ses kanalını bulamıyorum.**`, ephemeral: true})
			await sesKanal.permissionOverwrites.edit(interaction.guild.roles.cache.get(interaction.guild.id), {CONNECT:true,})
			await interaction.reply({content: `Ses kanalınız üyelere açıldı.`, ephemeral: true})
			await interaction.message.edit({components:[
			new MessageActionRow()
			.addComponents(	
			new MessageButton()
			.setCustomId('ÖzelOdaGizli')
			.setLabel('(SES) Kanalı herkese gizli yap.')
			.setStyle('PRIMARY'),
			new MessageButton()
			.setCustomId('ÖzelOdaİzinVer')
			.setLabel('Kullanıcı izni ver')
			.setStyle('PRIMARY'),						
			new MessageButton()
			.setCustomId('ÖzelOdaİzinSil')
			.setLabel('Kullanıcı yasakla')
			.setStyle('PRIMARY'),						
			new MessageButton()
			.setCustomId('ÖzelOdaSil')
			.setLabel('KANALLARI SİL')
			.setStyle('DANGER'),	
			)]		
			})
	}
	if(interaction.customId === "ÖzelOdaİzinVer"){
	const özelOdaİzin = await new Modal() 
	.setCustomId('kullanıcıİzinPanel')
	.setTitle(`${interaction.guild.name} Özel Oda İzin Verme`)
	.addComponents(
	  new TextInputComponent() 
	  .setCustomId('kullanıcıİzin')
	  .setLabel("İZİN VERMEK İSTEDİĞİNİZ KULLANICI ID'SI?")
	  .setStyle('SHORT') 
	  .setMinLength(18)
	  .setMaxLength(18)
	  .setPlaceholder('Örn: 339855245599309824')
	  .setRequired(true)
	)
	await showModal(özelOdaİzin, {
		client: client, 
		interaction: interaction 
	  })		
	}	
	if(interaction.customId === "ÖzelOdaİzinSil"){
		const özelOdaYasakla = await new Modal() 
		.setCustomId('kullanıcıYasakPanel')
		.setTitle(`${interaction.guild.name} Özel Oda Yasaklama`)
		.addComponents(
		  new TextInputComponent() 
		  .setCustomId('kullanıcıYasak')
		  .setLabel("Yasaklamak İSTEDİĞİNİZ KULLANICI ID'SI?")
		  .setStyle('SHORT') 
		  .setMinLength(18)
		  .setMaxLength(18)
		  .setPlaceholder('Örn: 339855245599309824')
		  .setRequired(true)
		)
		await showModal(özelOdaYasakla, {
			client: client, 
			interaction: interaction 
		  })		
	}
});

client.on('modalSubmit',async (modal) => {
	if(modal.customId === 'GurluOzelOdaPanel'){
		const odaName = modal.getTextInputValue('odaName')
		const odaGizli = modal.getTextInputValue('odaGizli')
		let kilitD = ""
			if(odaGizli === "evet"){kilitD = true}else{kilitD = false}
		await modal.deferReply({ ephemeral: true })	
		modal.member.guild.channels.create(`${odaName}`,{type: 'GUILD_VOICE',}).then(async sesKanalı => {
			await sesKanalı.setParent(modal.channel.parentId)
			await sesKanalı.permissionOverwrites.edit(modal.member, {VIEW_CHANNEL:true, CONNECT:true, SPEAK:true, MUTE_MEMBERS:true, DEAFEN_MEMBERS:true, STREAM:true, USE_VAD:true})
			await sesKanalı.permissionOverwrites.edit(modal.member.guild.roles.cache.get(modal.member.guild.id), {VIEW_CHANNEL:true, CONNECT:kilitD, SPEAK:true, STREAM:true, USE_VAD:true})				
			await modal.member.guild.channels.create(`${odaName}`,{type: 'GUILD_TEXT'}).then(async mesajKanalı =>{
				await mesajKanalı.setParent(modal.channel.parentId)
				await mesajKanalı.edit({topic: `${modal.member.id}_${sesKanalı.id}`})
				await mesajKanalı.permissionOverwrites.edit(modal.member, {VIEW_CHANNEL:true, SEND_MESSAGES:false, MENTION_EVERYONE: false, READ_MESSAGE_HISTORY:true})
					const row = await new MessageActionRow()
					if(kilitD === true){
					row.addComponents(	
					new MessageButton()
					.setCustomId('ÖzelOdaGizli')
					.setLabel('(SES) Kanalı herkese gizli yap.')
					.setStyle('PRIMARY'),	
					new MessageButton()
					.setCustomId('ÖzelOdaİzinVer')
					.setLabel('Kullanıcı izni ver')
					.setStyle('PRIMARY'),						
					new MessageButton()
					.setCustomId('ÖzelOdaİzinSil')
					.setLabel('Kullanıcı yasakla')
					.setStyle('PRIMARY'),						
					new MessageButton()
					.setCustomId('ÖzelOdaSil')
					.setLabel('KANALLARI SİL')
					.setStyle('DANGER'),	
					);	
					}else{
					row.addComponents(	
					new MessageButton()
					.setCustomId('ÖzelOdaAcik')
					.setLabel('(SES) Kanalı herkese açık yap.')
					.setStyle('PRIMARY'),
					new MessageButton()
					.setCustomId('ÖzelOdaİzinVer')
					.setLabel('Kullanıcı izni ver')
					.setStyle('PRIMARY'),						
					new MessageButton()
					.setCustomId('ÖzelOdaİzinSil')
					.setLabel('Kullanıcı yasakla')
					.setStyle('PRIMARY'),						
					new MessageButton()
					.setCustomId('ÖzelOdaSil')
					.setLabel('KANALLARI SİL')
					.setStyle('DANGER'),	
					);		
					}						
				await mesajKanalı.send({content: `Kanalına hoş geldin, ${modal.member}!\n\n• Kanal herkese açıksa, yasaklı kullanıcılar odana giremez.\n• Kanal kilitliyse, sadece izinli kullanıcılar odana girebilir.\n• Sesli kanalınız 3 dakika boyunca boş kalırsa silinir.`, components: [row]})
				await modal.followUp({ content: `Ses kanalınız başarıyla oluşturuldu: ${sesKanalı}.\nKanalınızı kontrol edin/yönetin: ${mesajKanalı}`, ephemeral: true })				
			})
		})			
	}
	if(modal.customId === 'kullanıcıİzinPanel'){
		const izinID = modal.getTextInputValue('kullanıcıİzin')
		await modal.deferReply({ ephemeral: true })	
		if(isNaN(izinID)) return modal.followUp({content: `Kullanıcı ID'si sadece sayılardan oluşabilir.`, ephemeral: true});
		if(!modal.channel.topic) return  modal.followUp({content: `Yanlış giden bir şeyler oldu.`, ephemeral: true});
		let izinliKullanıcı = await modal.member.guild.members.cache.get(izinID)
		if(!izinliKullanıcı) return modal.followUp({content: `Bu kullanıcı sunucuda bulunmuyor.`, ephemeral: true})
		let sesKanalımID = await modal.channel.topic.split("_")[1]
		let sesKanalım = await modal.member.guild.channels.cache.get(sesKanalımID)
		if(!sesKanalım) return modal.followUp({content: `Ses kanalını bulamadım, bir yetkiliye durumunu belirtin.`})
		await sesKanalım.permissionOverwrites.edit(izinliKullanıcı, {CONNECT:true})
		modal.followUp({content: `${izinliKullanıcı} üyesine izin verildi.`})
	}
	if(modal.customId === 'kullanıcıYasakPanel'){
		const izinID = modal.getTextInputValue('kullanıcıYasak')
		await modal.deferReply({ ephemeral: true })	
		if(isNaN(izinID)) return modal.followUp({content: `Kullanıcı ID'si sadece sayılardan oluşabilir.`, ephemeral: true});
		if(!modal.channel.topic) return  modal.followUp({content: `Yanlış giden bir şeyler oldu.`, ephemeral: true});
		let izinliKullanıcı = await modal.member.guild.members.cache.get(izinID)
		if(!izinliKullanıcı) return modal.followUp({content: `Bu kullanıcı sunucuda bulunmuyor.`, ephemeral: true})
		let sesKanalımID = await modal.channel.topic.split("_")[1]
		let sesKanalım = await modal.member.guild.channels.cache.get(sesKanalımID)
		if(!sesKanalım) return modal.followUp({content: `Ses kanalını bulamadım, bir yetkiliye durumunu belirtin.`})
		await sesKanalım.permissionOverwrites.edit(izinliKullanıcı, {CONNECT:false})
		await modal.followUp({content: `${izinliKullanıcı} üyesi yasaklandı.`})
	}
})
const kategoriID = "1038162754953023500" //Özel odaların oluşturulduğu kategori id'si
setInterval(function() {
	client.channels.cache.forEach(sc => {
		if(sc.type === "GUILD_VOICE" && sc.parentId === kategoriID && sc.members.size === 0){
			sc.delete().then(kanal =>{
				kanal.guild.channels.cache.forEach(sc => {
					if(sc.type === "GUILD_TEXT" && sc.parentId === kategoriID && sc.topic && sc.topic.includes(kanal.id)){
						sc.delete()
					}
				})
			})
		}
	})
}, 180000)

const { Modal, TextInputComponent, showModal } = require('discord-modals') 
require('discord-modals')(client);  

//afk-sistem
const { QuickDB3 } = require("quick.db");
const db3 = new QuickDB();

client.on("messageCreate", async msg => {
	if(msg.author.bot) return;
  if(msg.content.startsWith("!afk")) return; 
  let afk = msg.mentions.users.first()
  if(await db.get("afklar."+msg.author.id+".sebep")){ 
	await msg.reply({embeds: [new MessageEmbed().setColor("GREEN").setDescription(`**Artık AFK değilsin. İyi eğlenceler.**`)]}).then(msg => {setTimeout(() => {msg.delete().catch((err) => { })}, 10000)})
	await db.delete("afklar."+msg.author.id+".sebep")
	let nickname = await msg.member.nickname || await msg.author.username 
	if(!nickname.includes("[AFK]")) return;
	await msg.member.setNickname(`${nickname.split("[AFK]")[1]}`)
	if(!afk) return;
	if(!await db.get("afklar."+afk.id+".sebep")) return;
	let sebebi = await db.get("afklar."+afk.id+".sebep")
	await msg.reply({embeds: [new MessageEmbed().setColor("RANDOM").setDescription(`${afk}, bir süredir AFK.\n**Sebep:** ${sebebi}`)]}).then(msg => {setTimeout(() => {msg.delete().catch((err) => { })}, 10000)})
  }else{
	if(!afk) return;
	if(!await db.get("afklar."+afk.id+".sebep")) return;
	let sebebi = await db.get("afklar."+afk.id+".sebep")
	await msg.reply({embeds: [new MessageEmbed().setColor("RANDOM").setDescription(`${afk}, bir süredir AFK.\n**Sebep:** ${sebebi}`)]}).then(msg => {setTimeout(() => {msg.delete().catch((err) => { })}, 10000)})
  }
})