const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'kız',
    aliases: ['kız', 'k', 'girl', 'bayan'],
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Łâventâ Kayıt Sistemi');
        let embed2 = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#640032').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Łâventâ Kayıt Sistemi');

        if (!client.config.mods.some(id => message.member.roles.cache.has(id))) {
            return message.channel.send(embed.setDescription("Komutu kullanan kullanıcıda yetki bulunmamakta."))
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenmedi."))

        let name = args[1]
        if (!name) return message.channel.send(embed.setDescription("Kayıt Etmek için İsim Yazmalısın."))

        {}
        message.guild.members.cache.get(member.id).setNickname(`${name}`)
        db.push(`isimler_${member.id}`,`${name}`);
        db.set(`kayıt_${member.id}`, true)
        db.add(`kız_${message.author.id}`, 1)
        await message.guild.members.cache.get(member.id).roles.remove(client.config.unregisteres)
        await message.guild.members.cache.get(member.id).roles.add(client.config.girlroles  )
        message.channel.send(embed2.setDescription(`${member} adlı kullanıcı \`${name}\` Olarak Kayıt Edildi.)`)
                             
        )
    }
}