import { Component } from '@angular/core';
import { BatchesComponent } from '../batches/batches.component';
import { InternsComponent } from '../interns/interns.component';

@Component({
  selector: 'app-mentor',
  standalone: true,
  imports: [BatchesComponent, InternsComponent],
  templateUrl: './mentor.component.html',
  styleUrl: './mentor.component.css',
})
export class MentorComponent {}
