import Phaser from 'phaser';
import {MiniEngine} from '../minigames/engine';
import {drawKitchen} from '../render/kitchen';
import type {Difficulty,Step} from '../types';
export class KitchenScene extends Phaser.Scene {
 onReady:()=>void=()=>{};engine!:MiniEngine;paused=true;notify:()=>void=()=>{};onFeedback:(success:boolean)=>void=()=>{};hints=true;motion=true;
 private texture!:Phaser.Textures.CanvasTexture;private owner:number|null=null;
 constructor(){super('Kitchen')}
 create(){this.texture=this.textures.createCanvas('kitchen',960,560)!;this.add.image(0,0,'kitchen').setOrigin(0);this.input.on('pointerdown',(p:Phaser.Input.Pointer)=>{if(this.paused||this.owner!==null)return;this.owner=p.id;const a=this.engine.accepted,b=this.engine.rejected;this.engine.down({x:p.x,y:p.y});this.feedback(a,b)});this.input.on('pointermove',(p:Phaser.Input.Pointer)=>{if(this.paused||this.owner!==p.id)return;this.engine.move({x:p.x,y:p.y})});const up=(p:Phaser.Input.Pointer)=>{if(this.paused||this.owner!==p.id)return;const a=this.engine.accepted,b=this.engine.rejected;this.engine.up({x:p.x,y:p.y});this.owner=null;this.feedback(a,b)};this.input.on('pointerup',up);this.input.on('pointerupoutside',()=>this.cancel());this.input.on('gameout',()=>this.cancel());this.game.canvas.addEventListener('pointercancel',this.cancel);this.events.once('shutdown',()=>this.game.canvas.removeEventListener('pointercancel',this.cancel));this.onReady()}
 feedback(a:number,b:number){if(this.engine.accepted>a)this.onFeedback(true);if(this.engine.rejected>b)this.onFeedback(false)}
 cancel=()=>{this.owner=null;this.engine?.cancel()};
 loadStepEngine(step:Step,difficulty:Difficulty){this.cancel();this.engine=new MiniEngine(step,difficulty);this.paused=true;this.redraw()}
 redraw(time=0){if(this.engine&&this.texture){drawKitchen(this.texture.context,this.engine,this.hints,this.motion,time);this.texture.refresh()}}
 update(time:number,delta:number){if(!this.engine)return;if(!this.paused)this.engine.update(Math.min(delta/1000,.1));this.redraw(time);this.notify()}
}
