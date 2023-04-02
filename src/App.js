import './App.css';
import * as React from "react";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {UsersStore} from "./store/UsersStore";

@observer
export class App extends React.Component {

    @observable.ref
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

    render() {
        const userNames = this.usersStore.users;
        return (
            <div className="App">
                {userNames.map(item => (
                    <div>{item}</div>
                ))}
            </div>
        );
      }
}

export default App;
