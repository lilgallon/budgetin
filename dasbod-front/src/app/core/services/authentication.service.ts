import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private readonly _client: HttpClient) {
  }

  public signIn(formData: FormData): Observable<HttpResponse<void>> {
    return this._client
      .post<void>('/api/sign-in', formData, {withCredentials: true, observe: 'response'})
  }
}
