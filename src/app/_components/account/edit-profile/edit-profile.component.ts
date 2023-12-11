import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "../../../_models/user";
import { UserService } from "../../../_services/user.service";
import { Notification } from "../../../_models/notification";
import { Account } from "../../../_models/account";
import { AccountService } from "../../../_services/account.service";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html"
})
export class EditProfileComponent implements OnInit {

    account: Account | null = null;
    user: User | null = null;
    editForm: FormGroup = new FormGroup({});
    notification: Notification | null = null;

    nationalities = ["Chilena", "Extranjera"];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private accountService: AccountService
    ) {}

    ngOnInit(): void {
        this.loadAccount();
    }

    loadAccount() {
        this.accountService.currentAccount$.subscribe({
            next: account => {

                if  (account){
                    this.account = account;
                    this.loadUser();
                }

            }
        });
    }


    loadUser(): void {

        if (!this.account) return;

        this.userService.getCurrentUser(this.account.userId).subscribe({
            next: user => {
                this.user = user;
                this.initializeForm();
            }
        });
    }

    initializeForm(): void {
        if (!this.user) return;

        this.editForm = this.formBuilder.group({
            dni: [ this.user.dni],
            email: [ this.user.email],
            firstName: [ this.user.firstName, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(255)]
            ],
            lastName: [ this.user.lastName, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(255)]
            ],
            phone: ["", [
                Validators.required,
                this.validPhone()]
            ],
            nationality: ["", [
                Validators.required]
            ],
            birthdate: ["", [
                Validators.required,
                this.validDate()]
            ],
        });
    }

    validPhone(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {
            const phone = control.value;      

            return 10000000 <= phone && phone <= 99999999 ? null : { invalidPhone: true };
        };
    }

    validDate(): ValidatorFn {
        return (control: AbstractControl) => {
            return control.value < new Date() ? null : { invalidDate: true };
        };
    }

    editProfile(): void {

        if (!this.user) return;

        const birthdate = this.getDateOnly(this.editForm.controls["birthdate"].value);
        const values = {...this.editForm.value, birthdate};

        this.userService.updateCurrentUser(values).subscribe({
            next: () => {
                this.notification = {
                    message: "Perfil actualizado correctamente.",
                    success: true
                };
            }
        });


    }

    getDateOnly(birthdate: string | undefined): string | undefined {
        if (!birthdate) return;

        let birthdateAux = new Date(birthdate);

        return new Date(birthdateAux.setMinutes(birthdateAux.getMinutes() - birthdateAux.getTimezoneOffset()))
        .toISOString()
        .slice(0, 10);
    }

    closeNotification(): void {
        this.notification = null;
    }

    

}