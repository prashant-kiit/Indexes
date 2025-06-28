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

const buildSecondaryIndex = (primaryIndexOnUsersById: Record<string, number[]>, secondarykey: keyof User) => {
    const secondaryIndex: Record<string, string[]> = {};

    Users.forEach((user) => {
        const k = String(user[secondarykey]);
        if (!secondaryIndex[k]) {
            secondaryIndex[k] = [];
        }
        secondaryIndex[k].push(String(user.id));
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
    const recordPointers = secondaryIndexOnUsersByName[name] || [];
    const users = recordPointers.map((primarykey) => Users[primaryIndexOnUsersById[primarykey][0]]);
    return users;
};

const main = () => {
    const users = getUsersById("3");
    const usersByName = getUsersByName("Rahul Roy")
    console.log("users", users);
    console.log("usersByName", usersByName);

    // Use Tree to make Index (Tree is an Object from Class)
    const rootNode = new Node()
    rootNode.ref1.ref1.ref2
    rootNode.ref2.ref1
    rootNode.ref3.ref1.ref2

    // Use Map to make Index (Map is an Object from Class)
    const rootMapper : Record<any, any[]> = {};
    rootMapper["rootKey1"] = ["refKey1"]
    rootMapper["rootKey2"] = ["refKey2"]
    const intermediateMapper : Record<any, any[]> = {};
    intermediateMapper["refKey1"] = ["refKey3"] 
    intermediateMapper["refKey2"] = ["refKey4"]
    const leafMapper : Record<any, any[]> = {};
    leafMapper["refKey3"] = ["value1"]
    leafMapper["refKey4"] = ["value2"]
};

main();

class Node {
    public ref1 = new Node()
    public key1 = ""
    public ref2 = new Node()
    public key2 = ""
    public ref3 = new Node()
    public key3 = ""
}


