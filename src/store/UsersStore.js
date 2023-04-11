import {action, observable} from "mobx";
import {UsersService} from "../service/UsersService";

export class UsersStore {

    @observable
    users = [];

    @observable
    isLoading = false;

    @observable
    selectedUser = undefined;

    @action
    setLoading (value) {
        this.isLoading = value;
    }

    @action
    setUsers (users) {
        this.users = users;
    }

    @action
    loadUsers (filter) {
        this.setLoading(true);

        return UsersService.getUserNames(filter).then(data => {
            this.setUsers(data);
        }).finally(() => {
            this.setLoading(false)
        });
    }

    @action
    selectUser (userName) {
       this.selectedUser = userName;
    }

    @action
    createNew () {
        this.selectedUser = '';
    }

}
