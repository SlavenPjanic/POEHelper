import React, {Component} from "react";
import CharComp from "./characterComponent"

class POEHelper extends Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          accntName: '',
          dropDownItems: [],
          filteredDropDown: [],
          dropDownLeague: [],
          selectedChar: '',
          renderView: 0,
          items: []
        };
        this.baseState = this.state;
      }

      createSelectedItems() { //create the character dropdown list and the league drop down list
          let holder = this.state.items.map(i => (
              <option key={i.name} value={i.name} league={i.league} >{i.name + ": lvl " 
              + i.level + " " + i.class + ", " + i.league + " league."}</option>
          ));

          //let leagueArray = this.state.items.map(x => (x.league));
          let leagueArray = [...new Set(this.state.items.map(x => (x.league)))];
          let holder2 = [<option key='All' value='All'> All </option> ];
          for(let x = 0; x < leagueArray.length; x++){
            holder2.push(<option key={leagueArray[x]} value={leagueArray[x]}> {leagueArray[x]} </option>)
          }

          this.setState({dropDownItems: holder});
          this.setState({filteredDropDown: holder});
          this.setState({dropDownLeague: holder2});
      }

      mySubmitHandler = (event) => { //API call to retrieve characters associated with account 
        event.preventDefault();
        fetch("https://www.pathofexile.com/character-window/get-characters?accountName=" + this.state.accntName)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result
            });
            this.createSelectedItems();
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

      myChangeHandler = (event) => {
        this.setState({accntName: event.target.value});
      }

      onDropdownSelected = (event) => {
        this.setState({selectedChar: event.target.value});
      }
      
      onLeagueSelected = (event) => { //filters Leagues
        if(event.target.value === 'All'){
          this.setState({filteredDropDown: this.state.dropDownItems});
        }
        else{
          this.setState({filteredDropDown: this.state.dropDownItems.filter(league => league.props.league === event.target.value)});
        }
      }

      onLoadCharacter = () => {
        this.setState({renderView: 1});
      }

      returnCallBack = (returnCode) => {
        if(returnCode === 2){
          this.setState(this.baseState);
        }else{
          this.setState({renderView: returnCode});
        }
      }

      render() {

        let charSelect, leagueSelect, loadCharButton;
        if(this.state.isLoaded){
          charSelect = <select type="select" onChange={this.onDropdownSelected} label="Select Character"> {this.state.filteredDropDown} </select>;
          leagueSelect = <select  type="select" onChange={this.onLeagueSelected} > {this.state.dropDownLeague} </select>;     
          loadCharButton = <button onClick={this.onLoadCharacter}>Load Character</button>
        }
        
        switch (this.state.renderView){
          case 1:
            return <CharComp accntName={this.state.accntName} charName={this.state.selectedChar} returnCallBack={this.returnCallBack}/>;
          default:
            return (
              <form onSubmit={this.mySubmitHandler}>
                  <input type="text" defaultValue={this.state.accntName} onChange={this.myChangeHandler} />
                  <input type="submit" />
                  
                  <div className="char-select">
                  {charSelect}
                  {leagueSelect}
                  {loadCharButton}
                  </div>
              </form>
              )
        }

      }
    
    }


export default POEHelper;