import {action, observable} from "mobx";
import {UsersService} from "../service/UsersService";
import {User} from "../models/User";

export class UserStore {

    @observable
    isLoading = false;

    @observable
    user = undefined;

    isNewUser = false;

    constructor(userName) {
        this.isNewUser = userName === '';
        if(this.isNewUser) {
            this.user = new User({
                userName: '',
                lastName: '',
                firstName: ''
            })
        } else {
            this.loadUser(userName);
        }
    }

    @action
    setLoading (value) {
        this.isLoading = value;
    }

    @action
    setUser (user) {
        this.user = user;
    }

    @action
    editUser (field, value) {
        this.user[field] = value;
    }

    loadUser (userName) {
        this.setLoading(true);

        return UsersService.readUser(userName).then(data => {
            this.setUser(data);
        }).finally(() => {
            this.setLoading(false)
        });
    }

    saveUser () {
        if(this.isNewUser) {
            return UsersService.createUser(this.user);
        } else {
            return UsersService.updateUser(this.user);
        }
    }

    deleteUser () {
        return UsersService.deleteUser(this.user.userName);
    }

}
