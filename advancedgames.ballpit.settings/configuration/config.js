var Config = {};

/**
 * Phaser.AUTO: 0,
 * Phaser.CANVAS: 1,
 * Phaser.WEBGL: 2,
 * Phaser.HEADLESS: 3.
 */
Config.Core = {};
Config.Core.Dimensions = { width: 360, height: 640 }; 
Config.Core.Renderer = 0;
Config.Core.Parent = "Container";

Config.ResourceLists = {
    "GENERIC": [
        { "key":"images", "type": "resourcelist", "path":"advancedgames.ballpit.settings/resources/generic/images.json"},
        { "key":"spritesheets", "type": "atlaslist", "path":"advancedgames.ballpit.settings/resources/generic/spritesheets.json"}
    ],
    "LEVELS": [
        [
          { "key":"map", "type": "map", "path":"advancedgames.ballpit.settings/resources/levels/level_1/map.json"},
          { "key":"tasks", "type": "json", "path":"advancedgames.ballpit.settings/resources/levels/level_1/tasks.json"}
        ]
    ]
};