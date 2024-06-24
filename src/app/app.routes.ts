import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MentorComponent } from './components/mentor/mentor.component';
import { InternComponent } from './components/intern/intern.component';
import { InternsComponent } from './components/interns/interns.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'mentor/batches', component: MentorComponent },
  { path: 'mentor/interns', component: InternsComponent },
  { path: 'intern/dashboard', component: InternComponent },
  { path: '**', component: PageNotFoundComponent },
];
