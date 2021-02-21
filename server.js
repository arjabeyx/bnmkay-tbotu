const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const db = require('quick.db');
const moment = require('moment')
require('moment-duration-format')
const commands = client.commands = new Discord.Collection();
const aliases = client.aliases = new Discord.Collection();

fs.readdirSync('./commands', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/commands/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})



//  WATCHING  : !ping izliyor
//  LISTENING : !ping dinliyor
//  PLAYING   : !ping oynuyor 
//  STREAMING : !ping yayında
////----------------------- READY KISMI -----------------------\\\\
client.on('ready', () => {
    client.user.setPresence({ activity: { name: '.e @Etiket İsim & .k @Etiket İsim' }, status: 'online' })
    client.channels.cache.get('806952752659693568').join() // ses kanalı İD
    console.log(`Bot ${client.user.tag} Adı İle Giriş Yaptı!`);
  })
////----------------------- CONFIG KISMI -----------------------\\\\
client.config = {
    unregisteres: ['750085717199290439'], // kayıtsız
    maleRoles: ['750085246833393786'], // erkek
    girlroles: ['792834180316135447'], // bayan
    mods: ["792842781261168680"], // yetkili
    channelID: '792832706491711490', // kayıt kanalı
    yönetim: ['730139293661659397'] // üst yönetim
}
////----------------------- PREFİX KISMI -----------------------\\\\
client.on('message', message => {
    const prefix = ".";// prefix
    if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return;
    cmd.run(client, message, args)
})
////----------------------- HEM ETİKET HEMDE TAG ROL KISMI -----------------------\\\\
client.on("userUpdate", async function(oldUser, newUser) { // kod codaredan alınıp editlenmiştir!
    const guildID = "670734416275963916"//sunucu
    const roleID = "792846820342366248"//taglırolü
    const tag = "≶"//tag
    const chat = '793391350707650570'// chat
    const log2 = '791047865928646686' // log kanalı
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    const embed = new Discord.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp().setFooter('Łâventâ Tag Sistemi');
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(` ${newUser} İsminden \`Tagımızı\` Çıkartarak Ailemizden Ayrıldı.`))
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(chat).send(`${newUser}, Tagımızı alarak ailemize katıldı,\nOna sıcak bir **'Merhaba!'** diyin. (${tag})`)
            client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser} İsmine \`Tagımızı\` Ekleyerek Ailemize Katıldı.`))
        }
    }
   if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == "0041" && newUser.discriminator !== "0041") {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(`${newUser} Etiketinden \`0041\` Çıkartarak Ailemizden Ayrıldı.`))
        } else if (oldUser.discriminator !== "0041" && newUser.discriminator == "0041") {
            member.roles.add(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(`${newUser} Etiketine \`0041\` Ekleyerek Ailemize Katıldı.`))
            client.channels.cache.get(chat).send(`${newUser}, Etiketi yazarak ailemize katıldı,\nOna sıcak bir **'Merhaba!'** diyin. (#0041)`)
        }
    }
  
  })

////----------------------- HOŞGELDİN MESAJI KISMI -----------------------\\\\
client.on('guildMemberAdd', (member) => {

    const mapping = {
        " ": "",
        "0": "", // sayı iDleri
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
        "8": "",
        "9": "",
    };
    var toplamüye = member.guild.memberCount
    var emotoplamüye = `${toplamüye}`.split("").map(c => mapping[c] || c).join("")
    let memberDay = (Date.now() - member.user.createdTimestamp);
    let createAt = moment.duration(memberDay).format("Y [Yıl], M [ay], W [hafta], DD [gün]")
    let createAt2 = moment.duration(memberDay).format("DD [gün], HH [saat], mm [dakika]")
    if (memberDay > 604800000) {
        client.channels.cache.get(client.config.channelID).send(`
**≶ | Łâventâ #2021**
**Ailemize hoşgeldin;** ${member}
• Hesap Bilgisi: **${createAt}**
• Seninle birlikte toplam **${emotoplamüye}** kişiyiz.
• Kayıt olmak için Teyit odalarına girip teyit vermelisin.

•  Kayıt olduktan sonra **Kuralları** okumayı unutma. 
<@&792842781261168680> Rolündeki ekibimiz seninle ilgilenecektir.`)
    } else {
        client.channels.cache.get(client.config.channelID).send(
            new Discord.MessageEmbed()
            .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
            .setDescription(`${member}, Adlı Kullanıcı Sunucuya Katıldı Hesabı **${createAt2}** Önce Açıldığı İçin Şüpheli!`)
            .setTimestamp()
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setFooter(`Łâventâ Hizmet.`))
    }
})

////----------------------- TAG MESAJ KISMI -----------------------\\\\
client.on('message', msg => {
    if (msg.content === '!tag') {
        msg.channel.send(`≶`); // tagı yazınız
    } else if (msg.content === 'tag') {
        msg.channel.send(`≶`); // tagı yazınız
    } else if (msg.content === 'Tag') {
        msg.channel.send(`≶`);// tagı yazınız
    } else if (msg.content === '.tag') {
        msg.channel.send(`≶`);// tagı yazınız
    } else if (msg.content === ".rol-ver") {
        msg.guild.members.cache.forEach(x => {
            x.roles.add("≶")
        })
    }
});


client.login(process.env.token);