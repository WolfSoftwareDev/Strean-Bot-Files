const discord = require('discord.js');

module.exports.run = async (bot, message, args, ops) => {
    try{
        if(!message.member.voicechannel){return(message.channel.send('ERROR: Your not in a voice channel.'))}
        await message.member.voicechannel.join();
        message.channel.send('Success: I have connected to the voice channel');
    }catch(err){
        return(message.channel.send('ERROR: An unexpected error has occured'), console.log(err));
    }
}

module.exports.help = {
    name: 'play',
    description: 'Usage: Bot connects to a voice channel. Command: <prefix>play'
}