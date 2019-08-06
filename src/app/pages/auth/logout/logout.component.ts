import { AccountService } from './../../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pyu-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.accountService.logout();
    this.router.navigate(['']);
  }

}
