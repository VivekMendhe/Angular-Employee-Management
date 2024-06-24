import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InternFormComponent } from '../intern-form/intern-form.component';
import { Intern } from '../../types/intern';
import { InternService } from '../../services/intern.service';

@Component({
  selector: 'app-intern',
  standalone: true,
  imports: [FormsModule, InternFormComponent],
  templateUrl: './intern.component.html',
  styleUrl: './intern.component.css',
})
export class InternComponent {
  showEnrollForm: boolean = false;
  interns: Intern[] = [];

  constructor(private internService: InternService) {}

  ngOnInit(): void {
    this.getInterns();
  }

  getInterns(): void {
    this.internService.getInterns().subscribe((data) => {
      this.interns = data;
    });
  }

  openEnrollForm() {
    this.showEnrollForm = true;
  }

  closeEnrollForm() {
    this.showEnrollForm = false;
  }

  // addIntern(newIntern: Intern) {
  //   this.interns.unshift(newIntern);
  //   this.closeEnrollForm();
  // }

  // addIntern(newIntern: Intern) {
  //   this.internService.addIntern(newIntern).subscribe((intern) => {
  //     this.interns.unshift(intern);
  //     this.closeEnrollForm();
  //   });
  // }

  // addIntern(newIntern: Omit<Intern, 'batchID' | 'type' | 'remark'>) {
  //   this.internService.addIntern(newIntern).subscribe((intern) => {
  //     this.interns.unshift(intern);
  //     this.closeEnrollForm();
  //   });
  // }

  addIntern(newIntern: Partial<Intern>) {
    this.internService.addIntern(newIntern).subscribe((intern) => {
      this.interns.unshift(intern);
      this.closeEnrollForm();
    });
  }
}

// interns = [
//   {
//     name: 'John Doe',
//     college: 'ABC University',
//     email: 'john.doe@example.com',
//     city: 'New York',
//     contact: '123-456-7890',
//   },
//   {
//     name: 'Jane Smith',
//     college: 'XYZ University',
//     email: 'jane.smith@example.com',
//     city: 'Los Angeles',
//     contact: '987-654-3210',
//   },
//   // Add more intern profiles as needed
// ];
