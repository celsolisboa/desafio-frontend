import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  name = 'anony';
  pageType = "";

  constructor(private user: UserService, private modalService: ModalService) { }

  ngOnInit() {
    this.name = this.user.email;
    console.log('Usuário logado?', this.user.getUserLoggedIn());

    this.pageType = "dashboard";
  }
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

}
