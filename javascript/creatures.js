(function(){
    // CORE CREATURES
    fishcotheque.load(
        "javascript/environment/chat.js",
        "javascript/environment/clock.js",
        "javascript/environment/sea-bg.js",
        "javascript/environment/sea-bed.js",

        fishcotheque.hasSearchParam("dev") ?
            null :
            [
                // COMMUNITY CREATURES
                "creatures/example-fish-1/example-fish-1.js",
                "creatures/example-fish-2/example-fish-2.js"
            ]
        );
}());
