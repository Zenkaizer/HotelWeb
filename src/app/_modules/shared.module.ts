import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
    declarations: [],
    imports: [CommonModule, ReactiveFormsModule, PaginationModule.forRoot(), NgxPaginationModule],
    exports: [FormsModule, ReactiveFormsModule, PaginationModule, NgxPaginationModule],
})
export class SharedModule {}