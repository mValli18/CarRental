import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStorageService } from 'src/app/auth/services/storage/user-storage.service';

const BASIC_URL = environment['BASIC_URL'];

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient,) { }


  addCar(carDto: any): Observable<any> {
    return this.http
      .post<[]>(BASIC_URL + "api/admin/car", carDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Car posted successfully')),
        catchError(this.handleError<[]>('Error posting Car', []))
      );
  }

  getAllCars(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/admin/cars`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Cars Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Cars', []))
      );
  }

  getCarByCarId(carId): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/admin/car/${carId}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Car Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Car', []))
      );
  }

  putCarByCarId(carId: any, carDto: any): Observable<any> {
    return this.http
      .post<[]>(BASIC_URL + `api/admin/car/${carId}`, carDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Car Updated successfully')),
        catchError(this.handleError<[]>('Error updating Car', []))
      );
  }


  deleteCarByCarId(carId: any): Observable<any> {
    return this.http
      .delete<[]>(BASIC_URL + `api/admin/car/${carId}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Car Deleted successfully')),
        catchError(this.handleError<[]>('Error Deleting Car', []))
      );
  }

  searchCar(searchCarDto: any): Observable<any> {
    return this.http
      .post<[]>(BASIC_URL + "api/admin/car/search", searchCarDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Cars fetched successfully')),
        catchError(this.handleError<[]>('Error getting Cars', []))
      );
  }

  getBookings(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/admin/bookings`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Booking Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Bookings', []))
      );
  }

  changeBookingStatus(bookingId: number, status: string): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/admin/booking/${bookingId}/${status}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Booking status changed successfully')),
        catchError(this.handleError<[]>('Error changing Booking status.', []))
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
