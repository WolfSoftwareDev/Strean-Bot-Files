const discord = require('discord.js');

module.exports.run = async (bot, message, args, ops) => {
    try{
        message.channel.send(`Bots Connection to the API: ${Math.round(bot.ping)}ms`);
    }catch (err) {
        return(message.channel.send('ERROR: An unexpected error has occured', console.log(err)));
    }
}

module.exports.help = {
    name:'ping',
    description:'Usage: Shows bots ping. Command: <prefix>ping'
}