import type {Difficulty,Point,Step} from '../types.ts';
import {clamp} from '../core/scoring.ts';
export class MiniEngine {
 step:Step;difficulty:Difficulty;elapsed=0;accepted=0;rejected=0;amount=0;temperature=30;setHeat=30;pour=0;fry=[0,0,0,0];fryDone=[false,false,false,false];minceHits:Point[]=[];placed:Point[]=[];hotPenalty=0;goodTime=0;goodAngle=0;totalAngle=0;direction=0;hint='Làm theo gợi ý nhé';done=false;completed=false;pressed=false;start:Point|null=null;last:Point|null=null;lastAngle=0;pathValid=true;seasonNeedle=0;washTrail:Point[]=[];
 constructor(step:Step,difficulty:Difficulty){this.step={...step};this.difficulty=difficulty;if(difficulty==='easy')this.step.limit=Math.round(step.limit*1.6)}
 get tolerance(){return this.difficulty==='easy'?42:24}
 get progress(){return clamp(this.amount/this.step.target,0,1)}
 get accuracy(){if(this.step.kind==='mix')return this.totalAngle?this.goodAngle/this.totalAngle*100:0;if(this.step.kind==='boil')return clamp((this.elapsed?this.goodTime/this.elapsed*100:0)-this.hotPenalty);return this.accepted/(this.accepted+this.rejected||1)*100}
 lines():[Point,Point][]{if(this.step.kind==='slice'){const count=this.step.target;return Array.from({length:count},(_,i)=>{const x=count===1?480:290+i*380/(count-1);return[{x,y:135},{x,y:385}]})}const vertical=Math.ceil(this.step.target*.57),horizontal=this.step.target-vertical;return[...Array.from({length:vertical},(_,i)=>{const x=vertical===1?480:300+i*360/(vertical-1);return[{x,y:145},{x,y:375}] as [Point,Point]}),...Array.from({length:horizontal},(_,i)=>{const y=horizontal===1?270:165+i*215/(horizontal-1);return[{x:280,y},{x:680,y}] as [Point,Point]})]}
 mincePoints():Point[]{return Array.from({length:this.step.target},(_,i)=>({x:315+(i*83)%340,y:170+((i*47)%5)*48}))}
 folds():[Point,Point][]{return[[{x:300,y:275},{x:480,y:180}],[{x:660,y:275},{x:480,y:180}],[{x:480,y:390},{x:480,y:275}]]}
 plateMoves():[Point,Point][]{return[[{x:185,y:185},{x:410,y:245}],[{x:185,y:365},{x:535,y:320}],[{x:775,y:275},{x:520,y:205}]]}
 kneadMoves():[Point,Point][]{return Array.from({length:this.step.target},(_,i)=>i%2?[{x:615,y:280},{x:385,y:280}]:[{x:345,y:280},{x:575,y:280}])}
 down(p:Point){if(this.done)return;this.pressed=true;this.start=this.last=p;this.lastAngle=Math.atan2(p.y-270,p.x-480);this.pathValid=true;if(this.step.kind==='find'){const cells=[{x:310,y:210},{x:480,y:210},{x:650,y:210},{x:310,y:350},{x:480,y:350},{x:650,y:350}];const requested=[4,0,2][this.accepted];if(distance(p,cells[requested])<65)this.accept('Đúng nguyên liệu!');else this.reject('Tìm đúng nguyên liệu được yêu cầu nhé')}if(this.step.kind==='choose'){const portions=[{x:330,y:290},{x:480,y:270},{x:640,y:245}],correct=this.step.ingredient.includes('L')||this.step.ingredient.includes('lớn')?2:this.step.ingredient.includes('S')||this.step.ingredient.includes('nhỏ')?0:1,index=portions.findIndex(c=>distance(p,c)<78);if(index===correct)this.accept('Đúng khẩu phần trên phiếu order!');else if(index>=0)this.reject('Sai khẩu phần — đọc lại yêu cầu của khách nhé')}if(this.step.kind==='mince'){const target=this.mincePoints()[this.accepted];if(target&&distance(p,target)<this.tolerance+16){this.minceHits.push(p);this.accept(this.accepted<this.step.target?'Nhịp dao tốt, tiếp tục phủ đều vùng băm!':'Băm hoàn tất!')}else this.reject('Đưa dao tới vòng sáng tiếp theo để băm đều')}if(this.step.kind==='fry'){const positions=[{x:370,y:220},{x:590,y:220},{x:370,y:350},{x:590,y:350}];const i=positions.findIndex(v=>distance(p,v)<65);if(i>=0&&!this.fryDone[i]){const n=this.fry[i];if(n>=.5&&n<=.8){this.fryDone[i]=true;this.accept('Chín vừa đẹp!')}else{this.fry[i]=0;this.reject(n>.8?'Quá chín! Miếng này được làm lại.':'Chờ vòng nấu vào vùng xanh nhé')}}}if(this.step.kind==='pour'&&distance(p,{x:480,y:250})>140)this.pressed=false;if(this.step.kind==='season'){if(this.seasonNeedle>=.43&&this.seasonNeedle<=.67)this.accept(this.accepted+1>=this.step.target?'Nêm vừa vị!':'Đúng nhịp, thêm một lần nữa!');else this.reject(this.seasonNeedle<.43?'Chậm một nhịp rồi!':'Hơi quá tay, đợi vòng tiếp theo!')}if(this.step.kind==='wash'&&distance(p,{x:480,y:275})>210){this.pressed=false;this.reject('Chà trực tiếp trên nguyên liệu nhé')}}
 move(p:Point){if(!this.pressed||!this.last||this.done)return;if(this.step.kind==='slice'||this.step.kind==='dice'){const line=this.lines()[this.accepted];if(line){const[a,b]=line;const vertical=a.x===b.x;const offset=vertical?Math.abs(p.x-a.x):Math.abs(p.y-a.y);if(offset>this.tolerance)this.pathValid=false}}
 if(this.step.kind==='mix'){const a=Math.atan2(p.y-270,p.x-480);let d=a-this.lastAngle;if(d>Math.PI)d-=2*Math.PI;if(d< -Math.PI)d+=2*Math.PI;this.lastAngle=a;const r=distance(p,{x:480,y:270});if(Math.abs(d)>.015&&Math.abs(d)<Math.PI/4){this.totalAngle+=Math.abs(d);this.direction ||= Math.sign(d);if(r>=65&&r<=155&&Math.sign(d)===this.direction){this.goodAngle+=Math.abs(d);this.amount=this.goodAngle/(2*Math.PI);this.hint='Trộn theo một chiều nhé';if(this.amount>=this.step.target)this.finish(true)}}}
 if(this.step.kind==='wash'){const d=distance(this.last,p),inside=((p.x-480)/210)**2+((p.y-275)/135)**2<=1;if(inside&&d<90){this.amount+=d/105;this.accepted=Math.min(this.step.target,Math.floor(this.amount));this.washTrail.push(p);if(this.washTrail.length>36)this.washTrail.shift();this.hint=this.amount>=this.step.target*.7?'Gần sạch rồi, chà nốt các vết còn lại!':'Chà đều toàn bộ bề mặt';if(this.amount>=this.step.target)this.finish(true)}else if(d>=90)this.reject('Chà những vòng ngắn và đều tay nhé')}this.last=p}
 up(p:Point){
  if(!this.pressed||!this.start||this.done){this.cancel();return}
  const k=this.step.kind;
  if(k==='slice'||k==='dice'){
   const[a,b]=this.lines()[this.accepted],ok=this.pathValid&&((distance(this.start,a)<this.tolerance&&distance(p,b)<this.tolerance)||(distance(this.start,b)<this.tolerance&&distance(p,a)<this.tolerance));
   if(ok)this.accept('Đường cắt đẹp!');else this.reject('Kéo hết đường, giữ dao trong vùng gợi ý');
  }
  if(k==='grate'){
   const top={x:480,y:150},bottom={x:480,y:385},forward=this.accepted%2===0;
   const ok=forward?distance(this.start,top)<this.tolerance+28&&distance(p,bottom)<this.tolerance+28:distance(this.start,bottom)<this.tolerance+28&&distance(p,top)<this.tolerance+28;
   if(ok)this.accept(this.accepted+1>=this.step.target?'Sợi bào đã đủ!':'Đổi chiều và bào tiếp!');else this.reject('Kéo hết chiều dài mặt bào, rồi đổi hướng');
  }
  if(k==='knead'){
   const[a,b]=this.kneadMoves()[this.accepted];
   if(distance(this.start,a)<this.tolerance+28&&distance(p,b)<this.tolerance+34)this.accept(this.accepted+1>=this.step.target?'Bột đã mịn và đàn hồi!':'Gập bột sang phía đối diện!');else this.reject('Đẩy khối bột theo hướng mũi tên đang sáng');
  }
  if(k==='assemble'){
   const sources=[{x:170,y:175},{x:170,y:280},{x:170,y:385}],source=sources[this.accepted%3],inside=distance(p,{x:540,y:280})<168;
   if(distance(this.start,source)<this.tolerance+34&&inside){this.placed.push(p);this.accept(this.accepted+1>=this.step.target?'Món đã đủ thành phần!':'Tự chọn vị trí cho topping tiếp theo!')}else this.reject('Kéo topping từ khay đang sáng vào phần món ở giữa');
  }
  if(k==='fold'){
   const[a,b]=this.folds()[this.accepted];if(distance(this.start,a)<this.tolerance+10&&distance(p,b)<this.tolerance+10)this.accept('Nếp gấp đúng rồi!');else this.reject('Kéo từ điểm vàng vào vùng xanh');
  }
  if(k==='plate'){
   const move=this.plateMoves()[this.accepted];if(move){const[a,b]=move;if(distance(this.start,a)<this.tolerance+24&&distance(p,b)<this.tolerance+34)this.accept(this.accepted+1>=this.step.target?'Bố cục đẹp mắt!':'Đặt chuẩn rồi, tiếp tục hoàn thiện đĩa!');else this.reject('Kéo thành phần đang sáng vào vòng gợi ý trên đĩa')}
  }
  if(k==='pour'){
   if(this.pour>=.58&&this.pour<=.78){this.accepted=1;this.amount=1;this.finish(true)}else{this.pour=0;this.reject('Thả tay khi lượng rót nằm trong vùng xanh')}
  }
  this.cancel();
 }
 cancel(){this.pressed=false;this.start=this.last=null}
 accept(hint:string){this.accepted++;this.amount=this.accepted;this.hint=hint;if(this.amount>=this.step.target)this.finish(true)}
 reject(hint:string){this.rejected++;this.hint=hint}
 finish(completed:boolean){this.done=true;this.completed=completed;this.cancel()}
 update(dt:number){if(this.done)return;this.elapsed+=dt;if(this.step.kind==='boil'){this.temperature+=(this.setHeat-this.temperature)*Math.min(1,dt*1.5);if(this.temperature>=50&&this.temperature<=75){this.amount+=dt;this.goodTime+=dt;this.hint='Nhiệt vừa đẹp!'}else this.hint=this.temperature<50?'Tăng nhiệt một chút':'Giảm nhiệt nhé';if(this.temperature>85)this.hotPenalty+=dt*5;if(this.amount>=this.step.target)this.finish(true)}if(this.step.kind==='pour'&&this.pressed){this.pour+=dt*.24;this.hint='Thả tay trong vùng xanh';if(this.pour>1){this.pour=0;this.reject('Rót quá tay, thử lại nhé');this.cancel()}}if(this.step.kind==='fry')this.fry=this.fry.map((n,i)=>this.fryDone[i]?n:Math.min(1,n+dt*(.065+i*.007)));if(this.step.kind==='season')this.seasonNeedle=(Math.sin(this.elapsed*2.7-Math.PI/2)+1)/2;if(!this.done&&this.elapsed>=this.step.limit)this.finish(false)}
}
export function distance(a:Point,b:Point){return Math.hypot(a.x-b.x,a.y-b.y)}
