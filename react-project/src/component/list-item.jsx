import React , {Component} from "react";
import cx from 'classnames'

class ListItem extends Component {
    // constructor(props){
    //     super(props);


    // }

    handleMouseOver = () => {
		this.props.onMouseOver(this.props.index)
	}

	handleChange = (ev: SyntheticMouseEvent<>) => {
		this.props.onChange({event: ev, index: this.props.index})
        //this.props.onChange(this.props.index);
	}



    render() {

		let props = this.props
        let classes = cx('react-list-select--item', {
                'is-disabled': props.disabled,
                'is-selected': props.selected,
                'is-focused': props.focused,
            })

        return(
			<li
				className={classes}
				onMouseOver={this.handleMouseOver}
				onClick={this.handleChange}
			>
				{props.children}
			</li>
        )
    }
}

export default ListItem;