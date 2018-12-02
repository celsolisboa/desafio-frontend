import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  name = 'anony';

  constructor(private user: UserService) { }

  ngOnInit() {
    this.name = this.user.email;
    console.log('Usuário logado?', this.user.getUserLoggedIn());
  }

}
