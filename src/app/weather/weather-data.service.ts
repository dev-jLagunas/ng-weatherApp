import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherData } from './weather.interface';
import { FiveDayForecast } from './weather.interface';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environments.prod';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  private apiKey: string = environment.apiKey;
  private oneDayForecastAPI: string =
    'https://api.openweathermap.org/data/2.5/weather?q=';
  private fiveDayForecastAPI: string =
    'https://api.openweathermap.org/data/2.5/forecast?q=';

  constructor(private http: HttpClient) {}

  getOneDayForecast(city: string): Observable<WeatherData> {
    const url = `${this.oneDayForecastAPI}${city}&appid=${this.apiKey}&units=metric`;

    return this.http.get(url).pipe(
      map((data: any) => {
        //transform and type-check data using interface
        const weatherData: WeatherData = {
          lon: data.coord.lon,
          lat: data.coord.lat,
          weather: {
            id: data.weather[0].id,
            main: data.weather[0].main,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
          },
          main: {
            temp: data.main.temp,
            feels_like: data.main.feels_like,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
          },
          wind: {
            speed: data.wind.speed,
          },
          dt: data.dt,
        };
        return weatherData;
      }),
      catchError((error: any) => {
        console.error('An error occurred: ', error);
        return throwError(
          () => new Error('Something went wrong. Please try again later.')
        );
      })
    );
  }

  getFiveDayForecast(city: string): Observable<FiveDayForecast[]> {
    const url = `${this.fiveDayForecastAPI}${city}&appid=${this.apiKey}&units=metric`;

    return this.http.get(url).pipe(
      map((data: any) => {
        // Filter and transform data using interface
        const filteredData: FiveDayForecast[] = data.list
          .filter((forecast: any) => forecast.dt_txt.includes('12:00:00'))
          .map((forecast: any) => {
            return {
              dt: forecast.dt,
              main: {
                temp: forecast.main.temp,
                feels_like: forecast.main.feels_like,
                pressure: forecast.main.pressure,
                humidity: forecast.main.humidity,
              },
              weather: {
                id: forecast.weather[0].id,
                main: forecast.weather[0].main,
                description: forecast.weather[0].description,
                icon: forecast.weather[0].icon,
              },
              wind: {
                speed: forecast.wind.speed,
              },
              dt_txt: forecast.dt_txt,
            };
          });
        return filteredData;
      }),
      catchError((error: any) => {
        console.error('An error occurred: ', error);
        return throwError(
          () => new Error('Something went wrong. Please try again later.')
        );
      })
    );
  }
}
