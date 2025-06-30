# Indexes
# Data Structures and Database Indexes

// Primary Index
// Secondary Index
// Clustered Index
// Non Clustered Index
// Dense Index
// Sparse Indes
// Block Pointer
// Record Pointer
// Block of Block Pointer
// Block of Record pointer
// Mutiilevel Index of Secondary and Primary Index (M Way Search Tree)

# Data Structure for Indexing
// Node Class for making Object
class Node {
    public ref1 = new Node()
    public key1 = ""
    public ref2 = new Node()
    public key2 = ""
    public ref3 = new Node()
    public key3 = ""
}
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
