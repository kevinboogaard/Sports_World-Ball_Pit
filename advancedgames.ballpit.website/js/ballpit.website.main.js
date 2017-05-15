$( document ).ready( bp_init );
$( window ).resize( bp_init );

function bp_init () {
	bp_draw();
}

function bp_draw () {
	var innerWidth = window.innerWidth;
	var innerHeight = window.innerHeight;

    var bp_container = document.getElementById("bp-container");

    var bp_holder = document.getElementById("bp-holder");
    bp_holder.style.left = 0 + "px";
    bp_holder.style.top = 0 + "px";
}