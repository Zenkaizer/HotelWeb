import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { ClientAuthGuard } from './_guards/client-auth.guard';
import { AdministrativeAuthGuard } from './_guards/administrative-auth.guard';
import { AdminAuthGuard } from './_guards/admin-auth.guard';
import { CommonAdminGuard } from './_guards/common-admin.guard';
// Components
import { LoginComponent } from './_components/account/login/login.component';
import { RegisterComponent } from './_components/account/register/register.component';
import { EditAccountComponent } from './_components/account/edit-account/edit-account.component';
import { HomeComponent } from './_components/home/home.component';
import { RoomListComponent } from './_components/manage-rooms/read-rooms/room-list.component';
import { EditRoomComponent } from './_components/manage-rooms/edit-rooms/edit-room.component';
import { ReserveListComponent } from './_components/manage-reserves/read-reserves/reserves-list.component';
import { ClientListComponent } from './_components/manage-clients/read-clients/client-list.component';
import { CreateClientComponent } from './_components/manage-clients/create-clients/create-client.component';
import { AdministrativeListComponent } from './_components/manage-administratives/read-administratives/administrative-list.component';
import { CreateRoomComponent } from './_components/manage-rooms/create-rooms/create-room.component';
import { EditClientComponent } from './_components/manage-clients/edit-clients/edit-client.component';
import { EditProfileComponent } from './_components/account/edit-profile/edit-profile.component';
import { CreateAdministrativeComponent } from './_components/manage-administratives/create-administratives/create-administrative.component';
import { EditAdministrativesComponent } from './_components/manage-administratives/edit-administratives/edit-administratives.component';
import { ReserveRoomidComponent } from './_components/reserve-roomid/reserve-roomid.component';
import { ReserveRoomComponent } from './_components/reserve-room/reserve-room.component';

const routes: Routes = [

  {path: '', component: HomeComponent},  
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/register', component: RegisterComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'account', component: EditAccountComponent},
      {path: 'profile', component: EditProfileComponent}
    ]
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [ClientAuthGuard],
    children: [
      { path: 'client/schedule', component: ReserveRoomComponent },
      { path: 'client/reserve/:id', component: ReserveRoomidComponent },
    ]
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AdministrativeAuthGuard],
    children: [
      {path: 'manage-clients', component: ClientListComponent},
      {path: 'manage-clients/create-client', component: CreateClientComponent},
      {path: 'manage-clients/:id', component: EditClientComponent},
      {path: 'manage-rooms', component: RoomListComponent},
      {path: 'manage-rooms/create-room', component: CreateRoomComponent},
      {path: 'manage-rooms/:id', component: EditRoomComponent}
      
    ]
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AdminAuthGuard],
    children: [
      {path: 'stats', component: HomeComponent},
      {path: 'manage-administratives', component: AdministrativeListComponent},
      {path: 'manage-administratives/create-administrative', component: CreateAdministrativeComponent},
      {path: 'manage-administratives/:id', component: EditAdministrativesComponent}
    ]
  }
  ,
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [CommonAdminGuard],
    children: [
      {path: 'manage-reserves', component: ReserveListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
