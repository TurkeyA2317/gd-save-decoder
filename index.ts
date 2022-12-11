/**
 * Sources:
 * - https://gdcolon.com/gdsave/index.js?v=3
 * - https://gdcolon.com/gdsave/functions/append.js?v=3
 */

import { Base64 } from 'js-base64';
import pako from "pako";
import type { GDRawSave } from './models';
import { difficultyList, gameKeys, isKeyRedefinition, levelKeys, statKeys, type KeyRedefintion } from './savekeys';

const K = 11; // GD save encryption key [0xb]

/**
 * atob with extra steps
 */
function urlB64(str: string){
    return Base64.atob(str
        .replace(/_/g, "/")
        .replace(/-/g, "+"));
}

function xor(c: string, k: number){
    return String.fromCodePoint(c.charCodeAt(0) ^ k);
}

function decr(str: string, k: number){
    return str.split("").map(ch => xor(ch, k)).join("");
}

/**
 * return Blob contents
 */
function read(blob: Blob): Promise<string | ArrayBuffer>{
    return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = e => {
            if(e && e.target && e.target.result){
                resolve(e.target.result);
            }
            else{
                reject("Cannot Read File");
            }
        };
        fr.readAsText(blob);
    });
}

/**
 * Decode the GD Save (like CCGameManager.dat) into the resulting XML:
 * * Decrypt using key [0xb] (yes, the key is just 1 byte long)
 * * Base64-decode it (and replace some characters)
 * * Decompress
 * * More string replacements
 */
async function saveToXML(blob: Blob): Promise<string>{
    let text = String(await read(blob));
    text = decr(text, K);
    text = urlB64(text);
    const charArray = new Uint8Array(text.split("").map(ch => ch.charCodeAt(0)));
    text = pako.inflate(charArray, {to: "string"});
    
    //from https://gdcolon.com/gdsave/index.js?v=3
    text = text.replace(/&(?!amp;)/g, "&amp;") // escape ampersands
        .replace(/<k>GLM_09<\/k><d>(.|\n)+?<\/d>/g, "") // remove GLM_09 (corrupted on lots of saves)
        .replace(/[^\x00-\x7F]/g, "?").replace(/[\0-\37]/g, "") // replace weird characters
    
    return text;
}

/**
 * return the relevant part of the resulting DOM tree
 */
function parseXMLString(xml: string){
    if("DOMParser" in window){
        return (new DOMParser().parseFromString(xml, "text/xml")).children[0].children[0];
    }
    throw "DOMParser is unsupported in your browser";
}

/**
 * translate GD-internal key names (like GLM_, k_) to human-readable names
 * Source: https://gdcolon.com/gdsave/keys.js?v=3
 */
function fromGameKey(key: string): string | KeyRedefintion{
    if(gameKeys[key]) return gameKeys[key];
    if(levelKeys[key]) return levelKeys[key];
    return key;
}

/**
 * The value tag name (r, i, t, f, s) denote the data type
 */
function parseValue(child: Element){
    const v = child.innerHTML;
    switch(child.tagName){
        case "r": return parseFloat(v);
        case "i": return parseInt(v);
        case "t": return true;
        case "f": return false;
        case "s": return v;
        default: return v;
    }
}

/**
 * Translate the GD XML to a JS Object
 * 
 * The actual GD save data is multi-dimensional / hierarchical. 
 * A <k> Tag (key) is followed by a <r|i|t|f|s> (value) tag. The value tag might continue <k> and <r|i|t|f|s> tags.
 * 
 * The value tag name denotes the data type of the value.
 */
function xmlToJson(xml: Element){
    let result = {};
    for(let i = 0; i < xml.children.length; i += 2){
        const child = xml.children[i];
        const nextChild = xml.children[i + 1];
        const keyName = fromGameKey(child.innerHTML);

        if(keyName === "password" || keyName === "[unused]") continue;

        if(isKeyRedefinition(keyName)){
            const v = parseValue(nextChild);
            if(keyName.values && typeof v === "number"){
                result[keyName.name] = keyName.values[v];
            }
            else if(keyName.b64 && typeof v === "string"){
                result[keyName.name] = urlB64(v);
            }
            else{
                result[keyName.name] = v;
            }
        }
        else if(nextChild.children.length === 0){
            result[keyName] = parseValue(nextChild);
        }
        else{
            result[keyName] = xmlToJson(nextChild);
        }
    }
    return result;
}

/**
 * Some extra transforms
 * 
 * unused right now
 */
function postProcessJSON(save: any){
    if(save.stats){
        for(const k of Object.keys(save.stats)){
            if(statKeys[k]){
                save.stats[statKeys[k]] = parseInt(save.stats[k]);
                delete save.stats[k];
            }
        }
    }
    if(save.levelStars){
        for(const k of Object.keys(save.levelStars)){
            save.levelStars[k] = parseInt(save.levelStars[k]);
        }
    }
    if(save.dailyStars){
        for(const k of Object.keys(save.dailyStars)){
            save.dailyStars[k] = parseInt(save.dailyStars[k]);
        }
    }
    return save;
}

export async function saveToJSON(blob: Blob){
    const xml = parseXMLString(await saveToXML(blob));

    return postProcessJSON(xmlToJson(xml)) as GDRawSave;
}