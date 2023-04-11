import './App.css';
import * as React from "react";
import {observer} from "mobx-react";
import {action, observable} from "mobx";
import {UsersStore} from "./store/UsersStore";
import {UserListItem} from "./components/UserListItem";
import {UserCard} from "./components/UserCard";

@observer
export class App extends React.Component {

    @observable
    usersStore = undefined;

    @observable
    filterValue = '';

    constructor(props) {
        super(props);

        this.usersStore = new UsersStore();
    }

    componentDidMount() {
        this.usersStore.loadUsers();
    }

    @action
    onInputChange = (event) => {
        this.filterValue = event.target.value;
        this.usersStore.loadUsers(this.filterValue);
    }

    onDataSave = (data) => {
        this.usersStore.loadUsers(this.filterValue).then(() => {
            this.usersStore.selectUser(data.userName);
        });
    }

    onUserDelete = () => {
        this.usersStore.loadUsers(this.filterValue).then(()=>{
            this.usersStore.selectUser(undefined);
        });
    }

    onCreateNew = () => {
        this.usersStore.createNew();
    }

    render() {
        const userNames = this.usersStore.users;
        const value = this.filterValue;

        return (
            <div>
                <div className="App">
                    <div className={'side-panel'}>
                        <div className={"user-list"}>
                            <input placeholder={'Поиск пользователя'} value={value} onChange={this.onInputChange}/>
                            <div className={'users-container'}>
                                {userNames.map((item, idx) => (
                                    <UserListItem key={idx} user={item} usersStore={this.usersStore}/>
                                ))}
                            </div>
                        </div>
                        <button onClick={this.onCreateNew}>Добавить</button>
                    </div>
                    {this.usersStore.selectedUser !== undefined && (
                        <div className={'user-card'}>
                            <UserCard onDelete={this.onUserDelete} onDataSave={this.onDataSave} userName={this.usersStore.selectedUser}/>
                        </div>
                    )}
                </div>
            </div>
        );
      }
}

