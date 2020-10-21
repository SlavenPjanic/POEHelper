import React, {Component} from "react";

class CharComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          accntName: this.props.accntName,
          charName: this.props.charName,
          currentItems: [],
          inventoryImages: [
              <img src="" id="Weapon"  alt="Weapon"/>,
              <img src="" id="Helm"  alt="Helm"/>,
              <img src="" id="BodyArmour"  alt="BodyArmour"/>,
              <img src="" id="Offhand"  alt="Offhand"/>,
              <img src="" id="Amulet"  alt="Amulet"/>,
              <img src="" id="Ring"  alt="Left Ring"/>,
              <img src="" id="Ring2"  alt="Right Ring"/>,
              <img src="" id="Gloves"  alt="Gloves"/>,
              <img src="" id="Belt"  alt="Belt"/>,
              <img src="" id="Boots"  alt="Boots"/>,
              <img src="" id="Flask0"  alt="First Flask"/>,
              <img src="" id="Flask1"  alt="Second Flask"/>,
              <img src="" id="Flask2"  alt="Third Flask"/>,
              <img src="" id="Flask3"  alt="Fourth Flask"/>,
              <img src="" id="Flask4"  alt="Fifth Flask"/>
          ]
        };
      }



    componentDidMount() {
        fetch("https://www.pathofexile.com/character-window/get-items?accountName=" + accntName + "&character=" + charName)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              currentItems: result,
              createImages();
            });
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

    createImages = () =>{

        for(let i = 0; i < this.state.currentItems.length; i++){
            let temp  = this.state.inventoryImages.indexOf(currentItems[i].inventoryId);
        }


    }

    onReturnClick = (returnCode) => {
        this.props.returnCallBack(returnCode);
    }

    render(){
        return (
            <div>
                <button onClick={() => this.onReturnClick(0)}>Choose new Character</button>
                <button onClick={() => this.onReturnClick(2)}>Choose new Account</button>
            </div>
        )
    }
}

export default CharComp;