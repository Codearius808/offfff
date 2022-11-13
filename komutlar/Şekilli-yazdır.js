const figlet = require('figlet');
const chalk = require('chalk');
module.exports = {
calistir: async(client, message, args, prefix) => {
	if (!message.member.permissions.has("ADMINISTRATOR")) return
	if(!args[0]) return message.reply({content: `:x: **Mesaj içeriğini giriniz.**`});
	figlet(args.slice(0).join(' '), function(err, data) {
		if (err) {
		console.log('hata var kontrol edin (ready)');
		console.dir(err);
		return;
		}
		message.reply({content: "```"+data+"```"});
	});
},

name: "yazdır",
description: "",
aliases: [],
usage: "",
}