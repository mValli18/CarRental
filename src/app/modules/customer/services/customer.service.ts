import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserStorageService } from 'src/app/auth/services/storage/user-storage.service';
import { environment } from 'src/environments/environment';

const BASIC_URL = environment['BASIC_URL'];

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient,) { }

  getAllCars(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + "api/customer/cars", {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Cars Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Cars', []))
      );
  }

  getCarByCarId(carId): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/customer/car/${carId}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Car Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Car', []))
      );
  }

  bookACar(carId: any, bookCarDto: any): Observable<any> {
    return this.http
      .post<[]>(BASIC_URL + `api/customer/car/book/${carId}`, bookCarDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Car Booked Successfully')),
        catchError(this.handleError<[]>('Error booking Car', []))
      );
  }

  getBookedCarsByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http
      .get<[]>(BASIC_URL + `api/customer/car/booked/${userId}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Booked Cars Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Booked Cars', []))
      );
  }

  searchCar(searchCarDto: any): Observable<any> {
    return this.http
      .post<[]>(BASIC_URL + "api/customer/car/search", searchCarDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Cars fetched successfully')),
        catchError(this.handleError<[]>('Error getting Cars', []))
      );
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }

  log(message: string): void {
    console.log(`User Auth Service: ${message}`);
  }

  handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
