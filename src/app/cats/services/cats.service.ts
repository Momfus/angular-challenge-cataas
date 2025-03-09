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
  private _initialLimit = 36;
  private _subsequentLimit = 20;
  private _isFirstCall = true;
  private _catVoteList = signal<Cat[]>(this.loadCatVoteList());
  private _catListName = 'catVoteList'

  cats = this._cats.asReadonly();
  skip = this._skip.asReadonly();
  catVoteList = this._catVoteList.asReadonly();


  getCats(): Observable<Cat[]> {
    const limit = this._isFirstCall ? this._initialLimit : this._subsequentLimit;
    return this.http.get<Cat[]>(
      `${environment.catsBaseUrl}/api/cats?skip=${this._skip()}&limit=${limit}`
    ).pipe(
      map(cats =>
        cats.map(cat => ({
          ...cat,
          imageUrl: `${environment.catsBaseUrl}/cat/${cat.id}`
        }))
      ),
      tap(newCats => {
        this._cats.update(current => [...current, ...newCats]);
        this._skip.update(current => current + limit);
        this._isFirstCall = false;
      })
    );
  }

  resetState() {
    this._cats.set([]);
    this._skip.set(0);
    this._isFirstCall = true;
  }

  // Localstorage persistence functions
  private loadCatVoteList(): Cat[] {
    return JSON.parse(localStorage.getItem(this._catListName) || '[]') as Cat[];
  }

  private saveCatVoteList(cats: Cat[]): void {
    localStorage.setItem(this._catListName, JSON.stringify(cats));
  }


  updateCatVote(cat: Cat, votes: number): void {
    const catVoteList = JSON.parse(localStorage.getItem(this._catListName) || '[]') as Cat[];
    const index = catVoteList.findIndex(newCat => newCat.id === cat.id);

    if( index === -1 ) {
      catVoteList.push({ ...cat, votes });
    } else {
      catVoteList[index].votes = votes;
    }

    this.saveCatVoteList(catVoteList);
    this._catVoteList.set(catVoteList);
  }

  getCatVotes(id: string): number {
    const catVoteList = JSON.parse(localStorage.getItem(this._catListName) || '[]') as Cat[];
    const cat = catVoteList.find(cat => cat.id === id);
    return cat?.votes ?? 0;
  }

  removeCatVote(id: string): void {
    const catVoteList = JSON.parse(localStorage.getItem(this._catListName) || '[]') as Cat[];
    const updatedList = catVoteList.filter(cat => cat.id !== id);
    this.saveCatVoteList(updatedList);
    this._catVoteList.set(updatedList);
  }
}
