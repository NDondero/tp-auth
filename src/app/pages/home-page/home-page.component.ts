import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, OnDestroy {

  username = 'invitado';
  private sub?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.sub = this.authService.auth().subscribe({
      next: (activeUser) => {
        if (activeUser){
          this.username = activeUser.username;
        } else {
          this.username = 'invitado';
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
