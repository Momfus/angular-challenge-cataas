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

  /**
   * Fetches a list of cats from the API.
   * @returns {Observable<Cat[]>} An observable that emits an array of cats.
   */
  getCats(): Observable<Cat[]> {
    const limit = this._isFirstCall ? this._initialLimit : this._subsequentLimit;
    return this.http.get<Cat[]>(
      `${environment.catsBaseUrl}/api/cats?skip=${this._skip()}&limit=${limit}`
    ).pipe(
      map(cats =>
        cats.map(cat => {
          const votes = this.getCatVotes(cat.id);
          return {
            ...cat,
            imageUrl: `${environment.catsBaseUrl}/cat/${cat.id}`,
            votes,
          };
        })
      ),
      tap(newCats => {
        this._cats.update(current => [...current, ...newCats]);
        this._skip.update(current => current + limit);
        this._isFirstCall = false;
      })
    );
  }

  /**
   * Resets the state of the service.
   */
  resetState() {
    this._cats.set([]);
    this._skip.set(0);
    this._isFirstCall = true;
  }

  /**
   * Fetches a random cat from the API.
   * @returns {Observable<Cat>} An observable that emits a random cat.
   */
  getRandomCat(): Observable<Cat> {
    return this.http.get<any>(`${environment.catsBaseUrl}/cat?json=true`).pipe(
      map(response => ({
        id: response.id,
        tags: response.tags,
        mimetype: response.mimetype,
        createdAt: response.created_at,
        imageUrl: response.url,
      }))
    );
  }

  /**
   * Loads the cat vote list from local storage.
   * @returns {Cat[]} An array of cats with their votes.
   */
  private loadCatVoteList(): Cat[] {
    return JSON.parse(localStorage.getItem('catVoteList') || '[]') as Cat[];
  }

  /**
   * Loads the cat vote list from local storage and updates the signal.
   */
  private loadCatVoteListToSignal(): void {
    const catVoteList = this.sortCatVoteList(this.loadCatVoteList());
    this._catVoteList.set(catVoteList);
  }

  /**
   * Saves the cat vote list to local storage and updates the signal.
   * @param {Cat[]} cats - The list of cats to save.
   */
  private saveCatVoteList(cats: Cat[]): void {
    const sortedList = this.sortCatVoteList(cats);
    localStorage.setItem('catVoteList', JSON.stringify(sortedList));
    this._catVoteList.set(sortedList);
  }

  /**
   * Sorts the cat vote list by votes and creation date.
   * @param {Cat[]} cats - The list of cats to sort.
   * @returns {Cat[]} The sorted list of cats.
   */
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

  /**
   * Updates the vote count for a cat.
   * @param {Cat} cat - The cat to update.
   * @param {number} votes - The new vote count.
   */
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

  /**
   * Gets the vote count for a cat by its ID.
   * @param {string | undefined} id - The ID of the cat.
   * @returns {number} The vote count for the cat.
   */
  getCatVotes(id: string | undefined): number {
    if (!id) return 0;
    const cat = this._catVoteList().find(cat => cat.id === id);
    return cat?.votes ?? 0;
  }

  /**
   * Removes a cat from the vote list by its ID.
   * @param {string} id - The ID of the cat to remove.
   */
  removeCatVote(id: string): void {
    const updatedList = this._catVoteList().filter(cat => cat.id !== id);
    this.saveCatVoteList(updatedList);
  }

  /**
   * Checks if a cat exists in the vote list by its ID.
   * @param {string | undefined} id - The ID of the cat.
   * @returns {boolean} True if the cat exists in the vote list, false otherwise.
   */
  getExistCatInList(id: string | undefined): boolean {
    if (!id) return false;
    return this._catVoteList().some(cat => cat.id === id);
  }
}
