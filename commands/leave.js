const discord = require('discord.js');

module.exports.run = async (bot, message, args, ops) => {
    try{
        if(!message.member.voicechannel){return(message.channel.send('ERROR: Your not connected to a voice chat'))}
        if(!message.guild.me.voicechannel){return(message.channel.send('ERROR: I am not connected to a voice channel'))}
        if(message.memebr.voicechannel !== message.guild.me.voicechannel){message.channel.send('ERROR: Your not in my voice channel')}
        await message.guild.me.voicechannel.leave();
        message.channel.send('Success: I have left the voice channel')
    }catch(err){
        return(message.channel.send('ERROR: An unexpected error has occured'), console.log(err));
    }
}

module.exports.help = {
    name: 'leave',
    description: 'Usage: Bot leaves voice channel. Command: <prefix>leave'
}