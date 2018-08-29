const Discord = require('discord.js');
const client = new Discord.Client();
const functions = require("./functions.js")
module.exports = {
    helpping: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Ping Help`);
        embed.setDescription(`Sends you your Ping`);
        embed.addField("Usage example", `(ping`, true);
        embed.setFooter(`${functions.branch} by JPlexer ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helppong: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Pong Help`);
        embed.setDescription(`Sends you your Pong (Happend when i made the Ping Command Wrong)`);
        embed.addField("Usage example", `(pong`, true);
        embed.setFooter(`${functions.branch} by JPlexer ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helppizza: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Pizza Help`);
        embed.setDescription(`Gives you a Pizza`);
        embed.addField("Usage example", `(pizza`, true);
        embed.setFooter(`${functions.branch} by JPlexer ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helpkick: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Kick Help`);
        embed.setDescription(`Kicks a User`);
        embed.addField("Usage example", `(kick @JPlexer Annoying\n(kick @JPlexer`, true);

        embed.setFooter(`${functions.branch} by JPlexer ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helpban: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Ban Help`);
        embed.setDescription(`Bans a User`);
        embed.addField("Usage example", `(ban @JPlexer Annoying AF\n (ban @JPlexer`, true);

        embed.setFooter(`${functions.branch} by JPlexer ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helpmute: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Mute Help`);
        embed.setDescription(`Mutes a User)`);
        embed.addField("Usage example", `(mute @JPlexer Spam\n (mute @JPlexer`, true);

        embed.setFooter(`${functions.branch} by JPlexer ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helptempmute: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`TempMute Help`);
        embed.setDescription(`Mutes a User for a Period of Time`);
        embed.addField("Usage example", `(tempmute @JPlexer 1m\n (tempmute @JPlexer 2H`, true);

        embed.setFooter(`${functions.branch} by JPlexer ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helptempban: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`TempBan Help`);
        embed.setDescription(`Bans a User for a Period of Time`);
        embed.addField("Usage example", `(tempban @JPlexer 1m\n (tempban @JPlexer 2H`, true);

        embed.setFooter(`${functions.branch} by JPlexer ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helpunmute: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`UnMute Help`);
        embed.setDescription(`Unmutes a User`);
        embed.addField("Usage example", `(unmute @JPlexer`, true);

        embed.setFooter(`${functions.branch} by JPlexer ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helpwarn: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Warn Help`);
        embed.setDescription(`Warns a User`);
        embed.addField("Usage example", `(warn @JPlexer Spam`, true);

        embed.setFooter(`${functions.branch} by JPlexer ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helpsinfo: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`SInfo Help`);
        embed.setDescription(`Shows you some Server Infos`);
        embed.addField("Usage example", `(sinfo`, true);

        embed.setFooter(`${functions.branch} by JPlexer ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helpplay: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Play Help`);
        embed.setDescription(`Plays Music`);
        embed.addField("Usage example", `(play Xenogenisis\n(play https://www.youtube.com/watch?v=DLzxrzFCyOs`, true);

        embed.setFooter(`${functions.branch} by JPlexer ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helpskip: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Skip Help`);
        embed.setDescription(`Skips a Song`);
        embed.addField("Usage example", `(skip`, true);

        embed.setFooter(`${functions.branch} by JPlexer ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helpqueue: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Queue Help`);
        embed.setDescription(`Shows all the Song`);
        embed.addField("Usage example", `(queue`, true);

        embed.setFooter(`${functions.branch} by JPlexer ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helpstop: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Stop Help`);
        embed.setDescription(`Stops all Songs`);
        embed.addField("Usage example", `(stop`, true);

        embed.setFooter(`${functions.branch} by JPlexer ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
    helpclear: function (message) {
        embed = new Discord.RichEmbed();
        embed.setColor("#00FFFB");
        embed.setAuthor(`Clear Help`);
        embed.setDescription(`Deletes all Songs from the Queue`);
        embed.addField("Usage example", `(clear`, true);

        embed.setFooter(`${functions.branch} by JPlexer ${functions.botver}`);
        message.channel.send("", {
          embed
        });
        return true;
    },
}