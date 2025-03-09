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
  private _catVoteList = signal<Cat[]>([]);

  cats = this._cats.asReadonly();
  skip = this._skip.asReadonly();
  catVoteList = this._catVoteList.asReadonly();

  constructor() {
    this.loadCatVoteListToSignal();
  }

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

  private loadCatVoteList(): Cat[] {
    return JSON.parse(localStorage.getItem('catVoteList') || '[]') as Cat[];
  }

  private loadCatVoteListToSignal(): void {
    const catVoteList = this.sortCatVoteList(this.loadCatVoteList());
    this._catVoteList.set(catVoteList);
  }

  private saveCatVoteList(cats: Cat[]): void {
    const sortedList = this.sortCatVoteList(cats);
    localStorage.setItem('catVoteList', JSON.stringify(sortedList));
    this._catVoteList.set(sortedList);
  }

  private sortCatVoteList(cats: Cat[]): Cat[] {
    return cats.sort((a, b) => {
      const aVotes = a.votes || 0;
      const bVotes = b.votes || 0;

      if (bVotes !== aVotes) return bVotes - aVotes;

      if (b.createdAt && a.createdAt && b.createdAt !== a.createdAt) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }

      return cats.indexOf(a) - cats.indexOf(b);
    });
  }

  updateCatVote(cat: Cat, votes: number): void {
    const catVoteList = this.loadCatVoteList();
    const index = catVoteList.findIndex(newCat => newCat.id === cat.id);

    if (index === -1) {
      catVoteList.push({ ...cat, votes });
    } else {
      catVoteList[index].votes = votes;
    }

    this.saveCatVoteList(catVoteList);
  }

  getCatVotes(id: string | undefined): number {
    if (!id) return 0;
    const cat = this._catVoteList().find(cat => cat.id === id);
    return cat?.votes ?? 0;
  }

  removeCatVote(id: string): void {
    const updatedList = this._catVoteList().filter(cat => cat.id !== id);
    this.saveCatVoteList(updatedList);
  }

  getExistCatInList(id: string | undefined): boolean {
    if (!id) return false;
    return this._catVoteList().some(cat => cat.id === id);
  }
}
