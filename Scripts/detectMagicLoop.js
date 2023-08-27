game.settings.register('flipper', 'active', {
  config: false,
  scope: 'world',
  type: Boolean,
  default: false
})

let isMagicAround = false

const interval = setInterval(function () {
  detectMagic()
}, 2000);



function detectMagic() {

  let chatContent = ""
  // Remove hardcoded token
  let korgaToken = canvas.tokens.placeables.find(t => t.name === 'Korga');
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
            if (relativeDistance <= spellRange) { isMagicAround = true }
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
        alpha: 0.4,
        angle: 0,
        bright: 0,
        coloration: 1,
        dim: 30,
        gradual: true,
        luminosity: 0.5,
        saturation: 0,
        contrast: 0.25,
        shadows: 0,
        animation: {
          speed: 1,
          intensity: 2,
          reverse: false,
          type: "torch",
        },
        darkness: {
          min: 0,
          max: 1,
        },
        color: "#800080",
      },
    });
  } else {
    await korgaToken.document.update({
      light: {
        alpha: 0.5,
        angle: 0,
        bright: 0,
        color: "#000000",
        coloration: 1,
        dim: 0,
        gradual: true,
        luminosity: 0.5,
        saturation: 0,
        contrast: 0,
        shadows: 0,
        animation: {
          speed: 5,
          intensity: 5,
          reverse: false,
        },
        darkness: {
          min: 0,
          max: 1,
        },
      },
    });
  }
}
