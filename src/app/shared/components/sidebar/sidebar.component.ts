import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) {}

  public get searchs(): string[] {
    return this.gifsService.searchs;
  }

  public searchGifs(search: string): void {
    this.gifsService.addSearch(search);
  }
}
