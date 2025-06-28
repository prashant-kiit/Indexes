// RAM
import { Users, User } from "./data";

const buildPrimaryIndex = (Users: User[], primarykey: keyof User) => {
    const primaryIndex: Record<string, number[]> = {};

    Users.forEach((user, index) => {
        const k = String(user[primarykey]);
        if (!primaryIndex[k]) {
            primaryIndex[k] = [];
        }
        primaryIndex[k].push(index);
    });
    console.log(primaryIndex)

    return primaryIndex;
};

const primaryIndexOnUsersByName = buildPrimaryIndex(Users, "id");

const getUsersById = (name: string) => {
    const recordPointers = primaryIndexOnUsersByName[name] || [];
    const users = recordPointers.map((index) => Users[index]);
    return users;
};

const main = () => {
    const users = getUsersById("3");
    console.log("users", users);
};

main();
