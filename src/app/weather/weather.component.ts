import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherData } from './weather.interface';
import { WeatherDataService } from './weather-data.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent implements OnChanges {
  @Input() cityName: string = '';
  oneDayForecastData!: WeatherData;

  constructor(private weatherDataService: WeatherDataService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cityName'] && !changes['cityName'].firstChange) {
      this.getOneDayForecast();
    }
  }

  getOneDayForecast() {
    this.weatherDataService.getOneDayForecast(this.cityName).subscribe(
      (data) => {
        this.oneDayForecastData = data;
      },
      (error) => {
        console.log('Error fetching data: ', error);
      }
    );
  }

  getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  }
}
