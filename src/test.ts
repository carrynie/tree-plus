import TreesPlus from "."

interface Obj {
    id: number
    parentId: number
    name: string
}

const data: Obj[] = [
    { id: 1, parentId: 0, name: 'level-top' },
    { id: 2, parentId: 1, name: 'level-1' },
    { id: 3, parentId: 1, name: 'level-2' },
    { id: 4, parentId: 3, name: 'level-2-1' },
]

const treeData = TreesPlus.format(data, {
    idKey: 'id',
    parentKey: 'parentId',
    topValue: 0
})

const traceParents = TreesPlus.trace(data, data[3], {
    idKey: 'id',
    parentKey: 'parentId',
    topValue: 0
})

console.log(treeData, traceParents)
