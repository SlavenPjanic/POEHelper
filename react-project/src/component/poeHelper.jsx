import React, {Component} from "react";
import CharComp from "./CharacterComponent"
import AcctSearch from "./AcctSearch"
import AttrList from "./AttrList"

class POEHelper extends Component{
    constructor(props) {
        super(props);
        this.state = {
          accntName: "",
          charName: "",
          item: [],
          disabled: [],
          charSelected: false,
          itemSelected: false
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onItemSelect = this.onItemSelect.bind(this);
      }

      onFormSubmit(error, accntName, charName) {
        
        if(error === null){

          this.setState({
          accntName: accntName,
          charName: charName,
          itemSelected: false,
          charSelected: true
          });
        }

      }

      onItemSelect = (item) => {

        this.setState({
          itemSelected: true,
          item: item
          });

      }

      render() {

        return (
          <div>
            <AcctSearch onFormSubmit={this.onFormSubmit} />
            {this.state.charSelected && <CharComp accntName={this.state.accntName} charName={this.state.charName} onItemSelect={this.onItemSelect}/> }
            {this.state.itemSelected && <AttrList item={this.state.item} />}
          </div>
          )

      }
    
    }


export default POEHelper;