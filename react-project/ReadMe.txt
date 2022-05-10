
CURRENT WORK
----------------------------------------------------------------------------
checkPseudo: Return all Psuedo mods and whatever mods were not found.
TradeCall:  Check the unfound mods and match them to implicit/explicit mods
AttrList: need to add craftedMods section
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
BUGS:
Changing the league and clicking load resets the filter.
changing the league and selecting the character is choosing based on index of list and not on value

EN: implicits can be either imp/exp/pseudo but Explicits should be exp/pseudo
    currently not searching for items with crafted mods