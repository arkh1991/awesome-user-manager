import React from "react";
import {observer} from "mobx-react";


@observer
export class UserListItem extends React.Component {

    onUserClick = () => {
        this.props.usersStore.selectUser(this.props.user);
    }

    render() {
        const user = this.props.user;
        const isSelected = this.props.usersStore.selectedUser === user;

        return <div className={isSelected ? 'selected-user' : undefined} onClick={this.onUserClick}>{user}</div>
    }
}
