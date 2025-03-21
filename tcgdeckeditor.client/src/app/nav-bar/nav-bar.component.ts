import {Component, OnInit} from '@angular/core';
import {AuthService} from '../Services/auth.service';
import {StorageService} from '../Services/storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private storageService: StorageService) {
  }

  ngOnInit() {
    this.isLoggedIn = this.storageService.isLoggedIn()
  }
}
