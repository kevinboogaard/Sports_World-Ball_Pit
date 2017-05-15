$( document ).ready( sw_init );
$( window ).resize( sw_init );

function sw_init () {
	sw_draw();
	sw_animate();
}

function sw_draw () {
	var innerWidth = window.innerWidth;
	var innerHeight = window.innerHeight;

	var sw_container = document.getElementById("sw-container");
	sw_container.style.width = innerWidth + "px";
	sw_container.style.height = innerHeight + "px";
}

function sw_animate () {
	CustomEase.create("element-ease", "M0,0 C0.266,0.412 0.297,0.489 0.426,0.61 0.44,0.623 0.561,0.891 0.722,1 0.722,1 0.996,1 1,1")

	var sw_zeppelins = document.getElementsByClassName("sw-zeppelin");
	var zep_len = sw_zeppelins.length;

	for (var i = 0; i < zep_len; i++) {
		var zeppelin = sw_zeppelins[i];
		animate_element(zeppelin, 60);
	}

	var sw_clouds = document.getElementsByClassName("sw-cloud");
	var cloud_len = sw_clouds.length;

	for (var j = 0; j < cloud_len; j++) {
		var cloud = sw_clouds[j];
		animate_element(cloud, 30 * (j + 1));
	}
}

function animate_element (element, delay) {
		var innerWidth = window.innerWidth;

		if (element.className.indexOf("right") > -1) {
			TweenLite.to( element, delay, { 
				left: innerWidth + $(element).width(),
				ease: "element-ease",
				onComplete: function() { 
					element.style.left = ( -$(this).width() ) + "px";
					animate_element(this, delay);
				}.bind(element)
			});
		} else {
			// Default is Left.
			TweenLite.to( element, delay, { 
				left: 0 - $(element).width(),
				ease: "element-ease",
				onComplete: function() { 
					this.style.left = ( innerWidth + $(this).width() ) + "px";
					animate_element(this, delay);
				}.bind(element)
			});
		}
}