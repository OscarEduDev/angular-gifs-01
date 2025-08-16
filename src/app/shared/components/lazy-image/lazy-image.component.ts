import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string;

  @Input()
  public alt?: string;
  public isLoading: boolean = true;

  ngOnInit(): void {
    if (!this.url) {
      throw new Error('LazyImageComponent: URL input is required');
    }
  }

  showImage(): void {
    // setTimeout(() => {
    // }, 1000)
    this.isLoading = false;
  }
}
