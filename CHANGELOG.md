# Changelog

This changelog contains mostly API-Changes and changes for developers.

## v2.0.0

* Added new configuration-option `logLevel`
* Added logger (`client.logger`) to allow for more detailed logs (instance
  of [log4js.Logger](https://github.com/log4js-node/log4js-node))
* Added `--pm2-setup`-command-argument to indicate an [pm2](https://pm2.keymetrics.io)-setup
* Switched to discord.js version 1.13 which includes breaking changes
* Reworked some configuration-loading and switched to `jsonfile` as a dependencies
* Configuration of every module is now stored in a global client object: `client.configuration[moduleName]`. Please use
  this instead of using `require` as this method allows users to reload configuration.
* Commands are now slash commands. Old commands are not recommended being used, but can be by changing `commands-dir`
  to `message-commands-dir`. Remember, that in future we may remove this feature.
* It's no longer required to add `module` as a config-parameter for every command
* Added `sendMultipleSiteButtonMessage` to `/src/functions/helpers.js` to create fancy multiple-site-embed-messages
* `embedType()` now returns [MessageOptions](https://discord.js.org/#/docs/main/stable/typedef/MessageOptions)
* `footer` can now be set for each embed individually
* `.eslintrc.js` added - please use this configuration if you create a pullrequest
* Added `client.logChannel` ([TextChannel](https://discord.js.org/#/docs/main/stable/class/TextChannel)) which should be
  used as a default for log-channels and in which some relevant information gets sent. ⚠️ In some cases this value
  is `null` so always catch or check the value before any calls on this property.
* Forgot the prefix of your bot? You can now use @-mentions instead of your prefix
* `mesageCommand.config.args` now only (!) accepts an integer which represents how many arguments are at least needed
* Slash-Commands are now available and should be used as much as possible
* Errors in the executing of a command will nun result in a message to the user