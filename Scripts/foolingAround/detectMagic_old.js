
let chatContent = ""
let magicAround = false
let korgaToken = canvas.tokens.placeables.find(t => t.name === 'Korga');
let spellRange = 30

// Basic scale and distance variables
const gridScaleFactor = canvas.grid.grid.options.dimensions.distance / canvas.grid.grid.options.dimensions.size;
let relativeDistanceX, relativeDistanceY, relativeDistance;

for(const token of canvas.tokens.placeables) {
  //let traits = []
  //for(const trait of token.actor.traits) {
  //  traits.push(trait)
  //}
  //chatContent += `<p>${t.actor.name} - ${t.actor.type}</p>`
  // Find all loot tokens, go through the Inventory in them and find all items with the magical trait. If found, calculate the distance
  if(token.actor.type == "loot") {
    for(const inv of token.actor.inventory) {
      for(const loot of inv.traits) {
        if(loot == "magical") {
          relativeDistanceX = Math.abs(korgaToken.center.x - token.center.x);
          relativeDistanceY = Math.abs(korgaToken.center.y - token.center.y);
          relativeDistance = Math.floor(Math.sqrt(relativeDistanceX ** 2 + relativeDistanceY ** 2) * gridScaleFactor);
          
          if(relativeDistance <= spellRange) {
            magicAround = true
          }
        }
      }
    }
  }
}

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


/*
const characterName = "Korga";
const range = 120;
const targetNamePart = "desk";

const actorPC = game.actors.getName(characterName);
const tokenPC = actorPC.getActiveTokens()[0];
const gridScaleFactor = canvas.grid.grid.options.dimensions.distance / canvas.grid.grid.options.dimensions.size;

let relativeDistanceX, relativeDistanceY, relativeDistance;
for (let token of canvas.tokens.children[0].children) {
    console.log(token.name)
    if (token !== tokenPC && token.name.toLowerCase().includes(targetNamePart)) {
        relativeDistanceX = Math.abs(tokenPC.center.x - token.center.x);
        relativeDistanceY = Math.abs(tokenPC.center.y - token.center.y);
        relativeDistance = Math.floor(Math.sqrt(relativeDistanceX ** 2 + relativeDistanceY ** 2) * gridScaleFactor);
        let text;
        if (relativeDistance <= range) {
            text = `There's an ${targetNamePart} within ${range} feet of you!`;
        } else {
            text = `No ${targetNamePart}s within ${range} feet detected.`;
        }
        ChatMessage.create({user: game.user.id, speaker: game.user, content: text},{});
    }
}

canvas.tokens.releaseAll();
*/
