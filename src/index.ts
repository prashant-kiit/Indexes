// RAM
import { Users, User } from "./data";
import BPlusTree from "./b+tree";

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

const buildSecondaryIndex = (primaryIndexOnUsersById: Record<string, number[]>, secondarykey: keyof User) => {
    const secondaryIndex: Record<string, BPlusTree> = {};

    Users.forEach((user) => {
        const k = String(user[secondarykey]);
        if (!secondaryIndex[k]) {
            secondaryIndex[k] = new BPlusTree(4);
        }
        secondaryIndex[k].insert(String(user.id));
    });
    console.log(secondaryIndex)

    return secondaryIndex;
};

let primaryIndexOnUsersById = buildPrimaryIndex(Users, "id");
let secondaryIndexOnUsersByName = buildSecondaryIndex(primaryIndexOnUsersById, "name");



const getUsersById = (id: string) => {
    const recordPointers = primaryIndexOnUsersById[id] || [];
    const users = recordPointers.map((index) => Users[index]);
    return users;
};

const getUsersByName = (name: string) => {
    const recordPointersTree = secondaryIndexOnUsersByName[name] || [];
    const recordPointers = recordPointersTree.traverse();
    const users = recordPointers.map((primarykey) => Users[primaryIndexOnUsersById[primarykey][0]]);
    return users;
};

const postUser = (user: User) => {
    Users.push(user);
    primaryIndexOnUsersById = buildPrimaryIndex(Users, "id");
    secondaryIndexOnUsersByName = buildSecondaryIndex(primaryIndexOnUsersById, "name");
}

const main = () => {
    postUser({
        id: 30,
        name: "Pickachu",
        address: "Wonderland"
    })
    const usersByName = getUsersByName("Pickachu")
    const users = getUsersById("3");
    console.log("users", users);
    console.log("usersByName", usersByName);
};

main();


