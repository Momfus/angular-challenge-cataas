import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Cat } from "../interfaces/cats.interface";
import { environment } from "@environments/environment";

@Injectable({
   providedIn: "root",
})
export class CatsService {
   private http = inject(HttpClient);

   getCats(skip: number, limit: number): Observable<Cat[]> {
    return this.http.get<Cat[]>(
      `${environment.catsBaseUrl}/api/cats?skip=${skip}&limit=${limit}`
    ).pipe(
      map(cats =>
        cats.map(cat => ({
          ...cat,
          imageUrl: `${environment.catsBaseUrl}/cat/${cat.id}`
        }))
      )
    );
  }

}
