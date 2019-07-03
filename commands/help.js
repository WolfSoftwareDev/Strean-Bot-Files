const discord = require('discord.js');

module.exports.run = async (bot, message, args, ops) => {
    try{
        var jsfile = global.jsfile
        var embed = new discord.RichEmbed()
        .setTitle('Help Page')
        .setColor('#EEEEE');
        jsfile.forEach((f, i)=>{
            let props = require(`../commands/${f}`);
            if(props.help && props.help.name && props.help.description){
                embed.addField(props.help.name, props.help.description);
            }
        });
        message.channel.send(embed);
    }catch(err){
        return(message.channel.send('ERROR: An unexpected error has occured'), console.log(err));
    }
}

module.exports.help = {
    name: 'help',
    description: 'Usage: shows help page. Command: <prefix>help'
}