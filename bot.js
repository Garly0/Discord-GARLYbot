const Discord = require("discord.js");
const client = new Discord.Client();
const { MessageEmbed } = require("discord.js");

let welcomeMessageEnabled = false;
const guildSettings = {};

client.on('ready', async () => {
    console.log(`Bot aktifleştirildi`);
    client.user.setActivity(`?yardım`)
});

client.on('message', msg => {
    if (msg.content.toLowerCase() === 'sa') {
        msg.channel.send('as');
    }
});

client.on('message', message => {
    if (message.content === '?yardım') {
        const embed = new Discord.MessageEmbed()
            .setTitle('YARDIM')
            .setColor('#8600ff')
            .addField('?kullanıcı-bilgi', 'Kullanıcı bilgilerini gösterir.')
            .addField("?sunucu-bilgi", "Sunucunun bilgilerini gösterir.")
            .addField("?güncelleme", "En son güncellemeyi göster.")
            .addField('?yardım-yönetim', 'Sadece yöneticinizin yapabildiği kodları gösterir.')

    

        message.channel.send(embed);
    }})

    client.on('message', message => {
        // ?reklam-engelle komutunu işle
        if (message.content === '?reklam-engelle') {
            // Sunucu sahibi mi kontrol et
            if (!message.guild || message.author.id !== message.guild.ownerID) {
                message.channel.send('Bu komut sadece sunucu sahibi tarafından kullanılabilir.');
                return;
            }
    
            // Sunucu sahibinin reklam engelleme ayarlarını sakla
            const guildId = message.guild.id;
            // Eğer ayarlar henüz tanımlanmamışsa, varsayılan olarak kapalı olarak ayarla
            if (!guildSettings[guildId]) {
                guildSettings[guildId] = false;
            }
            // Reklam engelleme durumunu tersine çevir ve ayarı güncelle
            guildSettings[guildId] = !guildSettings[guildId];
    
            const status = guildSettings[guildId] ? '**AÇIK**' : '**KAPALI**';
            message.channel.send(`Reklam engelleme şu anda ${status}.`);
        }
    
        // Engellenmesi istenen kelimeleri buraya ekleyin
        const bannedWords = ['http', 'https', "www", "discord.gg"];
    
        // Mesajın gönderildiği sunucunun reklam engelleme ayarlarını alın
        const guild = message.guild;
        if (!guild) return;
    
        const settings = getGuildSettings(guild);
    
        // Eğer reklam engelleme açıksa ve mesaj sunucu sahibine ait değilse
        if (settings.adBlockEnabled && message.author.id !== guild.ownerID) {
            // Mesaj içeriğini küçük harfe çevirin ve yasaklanmış kelimeleri kontrol edin
            const content = message.content.toLowerCase();
            if (bannedWords.some(word => content.includes(word))) {
                // Yasaklanmış kelimeleri içeren bir mesaj gönderilirse, mesajı silin
                if (!content.includes('tenor.com')) {
                    message.delete();
                    message.channel.send(`Reklam içeren bir mesaj gönderemezsiniz, ${message.author}`);
                }
            }
        }
    });
    
    // Sunucunun reklam engelleme ayarlarını almak için bir fonksiyon
    function getGuildSettings(guild) {
        const guildId = guild.id;
        // Bu kısım sizin botunuzun sunucu ayarlarını nasıl sakladığına bağlı olacaktır
        // Örneğin, bir veritabanında saklanabilir
        // Eğer ayarlar henüz tanımlanmamışsa, varsayılan olarak kapalı olarak döndür
        if (!guildSettings[guildId]) {
            guildSettings[guildId] = false;
        }
        return {
            adBlockEnabled: guildSettings[guildId], // Reklam engelleme açık mı?
            // Diğer ayarlar buraya eklenebilir
        };
    }

client.on('message', message => {
  if (message.content === '?kullanıcı-bilgi') {
      const user = message.author;
      const member = message.guild.member(user);

      const displayName = user.username !== member.displayName ? member.displayName : user.username;

      // Mesajın oluşturulma tarihini alırken getTime() fonksiyonunu kullanın
      const ping = Math.abs(Date.now() - message.createdAt.getTime());

      const embed = new MessageEmbed()
          .setColor('#0d00ff')
          .setTitle(`${user.username}'in Bilgileri`)
          .setThumbnail(user.displayAvatarURL())
          .addField('Kullanıcı Adı', user.username, true)
          .addField('ID', user.id, true)
          .addField('Hesap Oluşturma Tarihi', user.createdAt.toLocaleDateString(), true)
          .addField('Sunucuya Katılma Tarihi', member.joinedAt.toLocaleDateString(), true)
          .addField('Roller', member.roles.cache.map(role => role.name).join(', '), true)
          .addField('Ping', `${ping}ms`, true);

      message.channel.send(embed);
  }
});

client.on('message', message => {
    if (message.content === '?yardım-yönetim') {
        // Sunucu sahibi mi kontrol edilir
        if (message.author.id !== message.guild.ownerID) {
            message.channel.send('Bu komutu sadece sunucu sahibi kullanabilir.');
            return;
        }

        const embed = new Discord.MessageEmbed()
            .setTitle('YÖNETİM-YARDIM')
            .setColor('#0099ff')
            .addField('?reklam-engelle', 'Reklam engelleyiciyi açar veya kapatır.')
            .addField("?üye-sayacı", "Üye sayaçını açar veya kapatır.")
            .addField("?hoşgeldin-mesajı", "Hoşgeldin mesajı açar veya kapatır.")

        message.channel.send(embed);
    }
});

client.on('message', message => {
    if (message.content === '?güncelleme') {
        const embed2 = new Discord.MessageEmbed()
            .setTitle('GÜNCELLEMELER')
            .setColor('#00ff0d')
            .addField('Henüz hiç güncelleme yok.', 'Henüz hiç güncelleme yok.')
            .setFooter('Garlybot v1.0.0');



        message.channel.send(embed2);
    }});

    client.on('message', message => {
        if (message.content === '?sunucu-bilgi') {
            // Sunucunun bilgilerini al
            const guild = message.guild;
    
            // Sunucunun sahibini al
            const guildOwner = guild.owner.user.username;
    
            // Sunucunun ID'sini al
            const guildID = guild.id;
    
            // Sunucunun oluşturulma tarihini al
            const guildCreationDate = guild.createdAt.toLocaleDateString();
    
            // Sunucudaki üye sayısını al
            const totalMembers = guild.memberCount;
    
            // Sunucudaki bot sayısını al
            const botCount = guild.members.cache.filter(member => member.user.bot).size;
    
            // Sunucudaki gerçek kullanıcı sayısını hesapla
            const realUserCount = totalMembers - botCount;
            const guildName = guild.name;
    
            // Sunucudaki çevrimiçi üye sayısını ve çevrimdışı üye sayısını hesapla
            const onlineMembers = guild.members.cache.filter(member => member.presence.status !== 'offline' && !member.user.bot).size;

                    // Sunucunun profil fotoğrafını al
            const guildIcon = guild.iconURL();


            const offlineMembers = realUserCount - onlineMembers;
    
            // Sunucu bilgilerini embed olarak gönder
            const embed = new Discord.MessageEmbed()
                .setTitle('Sunucu Bilgileri')
                .setColor('e4ff00')
                .addField('Sunucu Sahibi', guildOwner, true)
                .addField('Sunucu ID', guildID, true)
                .addField('Oluşturulma Tarihi', guildCreationDate, true)
                .setThumbnail(guildIcon)
                .addField('Toplam Üye', totalMembers, true)
                .addField('Çevrimiçi Üye', onlineMembers, true)
                .addField('Bot Sayısı', botCount, true)
                .addField('Çevrimdışı Üye', offlineMembers, true)
                .addField('Sunucu İsmi', guildName);
    
            message.channel.send(embed);
        }
    });

    client.on('message', async message => {
        if (message.content === '?üye-sayacı') {
        if (message.author.id !== message.guild.ownerID) {
            message.channel.send('Bu komutu sadece sunucu sahibi kullanabilir.');
            return;
        }
            const guild = message.guild;
            const channelName = '▬▬▬▬ ÜYE SAYISI ▬▬▬▬';
    
            // Kontrol etmek için önceden oluşturulmuş bir kanal var mı?
            const existingChannel = guild.channels.cache.find(channel => channel.name === channelName && channel.type === 'category');
    
            // Eğer kanal varsa, sunucu sahibi onu ve içindeki ses kanalını silsin
            if (existingChannel) {
                try {
                    existingChannel.children.forEach(channel => {
                        channel.delete();
                    });
                    existingChannel.delete();
                    message.channel.send('Üye sayacı **KAPALI**');
                } catch (err) {
                    console.error('Hata:', err);
                    message.channel.send('Üye sayacı kaldırılırken bir hata oluştu.');
                }
                return;
            }
    
            // Kanal yoksa, yeni bir kategori ve içindeki ses kanalını oluştur
            try {
                const category = await guild.channels.create(channelName, { type: 'category' });
    
                const totalMembers = guild.memberCount;
    
                const voiceChannel = await guild.channels.create(`ÜYE: ${totalMembers}`, {
                    type: 'voice',
                    parent: category,
                    permissionOverwrites: [
                        {
                            id: guild.id,
                            deny: ['CONNECT'],
                        },
                    ],
                });
    
                message.channel.send('Üye sayacı **AÇIK**');
            } catch (err) {
                console.error('Hata:', err);
                message.channel.send('Üye sayacı oluşturulurken bir hata oluştu.');
            }
        }
    });
    client.on('guildMemberAdd', async member => {
        updateMemberCount(member.guild);
    });
    
    client.on('guildMemberRemove', async member => {
        updateMemberCount(member.guild);
    });
    
    async function updateMemberCount(guild) {
        const channelName = '▬▬▬▬ ÜYE SAYISI ▬▬▬▬';
        const category = guild.channels.cache.find(channel => channel.name === channelName && channel.type === 'category');
    
        if (category) {
            const totalMembers = guild.memberCount;
            const voiceChannel = category.children.find(channel => channel.type === 'voice');
    
            if (voiceChannel) {
                try {
                    await voiceChannel.setName(`ÜYE: ${totalMembers}`);
                } catch (error) {
                    console.error('Üye sayacı güncellenirken bir hata oluştu:', error);
                }
            }
        }
    }


    client.on('guildMemberAdd', member => {
        // Eğer hoşgeldin mesajı açıksa
        if (welcomeMessageEnabled) {
            // Hoşgeldin mesajını gönder
            member.send('HOŞGELDİN KNKS');
        }
    });
    
    client.on('message', message => {
        // ?hoşgeldin-mesajı komutunu işle
        if (message.content === '?hoşgeldin-mesajı') {
            // Sunucu sahibi mi kontrol et
            if (!message.guild || message.author.id !== message.guild.ownerID) {
                message.channel.send('Bu komut sadece sunucu sahibi tarafından kullanılabilir.');
                return;
            }
    
            // Komutun açık/kapalı durumunu güncelle
            welcomeMessageEnabled = !welcomeMessageEnabled;
    
            const status = welcomeMessageEnabled ? '**açık**' : '**kapalı**';
            message.channel.send(`Hoşgeldin mesajı şu anda ${status}.`);
        }
    })

client.login(' ');