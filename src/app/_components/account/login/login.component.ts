import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "../../../_services/account.service";
import { Notification } from "../../../_models/notification";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {

    /**
     * Form to login an account.
     */
    loginForm: FormGroup = new FormGroup({});
    /**
     * Notification to show the result of the login.
     */
    notification: Notification | null = null;

    /**
     * Constructor of the class.
     * @param router Router to navigate between pages.
     * @param formBuilder FormBuilder to create the form.
     * @param accountService AccountService to make the requests to the API.
     */
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private accountService: AccountService
    ) {
    }

    /**
     * Method OnInit.
     */
    ngOnInit(): void {
        this.initializeForm();
    }

    /**
     * This method initializes the form.
     */
    initializeForm(): void {
        this.loginForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required]
        });
    }

    /**
     * This method use the account service to login an account.
     */
    login(): void {
        this.accountService.login(this.loginForm.value).subscribe({
            next: () => {
                this.router.navigateByUrl("/");
            },
            error: (error) => {
                this.notification = {
                    success: false,
                    message: error.error
                };
            }
        });
    }

    /**
     * This method closes the notification.
     */
    closeNotification(): void {
        this.notification = null;
    }

}