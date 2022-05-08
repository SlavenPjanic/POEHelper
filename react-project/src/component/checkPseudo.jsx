import { createPseudoModPool, PseudoRules } from './PseudoInterface';

function checkPseudo (search){

    let modPool = createPseudoModPool(); //Existing PseudoMods
    let foundMods = [];

    //TODO: Need to return mods that aren't Pseudo as well
    //Change format to fit current mods

    for(let i in search){

      let ind;
      for(let x in foundMods){ //check for existing mods
        ind = foundMods[x].acceptedRules.indexOf(search[i].modText);
        if(ind >= 0){//increase the amount by the magnitude
          foundMods[x].amount += (search[i].modAmount * foundMods[x].magnitude[ind]);
        }
      }
      for(let cat in modPool){ //Go through the categories
        for(let rule = 0; rule < modPool[cat].length; rule++){ //Go through the Rules in each Category
          ind = modPool[cat][rule].acceptedRules.indexOf(search[i].modText);
          if(ind >= 0){ //mod is in the accepted rules
            foundMods.push(modPool[cat][rule]);
            foundMods[foundMods.length-1].amount += (search[i].modAmount * foundMods[foundMods.length-1].magnitude[ind]);
            modPool[cat].splice(rule, 1);
          }
        } 
      }
    }

    return(foundMods);
}

export default checkPseudo;