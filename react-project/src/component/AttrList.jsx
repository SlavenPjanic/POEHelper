import React, {Component} from "react";
import includes from 'lodash/includes'
import cx from 'classnames'
import ListItem from '../component/list-item';
import * as tradeAPI from './tradeCall';

class AttrList extends Component {
    constructor(props){
        super(props);
        this.state = {
            mods: [],
            items: [],
            selected: [],
            selectedItems: [],
            disabledItems: [],
            disabled: [],
            trade: []
        };

        this.findItem = this.findItem.bind(this);
    }

    componentDidMount(props){
        this.setState({
            disabledItems: [],
            items: this.props.item
            }, () => this.createModList());
        
    }

    componentDidUpdate(prevProps){
      if(this.props.item.id !== prevProps.item.id) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
      {
        this.setState({
            disabledItems: [],
            items: this.props.item
            }, () => this.createModList());
      }
    }

    assignModType(modList, type){
        let newModList = modList.map(element => {
            return {
                modText: element,
                modType: type
            }
        })

        return newModList;
    }

    createModList(){

        let mods = [];
        //check which mods are present
        //Implicit
        if(this.state.items.hasOwnProperty('implicitMods')){
            //add a header with Implicit Mods and disable it
            mods.push({modText: "Implicit Mods", modType: "TITLE"});
            this.state.disabledItems.push(mods.length - 1);
            //loop through the implicit mods and add to the list
            let newModList = this.assignModType(this.state.items.implicitMods, 'Implicit');

            mods.push(...newModList);

        }
        if(this.state.items.hasOwnProperty('explicitMods')){
            mods.push({modText: "Explicit Mods", modType: "TITLE"});
            this.state.disabledItems.push(mods.length - 1);
            let newModList = this.assignModType(this.state.items.explicitMods, 'Explicit');

            mods.push(...newModList);
        }

        this.setState({
            mods: mods
        })
    }

    componentWillReceiveProps(nextProps) {

        this.setState({ items: this.props.item,
                        disabledItems: [] ,
                        selectedItems: []
                    }, () => this.createModList());  
    }

    listClick(index){
        
        if (index === null || index === 0) {
			return
		}

        //check if it's already selected
        if(!includes(this.state.selected, index)){
            this.setState(state => {
                let list = [index];
                list = list.concat(state.selected);

                return {selected: list};
                });

                //add is-selected class name

        }else if(includes(this.state.selected, index)){
            this.setState(state =>{
                let list = state.selected;
                let ind = list.indexOf(index);
                
                if(ind > -1){
                 list.splice(ind, 1);   
                }

                return {selected: list};
            });
        }

    }

    selectIndex(index){
        if(index === null){
            return;
        }

        if(includes(this.state.disabledItems, index)){
            return;
        }

        let temp = this.state.selectedItems;
        temp.push(index);

        this.setState({selectedItems: temp});
    }

    deselectIndex(index){
        if(index === null){
            return;
        }

        if(includes(this.state.disabledItems, index)){
            return;
        }

        let temp = this.state.selectedItems;
        let arrindex = temp.indexOf(index);

        if(arrindex > -1){
            temp.splice(arrindex, 1);
        }

        this.setState({selectedItems: temp});
    }

    handleClick = (args: {
		event: SyntheticMouseEvent<>,
		index: number,
    }) => {
        
		let {event, index} = args;
		event.preventDefault();
        
        //determine if it is already selected
        if(!includes(this.state.selectedItems, index)){
            this.selectIndex(index);
        }else{
            this.deselectIndex(index);
        }
    }

    focusIndex = (index: null | number = null) => {
		this.setState(state => {
			if (index === null) {
				return {}
			}

			let {focusedIndex, disabledItems} = state

			if (!includes(disabledItems, index) && typeof index === 'number') {
				focusedIndex = index
			}

			return {focusedIndex}
		})
	}

    async findItem(){

        let mods = [];

        //item type, item class, 
        for(let i = 0; i < this.state.selectedItems.length; i++){
            mods.push(this.state.mods[this.state.selectedItems[i]]);
        }
        let response = await tradeAPI.tradeAPICall(mods, this.state.items);

        this.setState({trade: response});

    }

    render() {

        
		let items = this.state.mods.map((itemContent, index) => {
			let disabled = includes(this.state.disabledItems, index)
			let selected = includes(this.state.selectedItems, index)
			let focused = this.state.focusedIndex === index

			return (
				<ListItem
					key={index}
					index={index}
					disabled={disabled}
					selected={selected}
					focused={focused}
					onMouseOver={this.focusIndex}
					onChange={this.handleClick}
				>
					{itemContent.modText}
				</ListItem>
			)
		})

        return(
            <div>
            <ul className={cx('react-list-select')}>
                {items}
            </ul>
                <button type="submit" value="Find Replacement" onClick={this.findItem}>Find Item</button>
            </div>
        )
    }
}

export default AttrList;