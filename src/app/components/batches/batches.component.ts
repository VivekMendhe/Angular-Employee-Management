import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BatchFormComponent } from '../batch-form/batch-form.component';
import { Batch } from '../../types/batch';
import { BatchService } from '../../services/batch.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-batches',
  standalone: true,
  imports: [FormsModule, BatchFormComponent],
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css'],
})
export class BatchesComponent {
  showAddBatchForm: boolean = false;
  batches: Batch[] = [];
  expandedBatchIds: Set<number> = new Set<number>();

  constructor(
    private batchService: BatchService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getBatches();
  }

  getBatches(): void {
    this.batchService.getBatches().subscribe((data: Batch[]) => {
      this.batches = data;
    });
  }

  openAddBatchForm() {
    this.showAddBatchForm = true;
  }

  closeAddBatchForm() {
    this.showAddBatchForm = false;
  }

  addBatch(newBatch: Batch) {
    this.batchService.addBatch(newBatch).subscribe((batch) => {
      this.batches.push(batch);
      this.showAddBatchForm = false;
      this.showToast('Batch added successfully!');
    });
  }

  toggleDescription(batchId: number) {
    if (this.expandedBatchIds.has(batchId)) {
      this.expandedBatchIds.delete(batchId);
    } else {
      this.expandedBatchIds.add(batchId);
    }
  }

  isExpanded(batchId: number): boolean {
    return this.expandedBatchIds.has(batchId);
  }

  showToast(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
}
