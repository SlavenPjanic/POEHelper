import React, {Component} from "react";

class CharComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          accntName: this.props.accntName,
          charName: this.props.charName,
          currentItems: [],
          itemInfo: "",
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
      }

      createImages = () =>{

        for(let i = 0; i < this.state.currentItems.length; i++){
            //dont need MainInventory
            if(this.state.currentItems[i].inventoryId !== "MainInventory"){
                //find where to place the item 
                let pos;
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
    }

    componentDidMount() {
        console.log(this.state.accntName + "  " + this.state.charName)
        fetch("https://www.pathofexile.com/character-window/get-items?accountName=" + this.state.accntName + "&character=" + this.state.charName)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              currentItems: result.items,
            });
            this.createImages();
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

    onImageClick = (event) => {
        // grab implicitMods and explicitMods and craftedMods and enchantMods, seperate them as well
    }

    render(){
        return (
            <div>
                <button onClick={() => this.onReturnClick(0)}>Choose new Character</button>
                <button onClick={() => this.onReturnClick(2)}>Choose new Account</button>
                <img src={this.state.inventoryImages[0].src} key="Weapon" alt="Weapon" onClick={this.onImageClick}/>
                <img src={this.state.inventoryImages[1].src} key="Helm" alt="Helm" onClick={this.onImageClick}/>
                <img src={this.state.inventoryImages[2].src} key="BodyArmour" alt="BodyArmour" onClick={this.onImageClick}/>
                <img src={this.state.inventoryImages[3].src} key="Offhand" alt="Offhand" onClick={this.onImageClick}/>
                <img src={this.state.inventoryImages[4].src} key="Amulet" alt="Amulet" onClick={this.onImageClick}/>
                <img src={this.state.inventoryImages[5].src} key="Ring" alt="Left Ring" onClick={this.onImageClick}/>
                <img src={this.state.inventoryImages[6].src} key="Ring2" alt="Right Ring" onClick={this.onImageClick}/>
                <img src={this.state.inventoryImages[7].src} key="Gloves" alt="Gloves" onClick={this.onImageClick}/>
                <img src={this.state.inventoryImages[8].src} key="Belt" alt="Belt" onClick={this.onImageClick}/>
                <img src={this.state.inventoryImages[9].src} key="Boots" alt="Boots" onClick={this.onImageClick}/>
                <img src={this.state.inventoryImages[10].src} key="Flask0" alt="First Flask" onClick={this.onImageClick}/>
                <img src={this.state.inventoryImages[11].src} key="Flask1" alt="Second Flask" onClick={this.onImageClick}/>
                <img src={this.state.inventoryImages[12].src} key="Flask2" alt="Third Flask" onClick={this.onImageClick}/>
                <img src={this.state.inventoryImages[13].src} key="Flask3" alt="Fourth Flask" onClick={this.onImageClick}/>
                <img src={this.state.inventoryImages[14].src} key="Flask4" alt="Fifth Flask" onClick={this.onImageClick}/>
                <textarea >{this.state.itemInfo}</textarea>
            </div>
        )
    }
}

export default CharComp;