import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment'

@Injectable()
export class ServiceBase {
  protected urlBase = environment.endpoint;
  protected path = "";

  constructor(protected http: HttpClient) {
 
  }

  get(header?: any, params?: HttpParams): Observable<any>{
    const url = this.urlBase + "/" + this.path;
    return this.http.get<any>(
      url, 
      { headers: header, 
      params
    });
  }


  post(request: any, header?: any): Observable<any> {
    const url = this.urlBase + "/" + this.path;
    return this
      .http
      .post<any>(
        url,
        request,
        { headers: header
      });
  }

  put(request: any, header?: any): Observable<any> {
    const url = this.urlBase + "/" + this.path;
    return this.http.put<void>(
      url,
      request,
      { headers: header
    });

  }

  delete(id?: number, header?: any): Observable<void> {
    const url = this.urlBase + "/" + this.path + "/" + id;
    return this.http.delete<void>(
      url, 
      { headers: header
    });
  }
}