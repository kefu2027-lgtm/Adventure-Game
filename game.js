'use strict';
const scenes = {
  village: {chapter:'01 · The departure', title:'The Last Lantern', text:'Every light in Willowmere has gone out. Beyond the village, a single golden flicker moves through the woods. You take an empty lantern and step into the night.', choices:[['Follow the forest path','forest'],['Search the old well','well']]},
  well: {chapter:'02 · A small discovery', title:'Something in the dark', text:'At the bottom of the old well, a brass key hangs from a ribbon. You pull it free. Its handle bears the same star carved into your lantern.', item:'Brass key', choices:[['Enter the forest','forest']]},
  forest: {chapter:'03 · The fork', title:'The woods are listening', text:'A fox with silver eyes waits where the trail divides. To the east, a bridge crosses a rushing river. To the west, ivy covers the door of an abandoned tower.', choices:[['Approach the fox','fox'],['Walk to the tower','tower'],['Cross the river','river']]},
  fox: {chapter:'04 · An unlikely guide', title:'A gift of moonlight', text:'You hold out your empty lantern. The fox touches it with its nose, then leaves a silver feather at your feet. Across the river, something answers with a golden glow.', item:'Silver feather', choices:[['Head for the river','river'],['Explore the tower','tower']]},
  tower: {chapter:'04 · The locked door', title:'A star in the stone', text:'The tower door is locked. A tiny star marks its brass keyhole. Somewhere in the village, you remember seeing that shape before.', choices:[['Return to the old well','well'],['Go back to the fork','forest']]},
  chamber: {chapter:'05 · The keeper', title:'A promise remembered', text:'The brass key turns. Inside, a mural shows a river spirit holding a silver feather. Beneath it: “Offer a gift freely given, and the light will return.”', choices:[['Find the river spirit','river']]},
  river: {chapter:'05 · The crossing', title:'The river of stars', text:'The bridge has washed away. A spirit rises from the water, cradling the village’s lost flame. “Light cannot be taken,” it whispers. “What will you offer?”', choices:[['Offer the silver feather','offer'],['Ask the fox for help','fox'],['Try to seize the flame','lost']]},
  lost: {chapter:'An ending · Empty hands', title:'The light slips away', text:'Your fingers close on cold mist. The spirit sinks beneath the river, and the forest falls silent. You return home empty-handed, knowing now that some things must be given.', choices:[['Try another path','restart']]},
  win: {chapter:'An ending · Home again', title:'A thousand little lights', text:'The feather becomes a bridge of moonlight. The spirit places its flame inside your lantern. Back in Willowmere, every window warms to gold. Somewhere beyond the trees, a fox smiles.', choices:[['Play again','restart']]},
  missing: {chapter:'05 · The offering', title:'An empty satchel', text:'You reach into your satchel, but there is no feather there. The spirit waits patiently. Perhaps the silver-eyed fox has something to share.', choices:[['Find the fox','fox']]}
};
let inventory = new Set();
function go(destination) {
  if (destination === 'restart') {inventory = new Set(); destination = 'village';}
  if (destination === 'tower' && inventory.has('Brass key')) destination = 'chamber';
  if (destination === 'offer') destination = inventory.has('Silver feather') ? 'win' : 'missing';
  const scene = scenes[destination];
  if (scene.item) inventory.add(scene.item);
  for (const [id,value] of [['chapter',scene.chapter],['title',scene.title],['story',scene.text],['inventory',inventory.size ? [...inventory].join(' · ') : 'An empty lantern']]) document.getElementById(id).textContent=value;
  const choices=document.getElementById('choices');
  choices.replaceChildren(...scene.choices.map(([label,target]) => {const button=document.createElement('button'); button.type='button'; button.textContent=label; button.onclick=()=>{go(target); document.getElementById('title').focus();}; return button;}));
}
document.getElementById('title').tabIndex=-1;
document.getElementById('restart').onclick=()=>go('restart');
go('village');
