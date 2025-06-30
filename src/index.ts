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

const primaryIndexOnUsersById = buildPrimaryIndex(Users, "id");
const secondaryIndexOnUsersByName = buildSecondaryIndex(primaryIndexOnUsersById, "name");

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

const main = () => {
    const users = getUsersById("3");
    const usersByName = getUsersByName("Rahul Roy")
    console.log("users", users);
    console.log("usersByName", usersByName);
};

main();


