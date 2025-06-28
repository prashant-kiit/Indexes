import { Users, User } from "./data"

const buildPrimaryIndex = (Users: User[]) => {

}

const getUsersByName = (name: string) => {
    const users = Users.filter((user)=> user.name === name)
    return users;
}

const main = () => {
    const users = getUsersByName("Prashant");
    console.log("users",users);
}

main();