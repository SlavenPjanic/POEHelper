import { createPseudoModPool } from './PseudoInterface';

function checkPseudo (search){

    let modPool = createPseudoModPool(); //Existing PseudoMods
    let foundMods = [];
    
    for(let i = 0; i < search.length; i++){
      let ind;
      let match = false; //Determines whether mod is Psuedo
      
      for(let x = 0; x < foundMods.length; x++){ //check for existing mods
        ind = foundMods[x].acceptedRules.indexOf(search[i].modText);
        if(ind >= 0){//increase the amount by the magnitude
          foundMods[x].amount += (search[i].modAmount * foundMods[x].magnitude[ind]);
          match = true;
        }
      }
      
      for(let cat = 0; cat < modPool.length; cat++){ //Go through the categories
        for(let rule = 0; rule < modPool[cat].length; rule++){ //Go through the Rules in each Category
          ind = modPool[cat][rule].acceptedRules.indexOf(search[i].modText);
          if(ind >= 0){ //mod is in the accepted rules, Add to found mods and adjust. Remove from Pool
            foundMods.push(modPool[cat][rule]);
            foundMods[foundMods.length-1].amount += (search[i].modAmount * foundMods[foundMods.length-1].magnitude[ind]);
            modPool[cat].splice(rule, 1);
            match = true;
          }
        } 
      }

      if(match){
        search.splice(i, 1);
        i--;
      }
    }

    //Add the PseudoMods back with formatting 
    for(let mods = 0; mods < foundMods.length; mods++){
      //modAmount, modText, modType
      search.push({
        modAmount: foundMods[mods].amount,
        modText: foundMods[mods].rule,
        modType: "Pseudo"
      });
    }

    return(foundMods);
}

export default checkPseudo;