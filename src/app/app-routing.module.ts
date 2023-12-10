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

import { RoomListComponent } from './_components/manage-rooms/room-list.component';
import { ReserveListComponent } from './_components/manage-reserves/reserves-list.component';
import { ClientListComponent } from './_components/manage-clients/read-clients/client-list.component';
import { CreateClientComponent } from './_components/manage-clients/create-clients/create-client.component';


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
<<<<<<< HEAD
      {path: 'manage-rooms', component: ClientListComponent},
      {path: 'manage-reserves', component: ClientListComponent},
      {path: 'manage-clients/create-client', component: CreateClientComponent}
    ]
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [ClientAuthGuard],
    children: [
      {path: 'rooms', component: HomeComponent}
=======
      {path: 'manage-rooms', component: RoomListComponent},
      {path: 'manage-reserves', component: ReserveListComponent},
      {path: 'manage-clients/create-client', component: CreateClientComponent},
>>>>>>> fc8e464096e9f2b45efcc168011bc2bc76963fc3
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
