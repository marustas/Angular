import { Component } from '@angular/core';
import { MatSelect, MatFormField, MatOption } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-home',
  imports: [MatToolbar, MatSelect, MatFormField, MatOption],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
