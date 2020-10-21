import React, {Component} from "react";

class CharComp extends Component {
    constructor(props) {
        super(props);

        let itemRef = new Array(15);

        this.state = {
          error: null,
          accntName: this.props.accntName,
          charName: this.props.charName,
          currentItems: [],
          inventoryImages: [
              <img src="" id="Weapon" ref={(input) => {itemRef[0] = input}} alt="Weapon"/>,
              <img src="" id="Helm" ref={(input) => {itemRef[1] = input}} alt="Helm"/>,
              <img src="" id="BodyArmour" ref={(input) => {itemRef[2] = input}} alt="BodyArmour"/>,
              <img src="" id="Offhand" ref={(input) => {itemRef[3] = input}} alt="Offhand"/>,
              <img src="" id="Amulet" ref={(input) => {itemRef[4] = input}} alt="Amulet"/>,
              <img src="" id="Ring" ref={(input) => {itemRef[5] = input}} alt="Left Ring"/>,
              <img src="" id="Ring2" ref={(input) => {itemRef[6] = input}} alt="Right Ring"/>,
              <img src="" id="Gloves" ref={(input) => {itemRef[7] = input}} alt="Gloves"/>,
              <img src="" id="Belt" ref={(input) => {itemRef[8] = input}} alt="Belt"/>,
              <img src="" id="Boots" ref={(input) => {itemRef[9] = input}} alt="Boots"/>,
              <img src="" id="Flask0" ref={(input) => {itemRef[10] = input}} alt="First Flask"/>,
              <img src="" id="Flask1" ref={(input) => {itemRef[11] = input}} alt="Second Flask"/>,
              <img src="" id="Flask2" ref={(input) => {itemRef[12] = input}} alt="Third Flask"/>,
              <img src="" id="Flask3" ref={(input) => {itemRef[13] = input}} alt="Fourth Flask"/>,
              <img src="" id="Flask4" ref={(input) => {itemRef[14] = input}} alt="Fifth Flask"/>
          ]
        };
      }



    componentDidMount() {
        console.log(this.state.accntName + "  " + this.state.charName)
        fetch("https://www.pathofexile.com/character-window/get-items?accountName=" + this.state.accntName + "&character=" + this.state.charName)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              currentItems: result,
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

    createImages = () =>{

        // for(let i = 0; i < this.state.currentItems.length; i++){
        //     let temp  = this.state.inventoryImages.indexOf(currentItems[i].inventoryId);
        // }
        //go thru json
        //find the 

    }

    onReturnClick = (returnCode) => {
        console.log(this.state.inventoryImages);
        console.log(this.itemRef);
        //this.props.returnCallBack(returnCode);
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