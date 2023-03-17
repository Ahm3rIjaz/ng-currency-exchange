import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  public heading = 'Oops! Page not found';
  public subheading = 'we are sorry, but the page you requested was not found';
}
