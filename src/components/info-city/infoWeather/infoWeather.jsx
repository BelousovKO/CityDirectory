import React from "react";
import "./infoWeather.scss"
import Locale from '../../../locale';

const InfoWeather = (props) => {
  const locale = Locale.infoWeather;
  return (
    <>{(props.temp || props.temp === 0) &&
    <div className={'info-weather'}>

      <div className={'info-weather_content'}>
        <div className={'temperature'}>{props.temp} &#176;С</div>
        <div className={'feels-like'}>{locale.feelsLike}{props.temp_feels_like} &#176;C</div>
        <div className={'pressure'}>{props.pressure}{locale.pressure}</div>
        <div className={'speed-wind'}>{locale.speedWind}{props.wind}{locale.speedWindMetric}</div>
        <div className={'wind-direction'}>{locale.windDirection}{props.deg}</div>
      </div>


    </div>}
      </>
  )
}

export default InfoWeather;
