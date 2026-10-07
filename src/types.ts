export type Kind='slice'|'dice'|'mince'|'mix'|'fold'|'boil'|'find'|'choose'|'pour'|'fry'|'wash'|'season'|'plate'|'grate'|'knead'|'assemble';
export type Difficulty='easy'|'normal';
export interface Step {id:string;kind:Kind;name:string;hint:string;ingredient:string;target:number;par:number;limit:number}
export interface Recipe {id:string;name:string;country:string;emoji:string;description:string;steps:Step[];requires?:string;art?:string}
export interface StepResult {score:number;accuracy:number;speed:number;completed:boolean}
export interface Settings {difficulty:Difficulty;volume:number;muted:boolean;hints:boolean;reducedMotion:boolean}
export type RunMode='lesson'|'rush'|'creative';
export interface ActiveRun {recipeId:string;index:number;results:StepResult[];difficulty:Difficulty;mode?:RunMode}
export interface SaveData {version:2;best:Record<string,number>;completed:number;settings:Settings;active:ActiveRun|null}
export interface Point {x:number;y:number}
