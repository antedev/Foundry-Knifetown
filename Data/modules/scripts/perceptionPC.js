let actorPCs = []

canvas.tokens.releaseAll();
for(const t of canvas.tokens.placeables) {
    if(t.actor?.hasPlayerOwner) actorPCs.push(t.actor)
}

let chatContent = ""

for(i in actorPCs) {
    let r = await new Roll(`1d20 + ${actorPCs[i].attributes.perception.value}`).roll()
    chatContent +=  `<p>${actorPCs[i].name.split(" ")[0]} rolled a ${r.result} for a ${r.total}</p>`
}

ChatMessage.create({
    speaker: {
      alias: "Secret Perception roll"
    },
    content: chatContent,
    whisper: ChatMessage.getWhisperRecipients("Gamemaster")
  })
