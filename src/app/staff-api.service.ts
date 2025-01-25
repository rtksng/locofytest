import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffApiService {
  token: string = "Bearer " + localStorage.getItem('staffToken');
  constructor(private readonly http: HttpClient) { }

  // Get method
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url, { headers: { 'Content-Type': 'application/json', "Authorization": this.token } }).pipe(
      catchError(this.handleError)
    );
  }

  //Post method
  post<T>(url: string, body: any): Observable<any> {
    return this.http.post<any>(url, body, { headers: { 'Content-Type': 'application/json', "Authorization": this.token } }).pipe(
      catchError(this.handleError)
    );
  }

  // Delete method
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url, { headers: { 'Content-Type': 'application/json', "Authorization": this.token } }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else if (error.status === 0) {
      // Network error or server unreachable
      errorMessage = `Server unreachable: ${error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server returned code: ${error.status}, error message: ${error.message}`;
    }
    console.error('Error occurred:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
