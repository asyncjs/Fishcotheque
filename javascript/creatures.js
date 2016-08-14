(function(){
    // CORE CREATURES
    fishcotheque.load(
        "javascript/environment/chat.js",
        "javascript/environment/clock.js",
        "javascript/environment/grass.js",
        "javascript/environment/rain.js",
        "javascript/environment/sky.js",
        "javascript/environment/stars.js",
        "javascript/environment/tree.js",

        fishcotheque.hasSearchParam("dev") ?
            null :
            [
                // COMMUNITY CREATURES
                "creatures/example-fish-1/example-fish-1.js",
                "creatures/example-fish-2/example-fish-2.js"
            ]
        );
}());
