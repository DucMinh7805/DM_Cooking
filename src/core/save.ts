import type {ActiveRun,SaveData,Settings,StepResult} from '../types.ts';
const KEY='world-kitchen-v2';
export const defaults=():SaveData=>({version:2,best:{},completed:0,active:null,settings:{difficulty:'easy',volume:.4,muted:false,hints:true,reducedMotion:false}});
const obj=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
const score=(v:unknown):v is number=>typeof v==='number'&&Number.isFinite(v)&&v>=0&&v<=100;
export function validateSave(v:unknown,recipeSizes:Record<string,number>):v is SaveData {
 if(!obj(v)||v.version!==2||!obj(v.best)||Object.entries(v.best).some(([id,n])=>!Object.hasOwn(recipeSizes,id)||!score(n))||!Number.isSafeInteger(v.completed)||Number(v.completed)<0||!obj(v.settings))return false;
 const s=v.settings;if(!['easy','normal'].includes(String(s.difficulty))||typeof s.volume!=='number'||s.volume<0||s.volume>1||!Number.isFinite(s.volume)||['muted','hints','reducedMotion'].some(k=>typeof s[k]!=='boolean'))return false;
 if(v.active!==null){const a=v.active;if(!obj(a)||typeof a.recipeId!=='string'||!Object.hasOwn(recipeSizes,a.recipeId)||!Number.isInteger(a.index)||Number(a.index)<0||Number(a.index)>=recipeSizes[a.recipeId]||!Array.isArray(a.results)||a.results.length!==a.index||!['easy','normal'].includes(String(a.difficulty)))return false;
  if(a.results.some((r:unknown)=>!obj(r)||!score(r.score)||!score(r.accuracy)||!score(r.speed)||typeof r.completed!=='boolean'))return false;
 }return true;
}
export class SaveStore {
 data:SaveData; message=''; sizes:Record<string,number>;
 constructor(sizes:Record<string,number>){this.sizes=sizes;this.data=defaults();try{const raw=localStorage.getItem(KEY);if(raw){const parsed:unknown=JSON.parse(raw);if(validateSave(parsed,sizes))this.data=parsed;else this.message='Bản lưu cũ không hợp lệ; đã dùng tiến độ mới.'}}catch{this.message='Không đọc được lưu trữ; hãy xuất bản lưu.'}}
 persist(){try{localStorage.setItem(KEY,JSON.stringify(this.data));this.message='Đã lưu trên thiết bị.';return true}catch{this.message='Không lưu tự động được; hãy xuất bản lưu.';return false}}
 settings(value:Partial<Settings>){this.data.settings={...this.data.settings,...value};this.persist()}
 checkpoint(run:ActiveRun|null){this.data.active=run?structuredClone(run):null;this.persist()}
 finish(id:string,results:StepResult[]){const n=results.reduce((s,r)=>s+r.score,0)/results.length;this.data.best[id]=Math.max(this.data.best[id]??0,n);this.data.completed++;this.data.active=null;this.persist()}
 import(raw:string){const parsed:unknown=JSON.parse(raw);if(!validateSave(parsed,this.sizes))throw Error('Bản lưu không hợp lệ hoặc khác phiên bản.');this.data=structuredClone(parsed);this.persist()}
 export(){return JSON.stringify(this.data,null,2)}
 reset(){this.data=defaults();this.persist()}
}
