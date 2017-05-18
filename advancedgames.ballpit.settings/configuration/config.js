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

Config.Fonts = {
	families: ["comfortaa", "dsdigi"],
	urls: ["advancedgames.ballpit.game/fonts/fonts.css"]
};

Config.ResourceLists = {
    "CORE": [
        { "key":"images", "type": "resourcelist", "path":"advancedgames.ballpit.settings/resources/core/images.json"}
    ],
    "GENERIC": [
        { "key":"images", "type": "resourcelist", "path":"advancedgames.ballpit.settings/resources/generic/images.json"},
        { "key":"spritesheets", "type": "atlaslist", "path":"advancedgames.ballpit.settings/resources/generic/spritesheets.json"},
        { "key":"sounds", "type": "resourcelist", "path":"advancedgames.ballpit.settings/resources/generic/sounds.json"}
    ],
    "LEVELS": [
        [
          { "key":"map", "type": "map", "path":"advancedgames.ballpit.settings/resources/levels/level_tutorial/map.json"},
          { "key":"tasks", "type": "json", "path":"advancedgames.ballpit.settings/resources/levels/level_tutorial/tasks.json"},
          { "key":"images", "type": "resourcelist", "path":"advancedgames.ballpit.settings/resources/levels/level_tutorial/images.json"}
        ],
        [
          { "key":"map", "type": "map", "path":"advancedgames.ballpit.settings/resources/levels/level_1/map.json"},
          { "key":"tasks", "type": "json", "path":"advancedgames.ballpit.settings/resources/levels/level_1/tasks.json"},
          { "key":"sounds", "type": "resourcelist", "path":"advancedgames.ballpit.settings/resources/levels/level_1/sounds.json"}
        ]
    ]
};