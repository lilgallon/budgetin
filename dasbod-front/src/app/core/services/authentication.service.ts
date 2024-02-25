import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private readonly _client: HttpClient) {
  }

  public signIn(username: string, password: string): Observable<unknown> {
    return this._client
      .post('signIn', JSON.stringify({username, password}))
  }
}
