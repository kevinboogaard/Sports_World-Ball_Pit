var ADCore = ADCore || {};

ADCore.SoundSystem = (function () {

   
    function SoundSystem(soundManager) {
        this.soundManager = soundManager;

        this.activeSounds = [];
        this.pausedSounds = [];  

        this.sounds = [];
    }
    var p = SoundSystem.prototype;

    p.Load = function (list) {
        for ( var key in list ) {
            if ( list.hasOwnProperty( key ) ) {
                this.soundManager.add(key);
                this.sounds.push(key);
            }
        }
    };

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
            var index = this.pausedSounds.indexOf(identifier);
            var pausedSound = this.pausedSounds[index];

            sound.audio = pausedSound.audio;
            sound.audio.play();

            this.pausedSounds.splice(index, 1);

        } else {
            sound.audio = this.soundManager.play(key, volume, loop);
        }
        
        if (typeof identifier !== "string") sound = identifier;
        this.activeSounds.push(music);
        return sound;
    };

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
            var index = this.pausedSounds.indexOf(identifier);
            var pausedMusic = this.pausedSounds[index];

            music.audio = pausedMusic.audio;
            music.audio.play();

            this.pausedSounds.splice(index, 1);

        } else {
            music.audio = this.soundManager.play(key, volume, loop);
        }
        
        if (typeof identifier !== "string") music = identifier;
        this.activeSounds.push(music);
        return music;
    };

    p.Pause = function (identifier) {
        if (!identifier) throw new Error("Identifier is null/undefined");     
        var key = this._getKeyByIdentifier(identifier);

        if (this._isKeyKnown(key) === false) throw new Error(key + " is not known to the soundSystem."); 
        if (this._isIdentifierPaused(identifier) === true) throw new Error(key + " is already muted");
        if (this._isIdentifierActive(identifier) === false) throw new Error(key + " is not active");

        var index = this.activeSounds.indexOf(identifier);
        var sound = this.activeSounds[index];

        this.activeSounds.splice(index, 1);
        this.pausedSounds.push(sound);

        sound.audio.pause();
    };

    p._isKeyKnown = function (key) {
        var index = this.sounds.indexOf(key);
        return (index !== -1);
    };

    p._isIdentifierPaused = function (identifier) {
        var index = this.pausedSounds.indexOf(identifier);
        return (index !== -1);
    };

    p._isIdentifierActive = function (identifier) {
        var index = this.activeSounds.indexOf(identifier);
        return (index !== -1);
    };

    p._getKeyByIdentifier = function (identifier) {
        var key = "";

        if (typeof identifier === "string") key = identifier;
        else key = identifier.key;

        return key;
    };

    return SoundSystem;
}());