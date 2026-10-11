const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
function game(){
  const elements=new Map();
  const make=()=>({textContent:'',children:[],focus(){},replaceChildren(...children){this.children=children;}});
  const document={getElementById(id){if(!elements.has(id))elements.set(id,make());return elements.get(id);},createElement:make};
  vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname,'../game.js'),'utf8'),{document});
  return {text:id=>document.getElementById(id).textContent,choose(label){const button=document.getElementById('choices').children.find(b=>b.textContent===label); assert.ok(button,`Choice exists: ${label}`);button.onclick();},restart(){document.getElementById('restart').onclick();}};
}
test('fox gift leads to the winning ending and restart clears inventory',()=>{const g=game();g.choose('Follow the forest path');g.choose('Approach the fox');g.choose('Head for the river');g.choose('Offer the silver feather');assert.equal(g.text('title'),'A thousand little lights');g.restart();assert.equal(g.text('title'),'The Last Lantern');assert.equal(g.text('inventory'),'An empty lantern');});
test('tower requires the key and reveals the clue when unlocked',()=>{const g=game();g.choose('Follow the forest path');g.choose('Walk to the tower');assert.equal(g.text('title'),'A star in the stone');g.choose('Return to the old well');g.choose('Enter the forest');g.choose('Walk to the tower');assert.equal(g.text('title'),'A promise remembered');assert.match(g.text('inventory'),/Brass key/);});
test('offering a missing item allows recovery',()=>{const g=game();g.choose('Follow the forest path');g.choose('Cross the river');g.choose('Offer the silver feather');assert.equal(g.text('title'),'An empty satchel');g.choose('Find the fox');g.choose('Head for the river');g.choose('Offer the silver feather');assert.equal(g.text('title'),'A thousand little lights');});
test('taking the flame leads to losing ending and replay',()=>{const g=game();g.choose('Follow the forest path');g.choose('Cross the river');g.choose('Try to seize the flame');assert.equal(g.text('title'),'The light slips away');g.choose('Try another path');assert.equal(g.text('title'),'The Last Lantern');});
