import React from "react";
import "./Info-city.scss";
import InfoWeather from "./infoWeather/infoWeather";
import CommentList from "../comments-list/comment-list";
import CityData from "../cityData/city-data";
import Locale from '../../locale';
import Input from "./input/Input";

class InfoCity extends React.Component {

  /*API_KEY = "105522893c90749b32e266347a41b760";*/
  /*API_KEY = "b41b79516e1a647fca6bac5a9c98c48e";*/
  API_KEY = "73d34f2396630c2ff3fa7956af4d85d6";

  state = {
    enteredCityName: this.props.cityName,
    temp: undefined,
    temp_feels_like: undefined,
    name: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    wind: undefined,
    deg: undefined,
    error: undefined,
  }

  componentDidMount() {
    this.getWeather(this.props.cityName);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.cityName !== this.props.cityName && this.props.cityName !== '') {
      this.getWeather(this.props.cityName);
    }
  }


  getWeather = async (cityName) => {
    if (cityName) {
      this.setState({enteredCityName: cityName})
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${this.API_KEY}&units=metric`)
        .then(r => r.json())
        .then(response => {
          const dataWeather = response;
          if (dataWeather.cod !== "404") {
            let pressureRS = Math.round(dataWeather.main.pressure / 1.333);
            let temper = Math.round(dataWeather.main.temp);
            let temper_feels_like = Math.round(dataWeather.main.feels_like);

            let directionOfTheWind;
            switch (true) {
              case dataWeather.wind.deg <= 22.5 || dataWeather.wind.deg > 337.5:
                directionOfTheWind = "северный";
                break;
              case dataWeather.wind.deg > 22.5 && dataWeather.wind.deg <= 67.5:
                directionOfTheWind = "северо-восточный";
                break;
              case dataWeather.wind.deg > 67.5 && dataWeather.wind.deg <= 112.5:
                directionOfTheWind = "восточный";
                break;
              case dataWeather.wind.deg > 112.5 && dataWeather.wind.deg <= 157.5:
                directionOfTheWind = "юго-восточный";
                break;
              case dataWeather.wind.deg > 157.5 && dataWeather.wind.deg <= 202.5:
                directionOfTheWind = "южный";
                break;
              case dataWeather.wind.deg > 202.5 && dataWeather.wind.deg <= 247.5:
                directionOfTheWind = "юго-западный";
                break;
              case dataWeather.wind.deg > 247.5 && dataWeather.wind.deg <= 292.5:
                directionOfTheWind = "западный";
                break;
              case dataWeather.wind.deg > 292.5 && dataWeather.wind.deg <= 337.5:
                directionOfTheWind = "Северо-западный";
                break;
              default:
                directionOfTheWind = "некорректные данные";
            }

            this.setState({
              enteredCityName: dataWeather.name,
              temp: temper,
              temp_feels_like: temper_feels_like,
              name: dataWeather.name,
              country: dataWeather.sys.country,
              wind: dataWeather.wind.speed,
              deg: directionOfTheWind,
              pressure: pressureRS,
              error: "",
            })
          } else {
            this.setState({error: true})
          }
        })
        .catch(error => {
        });
    }
  }

  render() {

    const locale = Locale.infoCity;

    return (
      <div>
        {this.state.error ||
        <div className={'info-city'}>
          <h2>{locale.title}</h2>

          <Input enteredCityName={this.props.cityName}/>

          {this.state.enteredCityName &&

          <CityData cityNames={this.state.enteredCityName}/>}

          <div className={'infoWeatherAndCommentList'}>

            <InfoWeather name={this.state.name}
                         temp_feels_like={this.state.temp_feels_like}
                         temp={this.state.temp}
                         country={this.state.country}
                         wind={this.state.wind}
                         deg={this.state.deg}
                         pressure={this.state.pressure}
                         error={this.state.error}/>

            {this.state.enteredCityName &&
            <div className={'comment-display'}>

              <CommentList cityNames={this.state.enteredCityName}
                           userNames={this.props.userNames}
                           userId={this.props.userId}
                           admin={this.props.admin}/>

            </div>}
          </div>
        </div>}
        {this.state.error && <div>

          <Input getWeather={this.getWeather}/>

          <div className={'city-not-found'}>{locale.messageCityNotFound}</div>
        </div>}
      </div>
    )
  }
}

export default InfoCity;
