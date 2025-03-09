import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { Cat } from "../interfaces/cats.interface";
import { environment } from "@environments/environment";

@Injectable({
   providedIn: "root",
})
export class CatsService {
   private http = inject(HttpClient);

   private _cats = signal<Cat[]>([]);
   private _skip = signal<number>(0);
   private _limit = 16;

   cats = this._cats.asReadonly();
   skip = this._skip.asReadonly();

   getCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>(
      `${environment.catsBaseUrl}/api/cats?skip=${this._skip()}&limit=${this._limit}`
    ).pipe(
      map(cats =>
        cats.map(cat => ({
          ...cat,
          imageUrl: `${environment.catsBaseUrl}/cat/${cat.id}`
        }))
      ),
      tap(newCats => {
        this._cats.update(current => [...current, ...newCats]);
        this._skip.update(current => current + this._limit);
      })
    );
  }

  resetState() {
    this._cats.set([]);
    this._skip.set(0);
  }

}
