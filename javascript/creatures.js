(function(){
    // CORE CREATURES
    jj.load(
        "javascript/atmosphere.js",
        "javascript/chat.js",
        "javascript/clock.js",
        "javascript/grass.js",
        "javascript/rain.js",
        "javascript/stars.js",
        "javascript/tree.js",

        jj.hasSearchParam("dev") ?
            null :
            [
                // COMMUNITY CREATURES
                "creatures/examples/example-1.js"
            ]
        );
}());
