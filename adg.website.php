<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Sports world: Ball pit</title>
        <meta name="viewport" content="width=device-width">

        <?php foreach (glob("advancedgames.ballpit.website/css/*.css") as $filename) { ?>
            <link rel="stylesheet" href="<?php echo $filename ?>"/>
        <?php } ?>

        <?php foreach (glob("plugins/website/*.js") as $filename) { ?>
            <script src="<?php echo $filename ?>"></script>
        <?php } ?>
    </head>

    <body style="overflow: hidden">
		<div id="sw-container">
			<div id="sw-sky">
                <div class="sw-cloud-holder">
                    <div class="sw-cloud i1 right" style="top: 20px; left: -2000px;"></div>
                    <div class="sw-cloud i2 right" style="top: 100px; left: -1000px;"></div>
                    <div class="sw-cloud i3 right" style="top: 150px;"></div>
                </div>

                <div class="sw-zeppelin left" style="bottom: 560px;"></div>
                
                <div class="sw-building-holder">	
                    <div id="sw-building-rugby"></div>
                    <div id="sw-building-tower"></div>
                    <div id="sw-building-soccer"></div>
                    <div id="sw-building-bowling"></div>
                    <div id="sw-building-stadium"></div>
                </div>

                <div id="sw-grass-bg">
                    <div id="sw-grass-fg"></div>
                </div>
			</div>
		</div>
        
        <div id="bp-container">
                <div id="bp-holder">
                    <iframe frameborder="0" scrolling="no" src="adg.ballpit.php"></iframe>
                </div>
        </div>
		
        <?php foreach (glob("advancedgames.ballpit.website/js/*.js") as $filename) { ?>
            <script src="<?php echo $filename ?>"></script>
        <?php } ?>
    </body>
</html>