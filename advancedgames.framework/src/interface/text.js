var ADCore = ADCore || {};

ADCore.Text = ( function () {

    /**
     * 'Text'
     */
    function Text() {
        this._text = '';
        this._position = new Vector2();
        this._anchor = new Vector2();

        this._fontName = 'Arial';
        this._fontSize = 10;
        
        this._params = {};
    }
    var p = Text.prototype;
    /**'
     * 'position'
     * @returns {vector2}
     * @param {vector2} 'vector'
     */
    p.position = function ( vector ) {
        this._position = vector;
        return this;
    };

    /**'
     * 'value'
     * @returns {value}
     * @param {value} 'val'
     */
    p.value = function ( val ) {
        this.value = val;
        return this;
    };

     /**'
     * 'font'
     * @returns {fontname}
     * @param {name} 'name'
     */
    p.font = function ( name ) {
        this._fontName = name;
        return this;
    };
    
    /**'
     * 'weight'
     * @returns {fontWeight}
     * @param {value} 'value'
     */
    p.weight = function ( value ) {
        this._params.fontWeight = value;
        return this;
    };

    /**'
     * 'size'
     * @returns {size}
     * @param {size} 'size'
     */
    p.size = function ( size ) {
        this._fontSize = size;
        return this;
    };
   
    /**'
     * 'color'
     * @returns {color}
     * @param {color} 'color'
     */
    p.color = function ( color ) {
        this._params.fill = color;
        return this;
    };

    /**'
     * 'anchor'
     * @returns {vector2}
     * @param {vector2} 'colvectoror'
     */
    p.anchor = function ( vector ) {
        this._anchor = vector;
        return this;
    };

    /**'
     * 'wrap'
     * @returns {size}
     * @param {size} 'size'
     */
    p.wrap = function ( size ) {
        this._params.wordWrap = true;
        this._params.wordWrapWidth = size;
        this._params.lineHeight = this._fontSize * 0.85;
        this._params.padding = 10;
        return this;
    };

    /**'
     * 'finish'
     * @returns {text}
     */
    p.finish = function () {
        this._params.font = this._fontSize + "px " + this._fontName;

        var text = new Phaser.Text( CDC.phaser, this._position.x, this._position.y, this._text, this._params );
        text.anchor.set( this._anchor.x, this._anchor.y );

        return text;
    };

    return Text;
}() );
 