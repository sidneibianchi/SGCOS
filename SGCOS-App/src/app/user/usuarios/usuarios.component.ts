import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/User';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  titulo = 'Usuarios';
  usersFiltrados: User[];
  users: User[];
  user:  User;
  registerForm: FormGroup;
  bodyDeletarUsuario = '';

  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private fb: FormBuilder,
              public router: Router) { }

  ngOnInit() {
    if (!this.userName()) {
      this.logout();
    }
    this.getUsers();
    this.validation();
  }

  logout() {
    localStorage.removeItem('token');
    this.toastr.show('Você saiu do sistema.');
    this.router.navigate(['/user/login']);
  }

  userName() {
    return sessionStorage.getItem('username');
  } 

  validation() {
    this.registerForm = this.fb.group({
    id: [''],
    userName: [''],
    email: [''],
    password: [''],
    fullName: ['']
    });
  }

  getUsers() {
     this.authService.getAllUser().subscribe(
      (Users: User[]) => {
        this.users = Users;
        this.usersFiltrados = this.users;
      }, error => {
        console.log(error);
        this.toastr.error(`Erro ao tentar carregar usuarios: ${error}`);
      });
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  excluirUser(user: User, template: any) {
    this.openModal(template);
    this.user = user;
    this.bodyDeletarUsuario = `Tem certeza que deseja excluir o equipamento: ${user.fullName}`;
  }

  confirmeDelete(template: any) {
      this.authService.deleteUser(this.user.id).subscribe(
      () => {
        template.hide();
        this.getUsers();
        this.toastr.success('Usuário excluido com sucesso!');
      }, error => {
        this.toastr.error(`Erro ao tentar excluir usuário: ${error}`);
        console.log(error);
      }
    );
  }

}
