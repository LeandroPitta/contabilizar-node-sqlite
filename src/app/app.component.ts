import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'contabilizar';

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      this.router.navigate(['']);
    }
  }
}