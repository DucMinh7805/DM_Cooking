import type {Settings} from '../types';
export class AudioManager {
 private ctx:AudioContext|null=null;
 settings:Settings;
 constructor(settings:Settings){this.settings=settings}
 async unlock(){try{this.ctx??=new AudioContext();if(this.ctx.state==='suspended')await this.ctx.resume()}catch{/* Audio may be unavailable; gameplay remains active. */}}
 play(kind:'click'|'success'|'error'|'cut'|'finish'){
 if(this.settings.muted||!this.ctx||this.ctx.state!=='running')return;
 const notes=kind==='finish'?[523,659,784]:[kind==='error'?150:kind==='cut'?260:kind==='success'?740:440];
 notes.forEach((frequency,i)=>{const ctx=this.ctx!;const o=ctx.createOscillator(),g=ctx.createGain(),start=ctx.currentTime+i*.12;o.type=kind==='cut'?'triangle':'sine';o.frequency.value=frequency;g.gain.setValueAtTime(.001,start);g.gain.exponentialRampToValueAtTime(Math.max(.001,this.settings.volume*.12),start+.01);g.gain.exponentialRampToValueAtTime(.001,start+.14);o.connect(g);g.connect(ctx.destination);o.start(start);o.stop(start+.15);o.onended=()=>{o.disconnect();g.disconnect()}})
 }
}
