import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    MatFormField,
    RouterOutlet,
    MatOption,
    MatSelect,
    MatLabel,
    MatToolbar,
    ReactiveFormsModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly cities = ['London', 'Paris', 'Moscow', 'New York', 'Karachi', 'Sydney'];

  cityControl: FormControl = new FormControl('');

  constructor(private router: Router) {}

  ngOnInit() {
    this.cityControl.valueChanges.subscribe((value) => {
      console.warn(value);
      this.router.navigate([value]);
    });
  }

  ngOnDestroy() {}
}
