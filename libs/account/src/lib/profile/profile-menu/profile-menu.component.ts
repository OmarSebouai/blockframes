
import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthQuery, AuthService, User } from '@blockframes/auth';
import { Router } from '@angular/router';
import { Profile, createProfile } from '../forms/profile-edit.form';

@Component({
  selector: 'account-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileMenuComponent implements OnInit{
  public user$: Observable<User>;

  constructor(
    private service: AuthService,
    private auth: AuthQuery,
    private router: Router,
  ){}

  ngOnInit(){
    this.user$ = this.auth.user$;
  }

  public async logout() {
    await this.service.logout();
    this.router.navigate(['/layout']);
  }

  public get profile() {
    return createProfile(this.auth.getValue().user)
  }
}
