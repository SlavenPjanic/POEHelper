
CURRENT WORK
----------------------------------------------------------------------------
Check if there are implicits, explicits, crafted mods
    AttrList shouldn't care what type of mods they are
    Pass an array of items that contain the headers and another array of disabled items
if none display a message that this is a no mod item
add headers for all types of mods that are greyed out
search through psuedo to find these mods. 
    will need to adjust the search depending on the mod type
----------------------------------------------------------------------------

CSS)

1)figure out a background color (brownish red maybe)
2)round edges of inputs(blueish buttons)
3)create a layout for the items(follow the equipment layout)


TODO
Make a Error component that recieves the error and provides info to the user
Make a popup incase a mod is not found. 

comp should have a button that activates on when any amount of items are clicked
button clicked should create another component that will display several searches for that item

Item list that aren't default:
Do you want corrupted items?
Do you want an open prefix or suffix?
Do you want to ignore crafts?


******************************

characters gear shown 
-make api call to grab all the character data
-display clickable images of gear
-onClick will display the stats of the item
-possibly seperate into suffix and prefix



BUGS:
Changing the league and clicking load resets the filter.
changing the league and selecting the character is choosing based on index of list and not on value


TradeCall:  needs use checkPseudo to see if any mods can be psuedo
checkPseudo:check the mods and return the pseudo mods and any unfound mods
            every pseudo rule should have a list of applicable modifiers
            should have a running total of the amplitude of the pseudo rule
            ?? Is there a situation where a hybrid modifier only has a pseudo rule for half of it's stats
TradeCall:  Uses checkPseudo to match id from PoE API
            Check the unfound mods and match them to implicit/explicit mods
AttrList: need to add craftedMods section

EN: implicits can be either imp/exp/pseudo but Explicits should be exp/pseudo
    how to searching for items with crafted mods