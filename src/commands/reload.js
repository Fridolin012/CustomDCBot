const {reloadConfig} = require('../functions/configuration');
const {syncCommandsIfNeeded} = require('../../main');

module.exports.run = async function (interaction) {
    await interaction.reply({
        ephemeral: true,
        content: 'Reloading your configuration... This could take a while...'
    });
    if (interaction.client.logChannel) interaction.client.logChannel.send(`🔄 ${interaction.user.tag} is reloading the configuration...`);
    await reloadConfig(interaction.client).catch((async reason => {
        if (interaction.client.logChannel) interaction.client.logChannel.send(`⚠️ Configuration reloaded failed. Bot shutting down`);
        await interaction.editReply({content: `**FAILED**\n\`\`\`${reason}\`\`\`\n**Please read your log to fnd more information**\nThe bot will kill itself now, bye :wave:`});
        process.exit(1);
    })).then(async () => {
        if (interaction.client.logChannel) interaction.client.logChannel.send(`✅ Configuration reloaded successfully.`);
        await interaction.editReply('Configuration reloaded successfully, syncing commands, to make sure permissions are up-to-date...');
        await syncCommandsIfNeeded();
        await interaction.editReply('Configuration reloaded successfully and synced commands successfully');
    });
};

module.exports.config = {
    name: 'reload',
    description: 'Reloads the configuration',
    restricted: true
};