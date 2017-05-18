/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

/**
 * @namespace
 */
let FontLoader;
ADCore.FontLoader = {};

/**
 * @method LoadFonts
 * @memberof Fonts
 * @static
 */
ADCore.FontLoader.LoadFonts = function () {
	WebFont.load({
		custom: {
			families: Config.Fonts.families,
			urls: Config.Fonts.urls
		}
	});
};