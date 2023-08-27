

let ZoorbinPercep = game.actors.find(actor => actor.name == "Zoorbin").attributes.perception.value;
let r = await new Roll(`1d20 + ${game.actors.find(actor => actor.name == "Zoorbin").attributes.perception.value}`).roll()

console.log(r.total)

let Msg = `<p>Zoorbin rolled a ${r.total}`

ChatMessage.create({
  speaker: {
    alias: "ME!"
  },
  content: Msg,
  whisper: ChatMessage.getWhisperRecipients("Gamemaster")
})
