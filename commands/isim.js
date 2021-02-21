const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'isim',
    aliases: ['isim', 'nick', 'name', 'i'],
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Łâventâ Aile Sunucusu');

        if (!client.config.mods.some(id => message.member.roles.cache.has(id))) {
            return message.channel.send(embed.setDescription("Komutu kullanan kullanıcıda yetki bulunmamakta!"))
        }
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenmedi!"))
      
        let name = args[1]
        if (!name) return message.channel.send(embed.setDescription("Kullanıcı için bi isim yazılmak zorunda!"))

        message.guild.members.cache.get(member.id).setNickname(`${name}`)
        db.push(`isimler_${member.id}`, `${name}\` (isim değiştirme>)`);
        message.channel.send(embed.setDescription(`${member} adlı kullanıcının ismi \`${name}\` olarak değiştirildi`)

        )
    }
}