const ms = require("ms");
const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
    kick: function(message, args2, time){
    var kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    var kReason = args2.join(" ").slice(22);
    if (kReason === "") {kReason = "undefined"};
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You can't do that!");
    if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That Person can't be kicked!");

    var kickEmbed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor("#00FFFB")
    .addField("Kicked User", `${kUser} with the ID ${kUser.id}`)
    .addField("Moderator", `<@${message.author.id}> with the ID ${message.author.id}`)
    .addField("Kicked", message.channel)
    .addField("Time (GMT +1)", time())
    .addField("Reason", kReason);

    var kickChannel = message.guild.channels.find(`name`, "bot-logs-general");
    if(!kickChannel) return message.channel.send("Please create a Channel called : bot-logs-general");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
    },
    ban: function(message, args2, time){
        var bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user!");
    var bReason = args2.join(" ").slice(22);
    if (bReason === "") {bReason = "undefined"};
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't do that!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That Person can't be banned!");

    var banEmbed = new Discord.RichEmbed()
    .setDescription("Ban")
    .setColor("#00FFFB")
    .addField("Banned User", `${bUser} with the ID ${bUser.id}`)
    .addField("Moderator", `<@${message.author.id}> with the ID ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time (GMT +1)", time())
    .addField("Reason", bReason);

    var incidentchannel = message.guild.channels.find(`name`, "bot-logs-general");
    if(!incidentchannel) return message.channel.send("Please create a Channel called : bot-logs-general");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);


return;
    },
    mute: function(message, args2, time, mute){
        var mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!mUser) return message.channel.send("Can't find user!");
    var mReason = args2.join(" ").slice(22);
    if (mReason === "") {mReason = "undefined"};
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't do that!");
    if(mUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That Person can't be muted!");

    message.guild.channels.forEach( (channel, id) => {
      channel.overwritePermissions(mute, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      })
    });
    message.guild.member(mUser).addRole(mute)
    var muteEmbed = new Discord.RichEmbed()
    .setDescription("Mute")
    .setColor("#00FFFB")
    .addField("Muted User", `${mUser} with the ID ${mUser.id}`)
    .addField("Moderator", `<@${message.author.id}>`)
    .addField("Channel", message.channel)
    .addField("Time (GMT +1)", time())
    .addField("Length", mReason);
    if (!mute) return message.reply('I cannot find a mute role... Please create a Role called: Muted').catch(console.error);
    var muteChannel = message.guild.channels.find(`name`, "bot-logs-general");
    if(!muteChannel) return message.channel.send("Please create a Channel called : bot-logs-general");
    muteChannel.send(muteEmbed);
    return;
    },
    tempmute: function(message, args2, time, mute){
        var tmUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tmUser) return message.channel.send("Can't find user!");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't do that!");
    if(tmUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That Person can't be muted!");

  let mutetime = args2[1];
  if(!mutetime) return message.reply("Du hast keine Zeit angegeben!");

    message.guild.channels.forEach( (channel, id) => {
      channel.overwritePermissions(mute, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      })
    });
  message.guild.member(tmUser).addRole(mute)
  var tmuteEmbed = new Discord.RichEmbed()
  .setDescription("TempMute")
  .setColor("#00FFFB")
  .addField("Muted User", `${tmUser} with the ID ${tmUser.id}`)
  .addField("Moderator", `<@${message.author.id}>`)
  .addField("Channel", message.channel)
  .addField("Time (GMT +1)", time())
  .addField("Length", `${ms(ms(mutetime))}` );

  if (!mute) return message.reply('I cannot find a mute role... Please create a Role called: Muted').catch(console.error);
  var tmuteChannel = message.guild.channels.find(`name`, "bot-logs-general");
  if(!tmuteChannel) return message.channel.send("Please create a Channel called : bot-logs-general");
  tmuteChannel.send(tmuteEmbed);
  setTimeout(function(){
    tmUser.removeRole(mute);
    tmuteChannel.send(`<@${tmUser.id}> wurde Entmutet!`);
}, ms(mutetime));
    },
    tempban: function(message, args2, time){
        var tbUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tbUser) return message.channel.send("Can't find user!");
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You can't do that!");
    if(tbUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That Person can't be banned!");

  let bantime = args2[1];
  if(!bantime) return message.reply("Du hast keine Zeit angegeben!");

  message.guild.member(tbUser).ban();
  var tbanEmbed = new Discord.RichEmbed()
  .setDescription("TempBan")
  .setColor("#00FFFB")
  .addField("Banned User", `${tbUser} with the ID ${tbUser.id}`)
  .addField("Moderator", `<@${message.author.id}>`)
  .addField("Channel", message.channel)
  .addField("Time (GMT +1)", time())
  .addField("Length", `${ms(ms(bantime))}` );

  var tbanChannel = message.guild.channels.find(`name`, "bot-logs-general");
  if(!tbanChannel) return message.channel.send("Please create a Channel called : bot-logs-general");
  tbanChannel.send(tbanEmbed);
  setTimeout(function(){
    message.guild.unban(tbUser);
    tbanChannel.send(`<@${tbUser.id}> is Unbanned!`);
}, ms(bantime));
    },
    unmute: function(message, mute){
        var umUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!umUser) return message.channel.send("Can't find user!");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't do that!");
    
    if (!mute) return message.reply('I cannot find a mute role... Please create a Role called: Muted').catch(console.error);
    var umuteChannel = message.guild.channels.find(`name`, "bot-logs-general");
    if(!umuteChannel) return message.channel.send("Please create a Channel called : bot-logs-general");

    message.guild.member(umUser).removeRole(mute);
    umuteChannel.send(`<@${umUser.id}> is unmuted`);

    return;
    },
    warn: function(message, args2, time){
        var wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!wUser) return message.channel.send("Couldn't find user.");
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't do that!");
        if(wUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That Person can't be warned!");
        var wreason = args2.join(" ").slice(22);
        if (wreason === "") {wreason = "undefined"};
      
        var warnEmbed = new Discord.RichEmbed()
        .setDescription("Warnung")
        .setColor("#00FFFB")
        .addField("Warned User", `${wUser} with the ID ${wUser.id}`)
        .addField("Moderator", `${message.author}`)
        .addField("Channel", message.channel)
        .addField("Time (GMT +1)", time())
        .addField("Reason", wreason);
      
        var rerportschannel = message.guild.channels.find(`name`, "bot-logs-general");
        if(!rerportschannel) return message.channel.send("Please create a Channel called : bot-logs-general");
      
      
        rerportschannel.send(warnEmbed);
      
      return;
    },
    sinfo: function(message){
        var sicon = message.guild.iconURL;
        var serverembed = new Discord.RichEmbed()
        .setDescription("Server Information")
        .setColor("#15f153")
        .setThumbnail(sicon)
        .addField("Server Name", message.guild.name)
        .addField("Created at", message.guild.createdAt)
        .addField("You joined at", message.member.joinedAt)
        .addField("Members", message.guild.memberCount);
    
    return message.channel.send(serverembed);
    }
}