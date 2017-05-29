<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Sports world: Ball pit</title>
        <meta name="viewport" content="width=device-width">

        <style>
            body {
                margin: 0;
            }

            canvas {
                width: 100%;
                height: 100%;
            }
        </style>
        
        <script src="plugins/game/phaser.js"></script>
        <script src="plugins/game/webfont.js"></script>
        
        <script src="plugins/website/jquery-3.2.1.min.js"></script>
        <script src="plugins/website/tweenlite.min.js"></script>
        <script src="plugins/website/tweenlite.easepack.min.js"></script>
        <script src="plugins/website/tweenlite.customease.min.js"></script>

        <script src="advancedgames.framework/src/utilities/utilities.js"></script>
        <script src="advancedgames.framework/src/utilities/rephraser.js"></script>

        <script src="advancedgames.framework/src/math/vector2.js"></script>
        <script src="advancedgames.framework/src/math/timer.js"></script>
        <script src="advancedgames.framework/src/math/stopwatch.js"></script>

        <script src="advancedgames.framework/src/debugging/debug.js"></script>

        <script src="advancedgames.framework/src/factories/entityfactory.js"></script>
        
        <script src="advancedgames.framework/src/containers/countercontainer.js"></script>
        <script src="advancedgames.framework/src/containers/popupcontainer.js"></script>

        <script src="advancedgames.framework/src/systems/eventlistener/listener.js"></script>

        <script src="advancedgames.framework/src/systems/pathfinding/astar.js"></script>

        <script src="advancedgames.framework/src/systems/loadersystem/preloader.js"></script>
        <script src="advancedgames.framework/src/systems/loadersystem/sceneloader.js"></script>
        <script src="advancedgames.framework/src/systems/loadersystem/fontloader.js"></script>
        
        <script src="advancedgames.framework/src/systems/inputsystem/inputtypes.js"></script>
        <script src="advancedgames.framework/src/systems/inputsystem/inputsystem.js"></script>

        <script src="advancedgames.framework/src/systems/rendering/viewcontainer.js"></script>
        <script src="advancedgames.framework/src/systems/pausesystem/pausesystem.js"></script>
        <script src="advancedgames.framework/src/systems/soundsystem/soundsystem.js"></script>

        <script src="advancedgames.framework/src/systems/tilesystem/tilemap.js"></script>
        <script src="advancedgames.framework/src/systems/tilesystem/tiled/tileset.js"></script>
        <script src="advancedgames.framework/src/systems/tilesystem/tiled/tilelayer.js"></script>
        <script src="advancedgames.framework/src/systems/tilesystem/tiled/imagelayer.js"></script>
        <script src="advancedgames.framework/src/systems/tilesystem/tiled/objectlayer.js"></script>

        <script src="advancedgames.framework/src/entities/entity.js"></script>
        <script src="advancedgames.framework/src/entities/tilemodel.js"></script>
        <script src="advancedgames.framework/src/displays/sprite.js"></script>
        <script src="advancedgames.framework/src/displays/display.js"></script>

        <script src="advancedgames.framework/src/interface/interface.js"></script>
        <script src="advancedgames.framework/src/interface/button.js"></script>
        <script src="advancedgames.framework/src/interface/text.js"></script>
        <script src="advancedgames.framework/src/interface/popup.js"></script>
        <script src="advancedgames.framework/src/interface/slider.js"></script>

        <script src="advancedgames.framework/src/displays/tileview.js"></script>

        <script src="advancedgames.framework/src/post.js"></script>
        <script src="advancedgames.framework/core.js"></script>

        <script src="advancedgames.ballpit.settings/global.js"></script>
        <script src="advancedgames.ballpit.settings/configuration/config.js"></script>
        <script src="advancedgames.ballpit.settings/configuration/settings.js"></script>

        <script src="advancedgames.ballpit.game/src/scenes/alex.scenes/gridscene.js"></script>
        <script src="advancedgames.ballpit.game/src/scenes/kevin.scenes/uiscene.js"></script>
        <script src="advancedgames.ballpit.game/src/scenes/kevin.scenes/tutorialscene.js"></script>
        <script src="advancedgames.ballpit.game/src/scenes/kevin.scenes/coachscene.js"></script>

        <script src="advancedgames.ballpit.game/src/scenes/mainmenu.js"></script>
        <script src="advancedgames.ballpit.game/src/scenes/game.js"></script>
        <script src="advancedgames.ballpit.game/src/scenes/preloader.js"></script>
        <script src="advancedgames.ballpit.game/src/scenes/tutorial.js"></script>
        <script src="advancedgames.ballpit.game/src/scenes/highscore.js"></script>

        <script src="advancedgames.ballpit.game/src/entities/models/ballmodel.js"></script>
        <script src="advancedgames.ballpit.game/src/entities/models/coachmodel.js"></script>
        <script src="advancedgames.ballpit.game/src/entities/views/ballview.js"></script>
        <script src="advancedgames.ballpit.game/src/entities/views/coachview.js"></script>
        
        <script src="advancedgames.ballpit.game/src/interface/interfacelayer.js"></script>
        <script src="advancedgames.ballpit.game/src/interface/speech.js"></script>
        <script src="advancedgames.ballpit.game/src/interface/infobar.js"></script>
        <script src="advancedgames.ballpit.game/src/interface/tasks/taskboard.js"></script>

        <script src="advancedgames.ballpit.game/src/interface/popups/pausepopup.js"></script>
        <script src="advancedgames.ballpit.game/src/interface/popups/optionspopup.js"></script>
        <script src="advancedgames.ballpit.game/src/interface/popups/finishpopup.js"></script>

        <script src="advancedgames.ballpit.game/src/levelloader.js"></script>
        <script src="advancedgames.ballpit.game/src/ballpit.js"></script>

        <script src="advancedgames.ballpit.game/src/containers/ballcontainer.js"></script>  
        <script src="advancedgames.ballpit.game/src/controllers/ballcontroller.js"></script>     
        <script src="advancedgames.ballpit.game/src/helpers/ballhelper.js"></script>       
        <script src="advancedgames.ballpit.game/src/holders/scoreholder.js"></script> 

        <script src="advancedgames.ballpit.game/src/factories/entityfactory.js"></script>       
        <script src="advancedgames.ballpit.game/src/handlers/taskhandler.js"></script>   

        <script src="advancedgames.ballpit.settings/debugging/debugsettings.js"></script>
        <script src="advancedgames.ballpit.settings/debugging/debugcommands.js"></script>

        <script src="advancedgames.ballpit.settings/environments/environment.js"></script>
        <script src="advancedgames.ballpit.game/src/adgserver.js"></script>
    </head>

    <body>
        <script src="advancedgames.ballpit.game/main.js"></script>
    </body>
</html>
