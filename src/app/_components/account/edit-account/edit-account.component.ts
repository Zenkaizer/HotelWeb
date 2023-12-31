import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Account } from "../../../_models/account";
import { AccountService } from "../../../_services/account.service";
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Notification } from "../../../_models/notification";

@Component({
    selector: "app-edit-account",
    templateUrl: "./edit-account.component.html"
})
export class EditAccountComponent implements OnInit {

    account: Account | null = null;
    updateForm: FormGroup = new FormGroup({});
    notification: Notification | null = null;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private accountService: AccountService
    ) { }

    ngOnInit(): void {
        this.loadAccount();
    }

    loadAccount() {
        this.accountService.currentAccount$.subscribe({
            next: account => {

                if  (account){
                    this.account = account;
                    this.initializeForm();
                }

            }
        });
    }

    initializeForm() {
        if (!this.account) return;

        this.updateForm = this.formBuilder.group({

            //Actual email is used to check if the user has changed the email.
            actualEmail: [this.account.email],
            email: [this.account.email, [
                Validators.required,
                Validators.email]
            ],
            password: ['', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(255)]
            ],
            confirmPassword: ['', [
                Validators.required,
                this.matchValues('password')]
            ],
        });
    }
    
    matchValues(matchTo: string): ValidatorFn {
        return (control: AbstractControl) => {
            return control.value === control.parent?.get(matchTo)?.value ? null : { noMatching: true };
        };
    }

    updateAccount(): void {

        this.accountService.update(this.updateForm.value).subscribe({
            next: () => {
                this.router.navigateByUrl("/").then(() => this.accountService.logout());
            },
            error: (error) => {
                this.notification = {
                    success: false,
                    message: error.error
                };
            }
        });
    }

    closeNotification(): void {
        this.notification = null;
    }
}