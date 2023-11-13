import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { FiveDayForecastComponent } from './five-day-forecast/five-day-forecast.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    WeatherComponent,
    FiveDayForecastComponent,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userEnteredCity: string = '';

  onGetWeather(formValue: { cityName: string }) {
    const cityName = formValue.cityName;
    this.userEnteredCity = cityName;
  }
}
