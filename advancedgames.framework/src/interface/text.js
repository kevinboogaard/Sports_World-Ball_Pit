/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

ADCore.Text = ( function () {

    /**
     * The class 'Text' is a class that requires a chain of methods in order to work.
     * It is important to finish the chain of methods off with the Finish() method.
     * This function 'builds' the text with the information you gave in the methods after the constructor.
     * Once the text has been 'builded' you can add this as a child.
     * 
     * @class Text
     * @constructor
     */
    function Text() {

        /**
         * Set by the Value() method.
         * 
         * @property {String} _text
         * @private
         * @readonly 
         * @default ""
         */
        this._text = "";

        /**
         * Set by the Position() method.
         * 
         * @property {Vector2} _position
         * @private
         * @readonly 
         * @default Vector2(0,0)
         */
        this._position = new Vector2();

        /**
         * Set by the Anchor() method.
         * 
         * @property {Vector2} _anchor
         * @private
         * @readonly 
         * @default Vector2(0,0)
         */
        this._anchor = new Vector2();

        /**
         * Set by the Font() method.
         * 
         * @property {String} _fontName
         * @private
         * @readonly 
         * @default "Arial"
         */
        this._fontName = "Arial";

        /**
         * Set by the Size() method.
         * 
         * @property {Number} _fontSize
         * @private
         * @readonly 
         * @default 10
         */
        this._fontSize = 10;
        
        /**
         * Other parameters set by methods.
         * 
         * @property {Object} _params
         * @private
         * @readonly 
         * @default Empty
         */
        this._params = {};
    }
    var p = Text.prototype;

    /**
     * @method Position
     * @memberof Text
     * @public
     * @param {Vector2} vector
     * @returns {Text} This object in order to chain function.
     */
    p.Position = function ( vector ) {
        this._position = vector;
        return this;
    };

    /**
     * @method Value
     * @memberof Text
     * @public
     * @param {String} val
     * @returns {Text} This object in order to chain function.
     */
    p.Value = function ( val ) {
        this._text = val;
        return this;
    };

    /**
     * @method Font
     * @memberof Text
     * @public
     * @param {String} name
     * @returns {Text} This object in order to chain function.
     */
    p.Font = function ( name ) {
        this._fontName = name;
        return this;
    };
    
    /**
     * @method Weight
     * @memberof Text
     * @public
     * @param {Number} weight
     * @returns {Text} This object in order to chain function.
     */
    p.Weight = function ( value ) {
        this._params.fontWeight = value;
        return this;
    };

    /**
     * @method Size
     * @memberof Text
     * @public
     * @param {Number} size
     * @returns {Text} This object in order to chain function.
     */
    p.Size = function ( size ) {
        this._fontSize = size;
        return this;
    };
   
    /**
     * @method Color
     * @memberof Text
     * @public
     * @param {Number} color
     * @returns {Text} This object in order to chain function.
     */
    p.Color = function ( color ) {
        this._params.fill = color;
        return this;
    };

    /**
     * @method Anchor
     * @memberof Text
     * @public
     * @param {Vector2} vector
     * @returns {Text} This object in order to chain function.
     */
    p.Anchor = function ( vector ) {
        this._anchor = vector;
        return this;
    };

    /**
     * @method Wrap
     * @memberof Text
     * @public
     * @param {Number} size
     * @returns {Text} This object in order to chain function.
     */
    p.Wrap = function ( size ) {
        this._params.wordWrap = true;
        this._params.wordWrapWidth = size;
        this._params.lineHeight = this._fontSize * 0.85;
        this._params.padding = 10;
        return this;
    };

    /**
     * Call this method on the end of your method chaining. 
     * This way the object can be "build" into a Phaser.Text and this way you can add this as a child.
     * 
     * @method Finish
     * @memberof Text
     * @public
     * @returns {Phaser.Text} The "build" text is a constructed Phaser.Text type. 
     */
    p.Finish = function () {
        this._params.font = this._fontSize + "pt " + this._fontName;

        var text = new Phaser.Text( ADCore.phaser, this._position.x, this._position.y, this._text, this._params );
        text.anchor.set( this._anchor.x, this._anchor.y );

        return text;
    };

    return Text;
}() );
 