import type {StepResult} from '../types.ts';
export const clamp=(n:number,lo=0,hi=100)=>Math.max(lo,Math.min(hi,n));
export function stars(n:number){return n>=95?5:n>=85?4:n>=70?3:n>=50?2:1}
export function scoreStep(accuracy:number,elapsed:number,par:number,limit:number,completed:boolean):StepResult{
 if(![accuracy,elapsed,par,limit].every(Number.isFinite)||elapsed<0||par<=0||limit<=par)throw Error('Invalid metrics');
 const speed=clamp((limit-elapsed)/(limit-par)*100);
 return{accuracy:clamp(accuracy),speed,completed,score:completed&&elapsed<limit?clamp(accuracy)*.7+speed*.3:0};
}
export function average(results:StepResult[]){return results.length?results.reduce((s,r)=>s+r.score,0)/results.length:0}
