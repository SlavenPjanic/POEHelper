import React, {Component} from "react";
//import AttrList from '../component/AttrList';
import ItemContainer from '../component/ItemContainer'

//let initialState;

class CharComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          accntName: this.props.accntName,
          charName: this.props.charName,
          currentItems: [],
          selectedItems: [],
          itemInfo: "",
          isSelected: false,
          inventoryImages: [
               {key:"Weapon",
               src:""},
               {key:"Helm",
               src:""},
               {key:"BodyArmour",
               src:""},
               {key:"Offhand",
               src:""},
               {key:"Amulet",
               src:""},
               {key:"Ring",
               src:""},
               {key:"Ring2",
               src:""},
               {key:"Gloves",
               src:""},
               {key:"Belt",
               src:""},
               {key:"Boots",
               src:""},
               {key:"Flask0",
               src:""},
               {key:"Flask1",
               src:""},
               {key:"Flask2",
               src:""},
               {key:"Flask3",
               src:""},
               {key:"Flask4",
               src:""}
          ]
        };
    
        this.updateUser = this.updateUser.bind(this);
      }


      createImages = () =>{

        //remove anthing not equipped
        for(let i = 0; i < this.state.currentItems.length; i++){
            //dont need MainInventory
            if(this.state.currentItems[i].inventoryId === "MainInventory"){
              //remove item from this.state.currentItems
              let removeArr = this.state.currentItems;
              removeArr.splice(i, 1);
              this.setState({ currentItems: removeArr});
            }
        }

        for(let i = 0; i < this.state.currentItems.length; i++){
            //find where to place the item 
            let pos = -1;
            if(this.state.currentItems[i].inventoryId === "Flask"){ //check which flask it is
                pos = this.state.inventoryImages.map(function(img) {return img.key;}).indexOf(this.state.currentItems[i].inventoryId + this.state.currentItems[i].x);    
            }else{
                pos = this.state.inventoryImages.map(function(img) {return img.key;}).indexOf(this.state.currentItems[i].inventoryId);
            }
            if(pos !== -1){
                let items = [...this.state.inventoryImages];
                let item = {...items[pos]};
                item.src = this.state.currentItems[i].icon;
                items[pos] = item;
                this.setState({inventoryImages: items});
            }
        }
    }

    componentDidMount() {
      this.updateUser();
    }  

    componentDidUpdate(prevProps){

      if(this.props.charName !== prevProps.charName) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
      {
        this.setState({
                error: null,
                accntName: this.props.accntName,
                charName: this.props.charName,
                currentItems: [],
                selectedItems: [],
                itemInfo: "",
                isSelected: false,
                inventoryImages: [
                    {key:"Weapon",
                    src:""},
                    {key:"Helm",
                    src:""},
                    {key:"BodyArmour",
                    src:""},
                    {key:"Offhand",
                    src:""},
                    {key:"Amulet",
                    src:""},
                    {key:"Ring",
                    src:""},
                    {key:"Ring2",
                    src:""},
                    {key:"Gloves",
                    src:""},
                    {key:"Belt",
                    src:""},
                    {key:"Boots",
                    src:""},
                    {key:"Flask0",
                    src:""},
                    {key:"Flask1",
                    src:""},
                    {key:"Flask2",
                    src:""},
                    {key:"Flask3",
                    src:""},
                    {key:"Flask4",
                    src:""}
                ]
        }, () => this.updateUser());
      }
    }

    updateUser(){

        fetch("https://www.pathofexile.com/character-window/get-items?accountName=" + this.state.accntName + "&character=" + this.state.charName)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              currentItems: result.items,
            }, () =>
            this.createImages());
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
              //TODO: needs to display the error happening
            });
          }
        )
    }

    onReturnClick = (returnCode) => {
        this.props.returnCallBack(returnCode);
    }

    onItemFound = () => {

    }

    onImageClick = (item) => {
        // grab implicitMods and explicitMods and craftedMods and enchantMods, seperate them as well
        let pos = this.state.currentItems.map(function(items) {return items.inventoryId;}).indexOf(item);

        if(pos !== -1){
            //render a new component 
            //currently doing one item at a time
            this.setState({isSelected: true});
            this.setState({selectedItems: this.state.currentItems[pos]}, () => this.props.onItemSelect(this.state.selectedItems));
        }

    }

    findItem = () => {
      
    }

    render(){

        let itemContainer = this.state.currentItems.map( a => {
            //class, src, key, onImageClick
            if(a.inventoryId === "Flask"){ //check which flask it is
              //pos = this.state.inventoryImages.map(function(img) {return img.key;}).indexOf(a.inventoryId + a.x);
              return <ItemContainer class={a.inventoryId + a.x} src={a.icon} itemkey={a.inventoryId + a.x} key={a.inventoryId + a.x} onClick={this.onImageClick}/>;  
            }else if(a.inventoryId === "Weapon2" || a.inventoryId === "Offhand2"){
              return ;
            }else{
              return <ItemContainer class={a.inventoryId} src={a.icon} itemkey={a.inventoryId} key={a.inventoryId} onClick={this.onImageClick}/>;
            }
        })

        return (
            <div id="CharComp" >
              {itemContainer}
            </div>
        )
    }
}

export default CharComp;