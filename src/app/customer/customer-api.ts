import { environment } from "../../environments/environment";

export class CustomerService {
    static readonly getStaffRole = environment.baseUrl + 'client-management/getStaffRole';
}