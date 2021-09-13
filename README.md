# no-loss-accuracy
Operations related to tree data

### Install

``` javascript
$ npm i tree-plus -S
```

### Import

``` javascript
import TreePlus from "tree-plus"
```

### Usage

``` javascript
import TreePlus from "tree-plus"

const treeData = TreePlus.format(data) // 列表转树形数据
const traceParents = TreePlus.trace(data) // 找到当前条目的所有上级并返回集合

// 自定义option
const option = {
    idKey: 'your id name', // 默认 'id'
    parentKey: 'your parent id name', // 默认 'parentId'
    topValue: 'your top parent id' // 默认 0
}

const treeData = TreePlus.format(data, option)
const traceParents = TreePlus.trace(data, option)

```

### Demo

``` javascript
import TreePlus, { DataObj, Option } from "tree-plus"

interface DataObj {
    id: number
    parentId: number
    name: string
}

const data: DataObj[] = [
    { id: 1, parentId: 0, name: 'level-top' },
    { id: 2, parentId: 1, name: 'level-1' },
    { id: 3, parentId: 1, name: 'level-2' },
    { id: 4, parentId: 3, name: 'level-2-1' },
]

const option: Option = { // 默认option
    idKey: 'id',
    parentKey: 'parentId',
    topValue: 0
}

const treeData = TreePlus.format(data, option) // DataObj[]
const traceParents= TreePlus.trace(data, data[3], option) // DataObj[]

console.log(treeData, traceParents)

// treeData: [
//   {
//     id: 1,
//     parentId: 0,
//     name: 'level-top',
//     deep: 1, // 当前深度
//     hasChild: true, // 是否包含子节点
//     children: [ [Object], [Object] ] // 子节点集合
//   }
// ]
// traceParents: [
//   { id: 1, parentId: 0, name: 'level-top' },
//   { id: 3, parentId: 1, name: 'level-2' },
//   { id: 4, parentId: 3, name: 'level-2-1' }
// ]

```