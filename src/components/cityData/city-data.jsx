import React from 'react';
import tomorrowRequest from "../../api/tomorrow";
import classNames from 'classnames';
import Message from "../message";
import "./city-data.scss"
import Locale from "../../locale";

class CityData extends React.Component {
  state = {};

  loadCityComments() {
    this.setState({loading: true})
    tomorrowRequest.get(`/city/${this.props.cityNames}`)
      .then(response => {
      const city = response.data.data;
      this.setState({city, loading: false});
    })
      .catch(() => this.setState({message: 'NETWORK_ERROR', loading: false}));
  }

  componentDidMount() {
    this.loadCityComments();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.cityNames !== this.props.cityNames) {
      this.loadCityComments();
    }
  }

  render() {
    const {loading, message} = this.state;
    const locale = Locale.cityData;
    return (
      <div className={classNames('city-data', {'city-data__loading': loading})}>
        {message && <Message message={message}/>}
        {this.state.city && <div>
          <div className={'img-container'}>
            <div className={'display'}>
              <img className={'display_content'} alt={'фотография города'} src={`${this.state.city.urlPhoto}`}/>
            </div>
            <div className={'display'}>
              <img className={'display_content'} alt={'карта города'} src={`${this.state.city.urlMap}`}/>
            </div>
          </div>
          <div className={'about-city'}>
            <div className={'statistic-info'}>
              <div>{locale.foundationDate}{this.state.city.foundationDate}.</div>
              <div>{locale.population1}{this.state.city.population}{locale.population2}</div>
              <div>{locale.timezone}{this.state.city.timezone}</div>
            </div>
            <div>{this.state.city.referenceData}</div>
          </div>
        </div>}
        {!this.state.city &&
        <div className={'not-data'}>{locale.messageNotData}</div>}
      </div>
    );
  }
}

export default CityData;
