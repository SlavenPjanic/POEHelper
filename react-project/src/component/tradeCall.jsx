// import React from "react";
import axios from 'axios';
import checkPseudo from './checkPseudo';
//Type of Item
let option;


        //TODO: Make sure the query returns the type of stat it is (ie explicit, implicit)
        //combine identical implicits and explicits. this will be last. might take time.
        //Look through psuedo first and if found continue.
        //skip psuedo if either armour or weapon are true.

        //Go though the psuedo rules and check by reference and return then pseudo rule if there is a match.
        //If there are similar mods add to the pool.

//Query is selected Mods
export async function tradeAPICall(query, items){

        //populate JSON of all item mods 
        //TODO: check if we already have the mods from the api
        const itemMods = await axios.get('https://www.pathofexile.com/api/trade/data/stats');

        findItemType(items);
        let search = findMods(itemMods.data.result, query);

        //Method to refine the query
        // find the item base type and specific items
        let article = adjustQuery(items, search);
        //using "https://thingproxy.freeboard.io/fetch/" as cors proxy
        //const response = await axios.post('https://thingproxy.freeboard.io/fetch/https://www.pathofexile.com/api/trade/search/Standard', article);

        //USE NEW SEARCHG
        //now you have a string, and to get a json you have to do -> json_request = json.loads(article);
        //and then:
        let TRADE_ENDPOINT = "https://thingproxy.freeboard.io/fetch/https://www.pathofexile.com/api/trade/search/";
        let league = 'Standard';
        let head = {"content-Type": "application/json", "User-Agent": "PoEItemHelper"};
        //this should work
        const response = await axios.post(TRADE_ENDPOINT + league, article, {head});

        return response.data;
}

    //TODO: NEED TO CHECK FOR INFLUENCE
    //chaos price range
    //name and account used for the trade
function findMods(modList, query){

    //need to get the numbers out and used as variables in the search
    //str.match(/[+-]?\d+/g).map(Number)
    for(let i = 0; i < query.length; i++){

        let textAmount = query[i].modText.match(/[+-]?\d+/g);
        let amount;
        //Get the average of the 2 mod amounts.
        if(textAmount.length > 1){
            amount = (parseInt(textAmount[0]) + parseInt(textAmount[1])) / 2;
        }else{
            amount = parseInt(textAmount);
        }

        query[i].modAmount = amount;
        query[i].modText = query[i].modText.split('.').join("").replace(/[+-]?\d+/g, "#");
        //TODO: Prevent this from changing the original text
    }

    //Check if the mod needs to be (local)
    let armour, weapon = false;
    if(option.includes("armour") && !(option.includes("quiver"))){
        armour = true;
    }else if(option.includes("weapon")){
        weapon = true;
    }
    let localArmour = ["# to maximum Energy Shield","#% increased Evasion Rating", "#% increased Energy Shield", "# to Evasion Rating", "# to Armour", "#% increased Armour and Energy Shield", "#% increased Armour", "#% increased Armour and Evasion", "#% increased Evasion and Energy Shield", "#% increased Armour, Evasion and Energy Shield"];
    let localWeapom = ["#% increased Attack Speed", "Adds # to # Physical Damage", "Adds # to # Lightning Damage", "# to Accuracy Rating", "Adds # to # Cold Damage", "Adds # to # Fire Damage", "#% chance to Poison on Hit", "#% of Physical Attack Damage Leeched as Life", "Adds # to # Chaos Damage", "#% of Physical Attack Damage Leeched as Mana"];

    //grab the mods TODO: make this global so that we don't have to grab everytime.
    let explicit = modList.find(exp => exp.label === "Explicit");
    let implicit = modList.find(exp => exp.label === "Implicit");
    let psuedo =  modList.find(exp => exp.label === "Pseudo");
    query = checkPseudo(query);

    //TODO: With the modType we can narrow our search. 
    //Need to check for similar mods and then find the appropriate Psuedo mod. 


    for(let k = 0; k < query.length; k++){//Used to get the id for each mod

        let itemPS = psuedo.entries.find(item => item.text === query[k].modText);
        if(itemPS !== undefined){
            let id = {
                modId: itemPS.id
            }
            Object.assign(query[k], id);
            console.log(query[k]);
            continue;
        }

        if(armour){
            if(localArmour.includes(query[k].modText)){
                query[k].modText += " (Local)";
            }
        }else if(weapon){
            if(localWeapom.includes(query[k].modText)){
                query[k].modText += " (Local)";
            }
        }        
        let itemEX = explicit.entries.find(item => item.text === query[k].modText);
        if(itemEX !== undefined){
            let id = {
                modId: itemEX.id
            }
            Object.assign(query[k], id);
            continue;
        } 
        let itemIM = implicit.entries.find(item => item.text === query[k].modText);
        if(itemIM !== undefined){
            let id = {
                modId: itemIM.id
            }
            Object.assign(query[k], id);
            continue;
        } 

    }

    return query;
}

function adjustQuery(items, search){

    let filters = [];

    let corrupted = "false";
    let min = 1;
    let max = 999;
    console.log(items);

    for(let i = 0; i < search.length; i++){

        let mod = {
                            "id": search[i].modId, //need to change the ID and the min value.
                            "value": {
                                "min": search[i].modAmount
                            },
                            "disabled": false
                        };

        filters.push(mod);
    };

            // Simple POST request with a JSON body using axios
    let article = 
    {
        "query": {
            "status": {
                "option": "online"
            },
            "stats": [
                {
                    "type": "and",
                    "filters": filters
                }
            ],
            "filters": {
                "type_filters": {
                    "filters": {
                        "category": {
                            "option": option
                        },
                        "rarity": {
                            "option": "rare"
                        }
                    }
                },
                "misc_filters": {
                    "disabled": false,
                    "filters": {
                        "corrupted": {
                            "option": corrupted
                        }
                    }
                },
                "trade_filters": {
                    "filters": {
                        "price": {
                            "min": min,
                            "max": max
                        }
                    }
                }
            }
        },
        "sort": {
            "price": "asc"
        }
    };//min, max, corrupted, itemType, mods

    // article.query.stats.filters = filters;

    // article.query.filters.type_filters.filters.category.option = option;

    article = {
        "query": {
            "status": {
                "option": "online"
            },
            "stats": [
                {
                    "type": "and",
                    "filters": [
                        {
                            "id": "pseudo.pseudo_total_life",
                            "value": {
                                "min": 116
                            },
                            "disabled": false
                        },
                        {
                            "id": "pseudo.pseudo_total_cold_resistance",
                            "value": {
                                "min": 22
                            },
                            "disabled": false
                        },
                        {
                            "id": "pseudo.pseudo_total_lightning_resistance",
                            "value": {
                                "min": 25
                            },
                            "disabled": false
                        },
                        {
                            "id": "explicit.stat_2511217560",
                            "value": {
                                "min": 23
                            },
                            "disabled": false
                        }
                    ]
                }
            ],
            "filters": {
                "type_filters": {
                    "filters": {
                        "category": {
                            "option": "armour.chest"
                        },
                        "rarity": {
                            "option": "rare"
                        }
                    }
                },
                "misc_filters": {
                    "disabled": false,
                    "filters": {
                        "corrupted": {
                            "option": "false"
                        }
                    }
                },
                "trade_filters": {
                    "filters": {
                        "price": {
                            "min": 1,
                            "max": 999
                        }
                    }
                }
            }
        },
        "sort": {
            "price": "asc"
        }
    };
    
    return article;
}

function findItemType(items){
    
        //weapons = weapon,offhands = armour, amulet,ring,belt = accessory 
    //if the item inventoryId is offhand determine wether the item is quiver, shield or another weapon.
    if(items.inventoryId === "Offhand"){
        if(items.inventoryId.indexOf("Shield") !== -1){
            option = "armour.quiver";
        }else if(items.inventoryId.indexOf("Quiver") !== -1){
            option = "armour.shield";
        }
    //what kind of weapon. onemelee twomelee bow wand 
    //items.properties[0].name
    }else if(items.inventoryId === "Weapon"){
        if(items.properties[0].name === "Staff"){
            option = "weapon.staff";  }
        if(items.properties[0].name === "Warstaff"){
            option = "weapon.warstaff";  }
        if(items.properties[0].name === "One Handed Mace"){
            option = "weapon.onemace";   }
        if(items.properties[0].name === "Two Handed Mace"){
            option = "weapon.twomace"; }
        if(items.properties[0].name === "One Handed Axe"){
            option = "weapon.oneaxe";  }
        if(items.properties[0].name === "Two Handed Axe"){
            option = "weapon.twoaxe";   }
        if(items.properties[0].name === "One Handed Sword"){
            option = "weapon.onesword";      }
        if(items.properties[0].name === "Thrusting One Handed Sword"){
            option = "weapon.onesword";     }
        if(items.properties[0].name === "Two Handed Sword"){
            option = "weapon.twosword";      }
        if(items.properties[0].name === "Bow"){
            option = "weapon.bow";    }
        if(items.properties[0].name === "Claw"){
            option = "weapon.claw";  }
        if(items.properties[0].name === "Dagger"){
            option = "weapon.dagger";  }
        if(items.properties[0].name === "Rune Dagger"){
            option = "weapon.runedagger";  }
        if(items.properties[0].name === "Sceptre"){
            option = "weapon.scepter";  }
        if(items.properties[0].name === "Wand"){
            option = "weapon.wand";  }
        
    }else if(items.inventoryId === "BodyArmour"){
        option = "armour.chest";
    }else if(items.inventoryId === "Helm"){
        option = "armour.helmet";
    }
    else if(items.inventoryId === "Gloves" || items.inventoryId === "Boots"){
        option = "armour." + items.inventoryId.toLowerCase();
    }else{ 
        option = "accessory." + items.inventoryId.toLowerCase();
    }

}

// {
//     "query": {
//         "status": {
//             "option": "online"
//         },
//         "stats": [
//             {
//                 "type": "and",
//                 "filters": 
//                 [
//                     {
//                         "id": "pseudo.pseudo_total_life",
//                         "value": {
//                             "min": 116
//                         },
//                         "disabled": false
//                     },
//                     {
//                         "id": "pseudo.pseudo_total_cold_resistance",
//                         "value": {
//                             "min": 22
//                         },
//                         "disabled": false
//                     },
//                     {
//                         "id": "pseudo.pseudo_total_lightning_resistance",
//                         "value": {
//                             "min": 25
//                         },
//                         "disabled": false
//                     },
//                     {
//                         "id": "explicit.stat_2511217560",
//                         "value": {
//                             "min": 23
//                         },
//                         "disabled": false
//                     }
//                 ]
//             }
//         ],
//         "filters": {
//             "type_filters": {
//                 "filters": {
//                     "category": {
//                         "option": "armour.chest"
//                     },
//                     "rarity": {
//                         "option": "rare"
//                     }
//                 }
//             },
//             "misc_filters": {
//                 "disabled": false,
//                 "filters": {
//                     "corrupted": {
//                         "option": "false"
//                     }
//                 }
//             },
//             "trade_filters": {
//                 "filters": {
//                     "price": {
//                         "min": 1,
//                         "max": 999
//                     }
//                 }
//             }
//         }
//     },
//     "sort": {
//         "price": "asc"
//     }
// }//min, max, corrupted, itemType, mods