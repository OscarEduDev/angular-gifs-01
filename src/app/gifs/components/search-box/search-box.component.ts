import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {
  @ViewChild('inputRef')
  public inputRef!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  public search(): void {
    this.gifsService.addSearch(this.inputRef.nativeElement.value)
    this.inputRef.nativeElement.value = '';
  }
}
