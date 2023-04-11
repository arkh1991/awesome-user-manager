import React from "react";
import {UserStore} from "../store/UserStore";
import {observer} from "mobx-react";
import {observable} from "mobx";

@observer
export class UserCard extends React.Component {

    @observable
    userStore = new UserStore(this.props.userName);

    onSave = () => {
        this.userStore.saveUser().then((data) => {
            this.props.onDataSave(data);
        });
    }

    onEdit = (field) => (event) => {
        this.userStore.editUser(field, event.target.value)
    }

    onDelete = () => {
        this.userStore.deleteUser().then(() => {
            this.props.onDelete();
        });
    }

    render() {
        if (this.userStore.isLoading) {
            return <div>Загрузка...</div>
        }
        const user = this.userStore.user;

        return (
            <div className={'user-card'}>
                <div className={'form-row'}>
                    <span>Логин:</span>
                    <input disabled={!this.userStore.isNewUser} onChange={this.onEdit('userName')} value={user.userName}/>
                </div>
                <div className={'form-row'}>
                    <span>Имя:</span>
                    <input onChange={this.onEdit('firstName')} value={user.firstName}/>
                </div>
                <div className={'form-row'}>
                    <span>Фамилия:</span>
                    <input onChange={this.onEdit('lastName')} value={user.lastName}/>
                </div>
            <div className={'controls'}>
                <button onClick={this.onDelete}>Удалить</button>
                <button onClick={this.onSave}>Сохранить</button>
            </div>
        </div>);
    }
}
