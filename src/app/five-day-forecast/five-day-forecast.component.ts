import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiveDayForecast } from '../weather/weather.interface';
import { WeatherDataService } from '../weather/weather-data.service';

@Component({
  selector: 'app-five-day-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './five-day-forecast.component.html',
  styleUrl: './five-day-forecast.component.css',
})
export class FiveDayForecastComponent implements OnInit, OnChanges {
  @Input() cityName: string = '';
  fiveDayForecast: FiveDayForecast[] = [];

  constructor(private weatherService: WeatherDataService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cityName'] && !changes['cityName'].firstChange) {
      this.getFiveDayForecast();
    }
  }

  getFiveDayForecast() {
    this.weatherService.getFiveDayForecast(this.cityName).subscribe(
      (data) => {
        this.fiveDayForecast = data;
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }

  getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  }
}
