import { Users, User } from "./data";

const buildPrimaryIndex = (Users: User[], key: keyof User) => {
    const primaryIndex: Record<string, number[]> = {};

    Users.forEach((user, index) => {
        const k = String(user[key]);
        if (!primaryIndex[k]) {
            primaryIndex[k] = [];
        }
        primaryIndex[k].push(index);
    });
    console.log(primaryIndex)

    return primaryIndex;
};

const primaryIndexOnUsersByName = buildPrimaryIndex(Users, "name");

const getUsersByName = (name: string) => {
    const recordPointers = primaryIndexOnUsersByName[name] || [];
    const users = recordPointers.map((index) => Users[index]);
    return users;
};

const main = () => {
    const users = getUsersByName("Prashant");
    console.log("users", users);
};

main();
