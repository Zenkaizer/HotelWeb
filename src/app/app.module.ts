import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './_modules/shared.module';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FilterPipe } from './_pipes/filter.pipe';
//Components
import { HomeComponent } from './_components/home/home.component';
import { LoginComponent } from './_components/account/login/login.component';
import { RegisterComponent } from './_components/account/register/register.component';
import { EditAccountComponent } from './_components/account/edit-account/edit-account.component';
import { TextInputComponent } from './_components/_forms/text-input/text-input.component';
import { DateInputComponent } from './_components/_forms/date-input/date-input.component';
import { SelectInputComponent } from './_components/_forms/select-input/select-input.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { FooterComponent } from './_components/footer/footer.component';
import { RoomListComponent } from './_components/manage-rooms/read-rooms/room-list.component';
import { ReserveListComponent } from './_components/manage-reserves/reserves-list.component';
import { ClientListComponent } from './_components/manage-clients/read-clients/client-list.component';
import { CreateClientComponent } from './_components/manage-clients/create-clients/create-client.component';
import { CreateRoomComponent } from './_components/manage-rooms/create-rooms/create-room.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    EditAccountComponent,
    TextInputComponent,
    DateInputComponent,
    SelectInputComponent,
    ClientListComponent,
    RoomListComponent,
    ReserveListComponent,
    CreateClientComponent,
    CreateRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
