import {User} from "../components/User";

let usersData = [{
    userName: 'firstUser',
    firstName: 'Ivan',
    lastName: 'Ivanov'
}, {
    userName: 'secondUser',
    firstName: 'Petr',
    lastName: 'Petrov'
}];

function delayedData (data) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(data);
        }, 3000);
    })
}

export class UsersService {

    static createUser ({userName, firstName, lastName}) {
        usersData.push({userName, firstName, lastName});
        return delayedData(new User({userName, firstName, lastName}));
    }

    static deleteUser(userName) {
        usersData = usersData.filter(item => item.userName === userName);

        return delayedData({});
    }

    static updateUser({userName, firstName, lastName}) {
        const data = usersData.find(item => item.userName === userName);
        data.firstName = firstName;
        data.lastName = lastName;

        return delayedData(new User(data));
    }

    static readUser(userName) {
        const userData = usersData.find(item => item.userName === userName);

        if(userData) {
            return delayedData(new User(userData));
        }
        return Promise.reject('user not found')
    }

    static getUserNames (filter) {
        return delayedData(usersData.map(item => item.userName).filter(item => item.includes(filter)));
    }


}
