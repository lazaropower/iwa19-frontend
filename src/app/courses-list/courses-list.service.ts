import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from './course.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courseUrl = 'http://localhost:8080/restApi/courses';

  constructor(private http: HttpClient) { }

  /** GET contacts from the server */
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.courseUrl);
  }

  /** POST: add a new course to the server */
  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.courseUrl, course, httpOptions).pipe(
      tap((courseAdded: Course) => this.log(`added course id=${courseAdded.id}`)),
      catchError(this.handleError<Course>('addCourse'))
    );
  }

  /** GET course by id. Will 404 if id not found */
  getCourse(id: number): Observable<Course> {
    const url = `${this.courseUrl}/${id}`;
    return this.http.get<Course>(url).pipe(
      tap(_ => this.log(`fetched course id=${id}`)),
      catchError(this.handleError<Course>(`getCourse id=${id}`))
    );
  }

  /** DELETE: delete the course from the server */
  deleteCourse(course: Course | number): Observable<Course> {
    const id = typeof course === 'number' ? course : course.id;
    const url = `${this.courseUrl}/${id}`;
    return this.http.delete<Course>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted course id=${id}`)),
      catchError(this.handleError<Course>('deleteCourse'))
    );
  }

  /** PUT: update the course on the server */
  updateCourse(course: Course): Observable<any> {
    return this.http.put(this.courseUrl, course, httpOptions).pipe(
      tap(_ => this.log(`updated course id=${course.id}`)),
      catchError(this.handleError<any>('updateCourse'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a CourseService message with the MessageService */
  private log(message: string) {
    console.log('CourseService: ' + message);
  }
}
