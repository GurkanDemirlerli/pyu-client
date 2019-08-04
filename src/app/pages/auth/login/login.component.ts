import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pyu-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    document.querySelectorAll('.fill input').forEach(elem => {
      elem.addEventListener('focus', function (e) {
        this.parentNode.classList.add('active');
      });
      elem.addEventListener('blur', function (e) {
        this.value ? this.parentNode.classList.add('active') : this.parentNode.classList.remove('active');
      });
    });
  }

}
