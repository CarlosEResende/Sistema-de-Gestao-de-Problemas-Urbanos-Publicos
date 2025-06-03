import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { Usuario } from './core/models/usuario.model';
import { UsuarioService } from './core/services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {
  usuarioLogado$: Observable<Usuario | null>;
  showNavbar: boolean = true;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuarioLogado$ = this.usuarioService.usuarioLogado$;
  }

  ngOnInit(): void {
  const rotasSemNavbar = ['/', '/inicio'];

  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      const url = (event as NavigationEnd).urlAfterRedirects.split('?')[0].replace(/\/+$/, '');
      this.showNavbar = !rotasSemNavbar.includes(url);
    });
}


  logout(): void {
    this.usuarioService.logout();
    this.router.navigate(['/auth/login']);
  }
}
