import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ButtonComponent } from "./components/button/button.component";
import { IconComponent } from "./components/icon/icon.component";
import { IconsContainerComponent } from "./components/icons-container/icons-container.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, IconComponent, IconsContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'pepper';

  public ngOnInit() {
    initFlowbite();
  }
}
