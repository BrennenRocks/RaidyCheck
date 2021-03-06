import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';
import { ServerResponse } from '../../interfaces/server-response';
import { User } from '../../interfaces/user';
import { GroupsService } from '../../services/groups.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoading: boolean = true;
  isLoggedIn: boolean = false;
  refreshUser: boolean = false;
  user: User;

  query: string = '';

  constructor(
    private authService: AuthService,
    private groupsService: GroupsService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.authService.isLoggedInEmitter.subscribe((data: boolean) => {
      if (data !== null) {
        this.isLoggedIn = data;
      }

      if (this.isLoggedIn) {
        this.getUser();
      }
    });

    this.authService.refreshUserEmitter.subscribe((data: boolean) => {
      if (data !== null) {
        this.refreshUser = data;
      }

      if (this.isLoggedIn && this.refreshUser) {
        this.getUser();
        this.authService.updateUserFinish();
      }
    }); 
  }

  private getUser() {
    setTimeout(() => {
      this.authService.getLoggedInUser().subscribe((data: ServerResponse) => {
        if (!data.success) {
          this.toastr.error(data.message, "Error");
          this.isLoading = false;
        } else {
          this.user = data.user;
          this.isLoading = false;
        }
      });
    }, 1000);
  }

  public onMyGroupsClick(): void {
    if (!this.user.groups.personal[0]) {
      this.router.navigate(['/get-started']);
      return;
    }

    this.router.navigate(['/group', this.user.groups.personal[0]._id]);
  }

  public clearSearchBar(): void {
    this.query = '';
  }

  public onSearchClick(): void {
    this.router.navigate(['/search'], { queryParams: { query: this.query } });
  }

  public onLogoutClick(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.toastr.success("You have been logged out", "Logged out");
  }

}
