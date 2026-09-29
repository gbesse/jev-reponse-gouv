// Purpose: Describe the public domain API.
import type{JevProvider}from"./jev.mjs";export const ANSWER_TYPES:readonly string[];export function question(input:any):any;export function governmentAnswer(input:any):any;export function assessResponse(question:any,answer:any|null,provider?:JevProvider,options?:{at?:Date|string}):Promise<any>;
