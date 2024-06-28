import { Component, ViewChild } from '@angular/core';
import { InternFormComponent } from '../intern-form/intern-form.component';
import { FormsModule } from '@angular/forms';
import { Intern } from '../../types/intern';
import { InternService } from '../../services/intern.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-interns',
  standalone: true,
  imports: [
    InternFormComponent,
    FormsModule,
    MatPaginator,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
  ],
  templateUrl: './interns.component.html',
  styleUrl: './interns.component.css',
})
export class InternsComponent {
  interns: Intern[] = [];
  showAddBatchForm = false;
  isMentor = false;

  showEditForm = false;
  currentIntern: Intern | null = null;

  pagedInterns = new MatTableDataSource<Intern>([]);
  displayedColumns: string[] = [
    'name',
    'email',
    'contact',
    'type',
    'remark',
    'edit',
    'delete',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private internService: InternService,
    private snackBar: MatSnackBar
  ) {
    this.isMentor = this.checkIfMentor();
  }

  ngOnInit(): void {
    this.getInterns();
    this.pagedInterns.paginator = this.paginator;
  }

  checkIfMentor(): boolean {
    const userRole = 'mentor';
    return userRole === 'mentor';
  }

  getInterns(): void {
    this.internService.getInterns().subscribe((data) => {
      this.interns = data;
      this.pagedInterns.data = this.interns;
    });
  }

  openAddForm(): void {
    this.showAddBatchForm = true;
    this.showEditForm = false;
    this.currentIntern = null;
  }

  openEditForm(intern: Intern): void {
    this.showEditForm = true;
    this.showAddBatchForm = false;
    this.currentIntern = intern;
  }

  closeForm(): void {
    this.showAddBatchForm = false;
    this.showEditForm = false;
    this.currentIntern = null;
  }

  addIntern(newIntern: Partial<Intern>): void {
    try {
      const validIntern = this.validateInternData(newIntern);
      this.internService.addIntern(validIntern).subscribe((intern) => {
        this.interns.push(intern);
        this.closeForm();
        this.showToast('Intern added successfully!', 'green');
      });
    } catch (error: any) {
      console.error(error.message);
      this.showToast(error.message, 'red');
    }
  }

  editIntern(intern: Intern) {
    this.currentIntern = { ...intern };
    this.showEditForm = true;
  }

  updateIntern(updatedIntern: Intern): void {
    this.internService
      .updateIntern(updatedIntern.id!, updatedIntern)
      .subscribe((intern) => {
        const index = this.interns.findIndex((i) => i.id === intern.id);
        if (index !== -1) {
          this.interns[index] = intern;
        }
        this.pagedInterns.data = this.interns;
        this.closeForm();
        this.showToast('Intern updated successfully!', 'green');
      });
  }

  deleteIntern(id: number): void {
    this.internService.deleteInternById(id).subscribe(() => {
      this.interns = this.interns.filter((intern) => intern.id !== id);
      this.pagedInterns.data = this.interns;
      this.showToast('Intern deleted successfully!', 'green');
    });
  }

  onPageChange(event: PageEvent) {
    this.pagedInterns.paginator = this.paginator;
  }

  showToast(message: string, color: 'green' | 'red') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: color === 'green' ? 'toast-success' : 'toast-error',
    });
  }

  validateInternData(intern: Partial<Intern>): Intern {
    if (
      !intern.name ||
      !intern.college ||
      !intern.email ||
      !intern.city ||
      !intern.contact
    ) {
      throw new Error('Missing required fields');
    }
    return intern as Intern;
  }
}

// interns = [
//   {
//     name: 'John Doe',
//     college: 'ABC University',
//     email: 'john.doe@example.com',
//     city: 'New York',
//     contact: '123-456-7890',
//     type: 'type',
//     remark: 'remark',
//   },
//   {
//     name: 'Jane Smith',
//     college: 'XYZ University',
//     email: 'jane.smith@example.com',
//     city: 'Los Angeles',
//     contact: '987-654-3210',
//     type: 'type',
//     remark: 'remark',
//   },
//   // Add more intern profiles as needed
// ];
