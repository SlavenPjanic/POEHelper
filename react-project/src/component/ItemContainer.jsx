import React, {Component} from "react";

class ItemContainer extends Component {
        constructor(props) {
        super(props);

        this.state = {
          src: this.props.src,
          itemkey: this.props.itemkey,
        }
      }
      
    onImageClick = () => {
      this.props.onClick(this.props.itemkey);
    }

    render(){
        return(
          <div className={this.props.class}> 
            <img src={this.state.src} itemkey={this.state.itemkey} alt="" onClick={this.onImageClick}/>
          </div>
        )
    }
}

export default ItemContainer;