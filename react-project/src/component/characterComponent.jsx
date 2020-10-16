import React, {Component} from "react";

class CharComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          accntName: this.props.accntName,
          charName: this.props.charName
        };
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