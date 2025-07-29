import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _searchs: string[] = [];
  private giphyUrl: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = 'ttp2Ak1AjbLjO8A0KIVazeT4jtEjj6i9';
  public gifs: Gif[] = [];

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get searchs(): string[] {
    return [...this._searchs];
  }

  public addSearch(searchTerm: string): void {
    if (searchTerm.length === 0) return;
    this.organizeHistory(searchTerm);
    const httpParams = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', searchTerm)
      .set('limit', '10');
    this.http.get<SearchResponse>(`${this.giphyUrl}/search`, { params: httpParams })
      .subscribe(response => {
        this.gifs = response.data;
      })
  }

  private organizeHistory(searchTerm: string): void {
    searchTerm = searchTerm.toLowerCase();
    if (this._searchs.includes(searchTerm)) {
      this._searchs = this._searchs.filter(search => search !== searchTerm);
    }
    this._searchs.unshift(searchTerm);
    this._searchs = this._searchs.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._searchs));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    this._searchs = JSON.parse(localStorage.getItem('history')!);
    if (this._searchs.length === 0) return;
    this.addSearch(this._searchs[0]);
  }
}
