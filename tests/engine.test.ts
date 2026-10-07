import test from 'node:test';
import assert from 'node:assert/strict';
import {MiniEngine} from '../src/minigames/engine.ts';
import {scoreStep,stars} from '../src/core/scoring.ts';
import {validateSave,defaults} from '../src/core/save.ts';
import type {Kind,Step} from '../src/types.ts';
const make=(kind:Kind,target:number):Step=>({id:kind,kind,target,name:kind,hint:'',ingredient:'',par:20,limit:60});
test('scoring handles caps, timeout, invalid metrics and star thresholds',()=>{
 assert.equal(scoreStep(100,20,20,60,true).score,100);
 assert.equal(scoreStep(100,40,20,60,true).score,85);
 assert.equal(scoreStep(100,60,20,60,true).score,0);
 assert.equal(scoreStep(100,10,20,60,false).score,0);
 assert.throws(()=>scoreStep(NaN,10,20,60,true));
 assert.deepEqual([49,50,70,85,95].map(stars),[1,2,3,4,5]);
});
test('slice validates path and endpoints; cancellation does not complete',()=>{
 const e=new MiniEngine(make('slice',6),'easy');let[a,b]=e.lines()[0];
 e.down(a);e.move({x:100,y:250});e.up(b);assert.equal(e.rejected,1);assert.equal(e.accepted,0);
 e.down(a);e.cancel();e.up(b);assert.equal(e.accepted,0);
 for(const[a,b]of e.lines()){e.down(a);e.move({x:a.x,y:(a.y+b.y)/2});e.up(b)}
 assert.ok(e.done&&e.completed);assert.equal(e.accepted,6);
});
test('dice enforces vertical then horizontal; fold validates origin and target',()=>{
 const e=new MiniEngine(make('dice',9),'normal');const[a,b]=e.lines()[5];e.down(a);e.up(b);assert.equal(e.accepted,0);
 for(const[a,b]of e.lines()){e.down(a);e.move({x:(a.x+b.x)/2,y:(a.y+b.y)/2});e.up(b)}assert.ok(e.completed);
 const fold=new MiniEngine(make('fold',3),'easy');for(const[a,b]of fold.folds()){fold.down(a);fold.up(b)}assert.ok(fold.completed);
});
test('dense slicing scales with target and mince follows precise knife positions',()=>{
 const thin=new MiniEngine({...make('slice',12),ingredient:'tỏi'},'normal');assert.equal(thin.lines().length,12);assert.ok(thin.lines()[1][0].x-thin.lines()[0][0].x<40);
 const mince=new MiniEngine(make('mince',18),'easy');for(const p of mince.mincePoints()){mince.down(p);mince.up(p)}assert.ok(mince.completed);assert.equal(mince.minceHits.length,18);
});
test('mix rejects oscillation and accepts sustained circular gesture',()=>{
 const e=new MiniEngine(make('mix',3),'easy');e.down({x:590,y:270});
 for(let i=1;i<=20;i++)e.move({x:480+Math.cos(i%2?.2:0)*110,y:270+Math.sin(i%2?.2:0)*110});assert.ok(e.amount<.5);
 for(let i=1;i<=440;i++){const a=i*.05;e.move({x:480+Math.cos(a)*110,y:270+Math.sin(a)*110})}assert.ok(e.completed);
});
test('boil needs time in zone, pour needs release in band and fry needs timing',()=>{
 const e=new MiniEngine(make('boil',10),'easy');e.setHeat=62;for(let i=0;i<160;i++)e.update(.1);assert.ok(e.completed);
 const pour=new MiniEngine(make('pour',1),'easy');pour.down({x:480,y:250});pour.update(1);pour.up({x:480,y:250});assert.equal(pour.rejected,1);assert.ok(!pour.done);
 pour.down({x:480,y:250});pour.update(2.8);pour.up({x:480,y:250});assert.ok(pour.completed);
 const fry=new MiniEngine(make('fry',4),'easy');fry.down({x:370,y:220});fry.cancel();assert.equal(fry.rejected,1);
 fry.fry=[.6,.6,.6,.6];for(const[x,y]of [[370,220],[590,220],[370,350],[590,350]]){fry.down({x,y});fry.up({x,y})}assert.ok(fry.completed);
});
test('find uses ordered requests, timeout stops all future progress',()=>{
 const e=new MiniEngine(make('find',3),'easy');for(const p of [{x:480,y:350},{x:310,y:210},{x:650,y:210}]){e.down(p);e.up(p)}assert.ok(e.completed);
 const timed=new MiniEngine(make('slice',6),'normal');timed.update(60);assert.ok(timed.done&&!timed.completed);timed.down(timed.lines()[0][0]);assert.equal(timed.accepted,0);
});
test('food order requires the portion size written on the ticket',()=>{
 const e=new MiniEngine({...make('choose',1),ingredient:'suất L'},'normal');
 e.down({x:330,y:290});e.up({x:330,y:290});assert.equal(e.rejected,1);assert.ok(!e.done);
 e.down({x:640,y:245});e.up({x:640,y:245});assert.ok(e.completed);assert.equal(e.accepted,1);
});
test('wash, seasoning rhythm and plating use distinct gestures',()=>{
 const wash=new MiniEngine(make('wash',3),'easy');wash.down({x:590,y:275});for(let i=1;i<=120&&!wash.done;i++){const a=i*.25;wash.move({x:480+Math.cos(a)*110,y:275+Math.sin(a)*80})}wash.up({x:590,y:275});assert.ok(wash.completed);assert.ok(wash.washTrail.length>0);
 const season=new MiniEngine(make('season',4),'easy');for(let i=0;i<4;i++){season.seasonNeedle=.5;season.down({x:480,y:125});season.cancel()}assert.ok(season.completed);
 const plate=new MiniEngine(make('plate',3),'easy');for(const[a,b]of plate.plateMoves()){plate.down(a);plate.up(b)}assert.ok(plate.completed);
});
test('grating alternates direction, kneading alternates folds and assembly allows free placement',()=>{
 const grate=new MiniEngine(make('grate',4),'easy');for(let i=0;i<4;i++){const a=i%2?{x:480,y:385}:{x:480,y:150},b=i%2?{x:480,y:150}:{x:480,y:385};grate.down(a);grate.up(b)}assert.ok(grate.completed);
 const knead=new MiniEngine(make('knead',6),'easy');for(const[a,b]of knead.kneadMoves()){knead.down(a);knead.up(b)}assert.ok(knead.completed);
 const assemble=new MiniEngine(make('assemble',6),'easy'),sources=[{x:170,y:175},{x:170,y:280},{x:170,y:385}];for(let i=0;i<6;i++){assemble.down(sources[i%3]);assemble.up({x:470+(i%3)*50,y:240+Math.floor(i/3)*70})}assert.ok(assemble.completed);assert.equal(assemble.placed.length,6);
});
test('save import validates schema, finite numbers, recipe ids and checkpoint count',()=>{
 const sizes={dumplings:6};const s=defaults();assert.equal(validateSave(s,sizes),true);s.best.dumplings=80;assert.equal(validateSave(s,sizes),true);s.best.dumplings=Infinity;assert.equal(validateSave(s,sizes),false);s.best={};
 s.active={recipeId:'dumplings',index:2,results:[],difficulty:'easy'};assert.equal(validateSave(s,sizes),false);s.active.index=0;assert.equal(validateSave(s,sizes),true);s.active.recipeId='unknown';assert.equal(validateSave(s,sizes),false);
});
