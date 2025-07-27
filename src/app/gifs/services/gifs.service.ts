import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _searchs: string[] = [];

  constructor(private http: HttpClient) { }

  get searchs(): string[] {
    return [...this._searchs];
  }

  public addSearch(searchTerm: string): void {
    if (searchTerm.length === 0) return;
    this.organizeHistory(searchTerm);
    this.http.get(`http://api.giphy.com/v1/gifs/search?api_key=ttp2Ak1AjbLjO8A0KIVazeT4jtEjj6i9&q=asdf`)
      .subscribe(console.log)
  }

  private organizeHistory(searchTerm: string): void {
    searchTerm = searchTerm.toLowerCase();
    if (this._searchs.includes(searchTerm)) {
      this._searchs = this._searchs.filter(search => search !== searchTerm);
    }
    this._searchs.unshift(searchTerm);
    this._searchs = this._searchs.splice(0, 10);
  }
}
