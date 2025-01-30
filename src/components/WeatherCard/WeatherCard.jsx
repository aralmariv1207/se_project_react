import sunny from "../../images/sunny.png"

function WeatherCard() {
    return (
    <section className="weather-card">
        <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
        <img src={sunny} alt="sunny" className="weather-card__iimage" />
    </section>
    );
}



export default WeatherCard;