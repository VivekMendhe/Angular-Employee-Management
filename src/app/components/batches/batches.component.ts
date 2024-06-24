import { Component } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { BatchFormComponent } from '../batch-form/batch-form.component';
import { Batch } from '../../types/batch';
import { BatchService } from '../../services/batch.service';

@Component({
  selector: 'app-batches',
  standalone: true,
  imports: [FormsModule, BatchFormComponent],
  templateUrl: './batches.component.html',
  styleUrl: './batches.component.css',
})
export class BatchesComponent {
  showAddBatchForm: boolean = false;
  shownDescriptionIndex: number | null = null; // Track the shown description index

  batches: Batch[] = [];

  constructor(private batchService: BatchService) {}

  ngOnInit(): void {
    this.getBatches();
  }

  getBatches(): void {
    this.batchService.getBatches().subscribe((data) => {
      this.batches = data;
    });
  }

  // getBatches(): void {
  //   this.batchService.getBatches().subscribe((data) => {
  //     this.batches = data.map((item) => ({ ...item, isExpanded: false }));
  //   });
  // }

  openAddBatchForm() {
    this.showAddBatchForm = true;
  }

  closeAddBatchForm() {
    this.showAddBatchForm = false;
  }

  // addBatch(newBatch: any) {
  //   this.batches.push(newBatch);
  //   this.showAddBatchForm = false;
  // }

  addBatch(newBatch: Batch) {
    this.batchService.addBatch(newBatch).subscribe((batch) => {
      this.batches.push(batch);
      this.showAddBatchForm = false;
    });
  }

  toggleDescription(index: number) {
    this.shownDescriptionIndex =
      this.shownDescriptionIndex === index ? null : index;
  }
}

// batches = [
//   {
//     id: 1,
//     title: 'Frontend Project',
//     description: 'Dive into the fundamentals of HTML, CSS, and JavaScript.',
//   },
//   {
//     id: 2,
//     title: 'Frontend Framework exploration',
//     description:
//       'Explore modern frameworks like Bootstrap and React for front-end development.',
//   },
//   {
//     id: 3,
//     title: 'DSA',
//     description:
//       'Dive into machine learning algorithms and their applications in real-world scenarios.',
//   },
//   {
//     id: 4,
//     title: 'APP development',
//     description:
//       'Build and deploy your own mobile app projects on iOS and Android devices.',
//   },
// ];
