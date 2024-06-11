import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progressBar.html',
  styleUrls: ['./progressBar.css']
})
export class ProgressBarComponent {
  @Input() step: number = 1;
}
