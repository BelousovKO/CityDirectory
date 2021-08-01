import React from "react";
import './weatherInput.scss'
import Button from "../../button";
import Locale from "../../../locale";
import {NavLink} from "react-router-dom";

class Input extends React.Component {

  state = {
    enteredSearch: ''
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.enteredCityName !== this.props.enteredCityName &&
      this.props.enteredCityName !== '' &&
      this.props.enteredCityName !== undefined) {
      this.setState({enteredSearch: this.props.enteredCityName});
    }
  }

  handleInput = event => {
    if (event.target.value.length === 1) {
      let tempValue = event.target.value;
      if (tempValue.search(/\s/) !== -1) {
        event.target.value = '';
      }
    }
    this.setState({enteredSearch: event.target.value});
  }

  render() {
    const locale = Locale.infoCity;

    return (
      <div className={'search'}>
        <input type={'text'}
               className={'weatherInput'}
               name={'city'}
               value={this.state.enteredSearch}
               placeholder={locale.placeholderInput}
               onChange={this.handleInput}/>
        <NavLink to={`/cityInfo/${this.state.enteredSearch}`}>
          <Button label={locale.searchButton}/>
        </NavLink>
      </div>
    )
  }
}

export default Input;
