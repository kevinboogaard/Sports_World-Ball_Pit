if (typeof Debug !== "undefined" && Debug.ENABLED) {

    /**
     * DebugCommands
     * This will work if Debug.Enabled is set to true on start.
     * Set in 'help' your commands.
     */
    Object.defineProperties(this, {
        "help": {
            get: function () {
                return "Debug Commands:" + "\n" +
                       "---------------" + "\n \n" +
                       "Get: exp | Example" + "\n" + 
                       "Set: addscore | addscore(100)" + "\n";
            }
        },
        "exp": {
            get: function () {
                return "HELLO WORLD!";
            }
        }
    });
} else if (typeof Debug === "undefined") {
    throw new Error("Load DebugCommands.js after Debug Initialization not before.");
}