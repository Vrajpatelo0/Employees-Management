import { FormControl } from "@angular/forms";

export interface Employee {
    _id: string | null;
    name: string | null;
    mobileNumber: number | null;
    email: string | null;
    profileImage?: string | null;
}

export interface EmployeeForm {
    name: string | null;
    mobileNumber: number | null;
    email: string | null;
    profileImage?: string | null;
}

export type FormGroupType<T> = { [key in keyof T]: FormControl<T[key]> };