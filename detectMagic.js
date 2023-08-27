/*
game.settings.register('detectionOn', 'active', {
    config: false,
    scope: 'world',
    type: Boolean,
    default: false
  })
*/

game.settings.register('detectionOn', 'id', {
    config: false,
    scope: 'world',
    type: Number,
    default: 0
})

let korgaToken = canvas.tokens.placeables.find(t => t.name === 'Korga');
// Turn it on if it's not on
if (game.settings.get('detectionOn', 'id') > 0) {
    let updateHookId = Hooks.on("updateToken", (token, changes) => {
        //console.log(game.settings.get('detectionOn', 'active'))
        if (changes.x > 0 || changes.y > 0) {
            // The token has moved
            console.log("Update check");
            if (game.settings.get('detectionOn', 'id') > 0) {
                setMagicAura(detectMagic())
            }
        }
    });
    game.settings.set('detectionOn', updateHookId)
} else {
    // Shut it off 
    console.log("NO more detection")
    Hooks.off('updateToken', game.settings.get('detectionOn', id))
    game.settings.set('detectionOn', 0)
}

console.log(updateHookId)

/*
else {
    // Remove hook
    setMagicAura(false)
    Hooks.off("updateToken", this.onUpdateToken)
}

onUpdateToken = (token, changes) => {
    console.log(token, changes);
    if (changes.x > 0 || changes.y > 0) {
        // The token has moved
        setMagicAura(detectMagic()) 
    }
};
*/

/*
const interval = setInterval(function () {
    detectMagic()
}, 2000);
*/


function detectMagic() {

    let spellRange = 30

    // Basic scale and distance variables
    const gridScaleFactor = canvas.grid.grid.options.dimensions.distance / canvas.grid.grid.options.dimensions.size;
    let relativeDistanceX, relativeDistanceY, relativeDistance;

    for (const token of canvas.tokens.placeables) {

        // Find all loot tokens, go through the Inventory in them and find all items with the magical trait. If found, calculate the distance
        if (token.actor.type == "loot") {
            for (const inv of token.actor.inventory) {
                for (const loot of inv.traits) {
                    if (loot == "magical") {
                        relativeDistanceX = Math.abs(korgaToken.center.x - token.center.x);
                        relativeDistanceY = Math.abs(korgaToken.center.y - token.center.y);
                        relativeDistance = Math.floor(Math.sqrt(relativeDistanceX ** 2 + relativeDistanceY ** 2) * gridScaleFactor);

                        // There is magic around!
                        if (relativeDistance <= spellRange) { 
                            console.log("We got magic loot!")
                            return true 
                        } else {
                            console.log("No magix")
                        }
                    }
                }
            }
        }
    }
}

async function setMagicAura(magicAround) {
    if (magicAround) {
        await korgaToken.document.update({
            light: {
                color: "#800080",
                dim: 30,
                animation: {
                    speed: 1,
                    intensity: 2,
                    reverse: false,
                    type: "torch",
                },
            },
        });
    } else {
        await korgaToken.document.update({
            light: {
                color: "#000000",
                dim: 0,
                animation: {
                    speed: 5,
                    intensity: 5,
                    reverse: false,
                },
                
            },
        });
    }
}
