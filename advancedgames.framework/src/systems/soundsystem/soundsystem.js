/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

ADCore.SoundSystem = (function () {

    /**
     * @class SoundSystem
     * @constructor
     * @param {Phaser.SoundManager} soundManager
     */
    function SoundSystem(soundManager) {
        /**
         * @property {Phaser.SoundManager} _SoundManager
         * @private
         */
        this._soundManager = soundManager;

        /**
         * @property {Array} _ActiveSounds
         * @private
         */
        this._activeSounds = [];

        /**
         * @property {Array} _PausedSounds
         * @private
         */
        this._pausedSounds = [];  

        /**
         * @property {Array} _Sounds
         * @private
         */
        this._sounds = [];

        /**
         * @property {Array} _ListsLoaded
         * @private
         */
        this._listsLoaded = [];
    }
    var p = SoundSystem.prototype;

    /**
     * Load an object list with the preloaded sounds.
     *
     * @method Load
     * @memberof SoundSystem
     * @public
     * @param {Object} list - Preloaded json list.
     */
    p.Load = function (list) {
        if (this._listsLoaded.indexOf(list) != -1) return;
        else this._listsLoaded.push(list);
        
        for ( var key in list ) {
            if ( list.hasOwnProperty( key ) ) {
                this._soundManager.add(key);
                this._sounds.push(key);
            }
        }
    };

    /**
     * @method PlaySound
     * @memberof SoundSystem
     * @public
     * @param {(Object|String)} identifier - An indentifier that the Sound System works with to indentify the sound. This can either be a key or an object.
     * @param {Integer} volume 
     * @param {Boolean} loop 
     * @returns {Object} identifier that you can use later to pause or remove the sound with.
     */
    p.PlaySound = function (identifier, volume, loop) {
        if (!identifier) throw new Error("Identifier is null/undefined");     
        var key = this._getKeyByIdentifier(identifier);

        if (this._isKeyKnown(key) === false) throw new Error(key + " is not known to the soundSystem."); 
        if (this._isIdentifierActive(identifier) === true) throw new Error(key + " is already playing.");

        var sound = {
            "key": key,
            "volume": volume,
            "loop": loop,
            "audio": null
        };

        if (this._isIdentifierPaused(identifier) === true) {
            var index = this._pausedSounds.indexOf(identifier);
            var pausedSound = this._pausedSounds[index];

            sound.audio = pausedSound.audio;
            sound.audio.play();

            this._pausedSounds.splice(index, 1);

        } else {
            sound.audio = this._soundManager.play(key, volume, loop);
        }
        
        if (typeof identifier !== "string") sound = identifier;
        this._activeSounds.push(music);
        return sound;
    };

    /**
     * @method PlayMusic
     * @memberof SoundSystem
     * @public
     * @param {(Object|String)} identifier - An indentifier that the Sound System works with to indentify the sound. This can either be a key or an object.
     * @param {Integer} volume 
     * @param {Boolean} loop 
     * @returns {Object} identifier that you can use later to pause or remove the sound with.
     */
    p.PlayMusic = function (identifier, volume, loop) {
        if (!identifier) throw new Error("Identifier is null/undefined");     
        var key = this._getKeyByIdentifier(identifier);

        if (this._isKeyKnown(key) === false) throw new Error(key + " is not known to the soundSystem."); 
        if (this._isIdentifierActive(identifier) === true) throw new Error(key + " is already playing.");

        // Create functionality that only one music can be played. Not multiple.

        var music = {
            "key": key,
            "volume": volume,
            "loop": loop,
            "audio": null
        };

        if (this._isIdentifierPaused(identifier) === true) {
            var index = this._pausedSounds.indexOf(identifier);
            var pausedMusic = this._pausedSounds[index];

            music.audio = pausedMusic.audio;
            music.audio.play();

            this._pausedSounds.splice(index, 1);

        } else {
            music.audio = this._soundManager.play(key, volume, loop);
        }
        
        if (typeof identifier !== "string") music = identifier;
        this._activeSounds.push(music);
        return music;
    };

    /**
     * @method Pause
     * @memberof SoundSystem
     * @public
     * @param {(Object|String)} identifier - An indentifier that the Sound System works with to indentify the sound. This can't be a key- only an object.
     */
    p.Pause = function (identifier) {
        if (!identifier) throw new Error("Identifier is null/undefined");     
        var key = this._getKeyByIdentifier(identifier);

        if (this._isKeyKnown(key) === false) throw new Error(key + " is not known to the soundSystem."); 
        if (this._isIdentifierPaused(identifier) === true) throw new Error(key + " is already muted");
        if (this._isIdentifierActive(identifier) === false) throw new Error(key + " is not active");

        var index = this._activeSounds.indexOf(identifier);
        var sound = this._activeSounds[index];

        this._activeSounds.splice(index, 1);
        this._pausedSounds.push(sound);

        sound.audio.pause();
    };

    /**
     * @method _IsKeyKnown
     * @memberof SoundSystem
     * @private
     * @param {String} key
     */
    p._isKeyKnown = function (key) {
        var index = this._sounds.indexOf(key);
        return (index !== -1);
    };

    /**
     * @method _IsIdentifierPaused
     * @memberof SoundSystem
     * @private
     * @param {Object} identifier
     */
    p._isIdentifierPaused = function (identifier) {
        var index = this._pausedSounds.indexOf(identifier);
        return (index !== -1);
    };

    /**
     * @method _IsIdentifierActive
     * @memberof SoundSystem
     * @private
     * @param {Object} identifier
     */
    p._isIdentifierActive = function (identifier) {
        var index = this._activeSounds.indexOf(identifier);
        return (index !== -1);
    };

    /**
     * @method _GetKeyByIdentifier
     * @memberof SoundSystem
     * @private
     * @param {Object} identifier
     * @returns {String} 
     */
    p._getKeyByIdentifier = function (identifier) {
        var key = "";

        if (typeof identifier === "string") key = identifier;
        else key = identifier.key;

        return key;
    };

    return SoundSystem;
}());