import {observable} from "mobx";

export class User {

    @observable
    userName;

    @observable
    lastName;

    @observable
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
