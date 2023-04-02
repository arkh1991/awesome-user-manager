export class User {
    userName;
    lastName;
    firstName;

    constructor({userName, lastName, firstName}) {
        this.userName = userName;
        this.lastName = lastName;
        this.firstName = firstName;
    }

    getFullName = () => {
        return this.firstName + ' ' + this.lastName;
    }
}
