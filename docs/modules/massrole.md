# Massrole

Manage roles for multiple users at once.

<ModuleOverview moduleName="massrole" />

## Features {#features}

*   Assign a specific role to all server members, only bots, or only human users.
*   Remove a specific role from all server members, only bots, or only human users.
*   Remove all manageable roles from all server members, only bots, or only human users.
*   Restrict command usage to server administrators and/or pre-configured roles.
*   Customizable success and failure messages.

## Setup {#setup}

*   **Bot Permissions:** Ensure your bot has the "Manage Roles" permission in your server settings. This is crucial for the module to function correctly.
*   **Command Authorization:**
    *   By default, only users with "Administrator" server permissions can use the `/massrole` commands.
    *   To allow other roles to use these commands, you need to configure the `adminRoles` array in the module's `config.json` file. See the [Configuration](#configuration) section for details on how to add role IDs.
*   **Module Activation:** The `massrole` module is generally active if it's present in your bot's module directory. No specific per-module enable/disable command is typically associated with it beyond the bot's overall module loading mechanism.

## Usage {#usage}

To use the `massrole` module, you will utilize its slash commands. Ensure you meet the permission requirements mentioned in the [Setup](#setup) section.

**Key Considerations:**

*   The bot cannot manage roles that are higher in the server's role hierarchy than its own highest role.
*   When using the `remove-all` subcommand, be particularly careful as it can affect a large number of users. Always double-check your `target` selection.
*   The `target` option defaults to `all` if not specified.

**Examples:**

*   **To add the "Verified" role to all human users:**
    `/massrole add role:@Verified target:humans`

*   **To remove the "TempRole" from all bots:**
    `/massrole remove role:@TempRole target:bots`

*   **To add the "EventParticipant" role to everyone (all users and bots):**
    `/massrole add role:@EventParticipant target:all`
    or simply:
    `/massrole add role:@EventParticipant`

*   **To remove all manageable roles from all users and bots:**
    `/massrole remove-all target:all`
    or simply:
    `/massrole remove-all`

## Commands {#commands}

<SlashCommandExplanation />

| Command                                           | Description                                                                                                                               |
|---------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `/massrole add role:<Role> [target:<Target>]`     | Adds the specified `Role` to the chosen `Target`. `Target` can be `all`, `bots`, or `humans`. Defaults to `all` if not specified.            |
| `/massrole remove role:<Role> [target:<Target>]`  | Removes the specified `Role` from the chosen `Target`. `Target` can be `all`, `bots`, or `humans`. Defaults to `all` if not specified.       |
| `/massrole remove-all [target:<Target>]`          | Removes all manageable roles from the chosen `Target`. `Target` can be `all`, `bots`, or `humans`. Defaults to `all` if not specified.     |

## Configuration {#configuration}

The `massrole` module offers configuration through two JSON files located in `modules/massrole/configs/`.

### `config.json`

This file primarily handles command permissions. You can typically access and edit this file via your bot's dashboard or directly in the file system.
[Open `config.json` in your Dashboard](https://scnx.app/glink?page=bot/configuration?query=massrole&file=massrole|config.json) (Note: This link is a placeholder and assumes SCNX dashboard integration similar to the example.)

| Field         | Description                                                                                                                                                              | Default | Type                |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|---------------------|
| `adminRoles`  | An array of Role IDs. Users possessing any of these roles can use the `/massrole` commands, in addition to users with server Administrator permissions. To get a Role ID, enable Developer Mode in Discord, right-click the role, and select "Copy ID". | `[]`    | Array (of Strings)  |

**Example `config.json`:**
```json
{
  "description": {
    "en": "Configure the function of the module here",
    "de": "Stelle hier die Funktionen des Modules ein"
  },
  "humanName": {
    "en": "Configuration",
    "de": "Konfiguration"
  },
  "filename": "config.json",
  "commandsWarnings": {
    "special": [
      {
        "name": "/massrole",
        "info": {
          "en": "You need to first set the permissions in your server settings for this command and after that add them under "adminRoles" here.",
          "de": "Du musst zuerst die Rechte in deinen Server-Einstellungen einstellen und danach diese unter "AdminRollen" hinzufügen."
        }
      }
    ]
  },
  "content": [
    {
      "name": "adminRoles",
      "humanName": {
        "de": "Adminrollen"
      },
      "default": {
        "en": [],
        "de": []
      },
      "description": {
        "en": "Every role that can use the massrole command",
        "de": "Jede Rolle, welche den Massrole command verwenden kann"
      },
      "type": "array",
      "content": "roleID"
    }
  ]
}
```

### `strings.json`

This file allows you to customize the messages displayed by the module.
[Open `strings.json` in your Dashboard](https://scnx.app/glink?page=bot/configuration?query=massrole&file=massrole|strings.json) (Note: This link is a placeholder.)

| String Key | Description                                                                                                                               | Default (English)                                                                 |
|------------|-------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| `done`     | Message sent when a `/massrole` command is executed successfully.                                                                         | "The action was executed successfully."                                           |
| `notDone`  | Message sent when a `/massrole` command could not be fully executed (e.g., due to the bot having insufficient permissions for some members). | "The Action couldn't be executed because the bot has not enough permissions."     |

**Example `strings.json`:**
```json
{
  "description": {
    "en": "Edit the messages and strings of the module here",
    "de": "Stelle hier die Nachrichten des Modules ein"
  },
  "humanName": {
    "en": "Messages",
    "de": "Nachrichten"
  },
  "commandsWarnings": {
    "normal": [
      "/massrole"
    ]
  },
  "filename": "strings.json",
  "content": [
    {
      "name": "done",
      "humanName": {
        "en": "Action executed",
        "de": "Aktion ausgeführt"
      },
      "default": {
        "en": "The action was executed successfully.",
        "de": "Die Aktion wurde erfolgreich ausgeführt."
      },
      "description": {
        "en": "This messages gets send when a action was executed successfully",
        "de": "Diese Nachricht wird verschickt, wenn eine Akton erfolgreich ausgeführt wurde"
      },
      "type": "string",
      "allowEmbed": true
    },
    {
      "name": "notDone",
      "humanName": {
        "en": "Action not executed",
        "de": "Aktion nicht ausgeführt"
      },
      "default": {
        "en": "The Action couldn't be executed because the bot has not enough permissions.",
        "de": "Die Aktion konnte nicht vollständig ausgeführt werden, da der Bot nicht genug Rechte hat."
      },
      "description": {
        "en": "This messages gets send when a action was not executed successfully",
        "de": "Diese Nachricht wird verschickt, wenn eine Aktion nicht erfolgreich ausgeführt wurde"
      },
      "type": "string",
      "allowEmbed": true
    }
  ]
}
```

## Troubleshooting {#troubleshooting}

If you encounter issues while using the `massrole` module, check the following:

*   **Bot Permissions:**
    *   Ensure the bot has the "Manage Roles" permission in your server's settings. This is the most common reason for commands failing.
    *   The bot's highest role must be above the role it is trying to assign or remove. Bots cannot manage roles equal to or higher than their own highest role.
*   **User Permissions:**
    *   The user executing the command must have "Administrator" permission in the server OR a role that is listed in the `adminRoles` array in the module's `config.json`.
*   **Command Inputs:**
    *   Double-check that the role mentioned in the command exists and is correctly spelled/identified.
    *   Ensure the `target` parameter, if used, is one of the valid options: `all`, `bots`, or `humans`.
*   **Configuration Files:**
    *   Verify that `config.json` and `strings.json` are correctly formatted JSON. Errors in these files might prevent the module from loading or functioning correctly. Consult your bot's console or logs for any JSON parsing errors.
*   **Bot Restart:** If you've recently changed configurations or bot permissions, a restart of the bot might be necessary for changes to take full effect, depending on your bot's architecture.

## Stored Data {#data-usage}

The `massrole` module primarily operates in real-time and **does not store any persistent data about users, their roles, or specific actions taken on them.**

*   **Role Assignments/Removals:** When you use a `massrole` command, the module fetches the current list of server members and their roles directly from Discord, performs the requested action (add/remove role), and does not save a record of this specific transaction within its own database.
*   **Configuration Files:**
    *   `config.json`: Stores the list of `adminRoles` authorized to use the commands. This file contains role IDs but no individual user data.
    *   `strings.json`: Stores the customizable text for messages like `done` and `notDone`. This contains no user-specific data.

These configuration files are part of the bot's general module setup and do not change based on individual command usage or target users.

There is no module-specific database or logging of individual mass role operations that would require data purging related to user privacy beyond what is inherently logged by Discord itself (e.g., audit logs, if enabled for role changes).
