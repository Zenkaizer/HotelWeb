import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { ClientAuthGuard } from './_guards/client-auth.guard';
import { AdministrativeAuthGuard } from './_guards/administrative-auth.guard';
// Components
import { LoginComponent } from './_components/account/login/login.component';
import { RegisterComponent } from './_components/account/register/register.component';
import { EditAccountComponent } from './_components/account/edit-account/edit-account.component';
import { HomeComponent } from './_components/home/home.component';
import { ClientListComponent } from './_components/manage-clients/client-list.component';
import { RoomListComponent } from './_components/manage-rooms/room-list.component';

const routes: Routes = [

  {path: '', component: HomeComponent},  
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/register', component: RegisterComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'account', component: EditAccountComponent}
    ]
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AdministrativeAuthGuard],
    children: [
      {path: 'manage-clients', component: ClientListComponent},
      {path: 'manage-rooms', component: RoomListComponent},
      {path: 'manage-reserves', component: ClientListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
