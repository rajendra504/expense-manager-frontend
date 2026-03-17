import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/navbar/navbar";
import { ToastContainer } from "./core/components/toast/toast-container/toast-container";
import { ParticlesService } from './shared/services/particles-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, ToastContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'expense-manager-frontend';
  constructor(private particles: ParticlesService) { }
  ngOnInit() { this.particles.init(); }
}
