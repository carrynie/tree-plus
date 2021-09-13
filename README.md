# trees-plus
Operations related to tree data

### Install

``` javascript
$ npm i trees-plus -S
```

### Import

``` javascript
import TreesPlus from "trees-plus"
```

### Usage

``` javascript
import TreesPlus from "trees-plus"
```
* TreesPlus.format（列表转树形数据）

``` javascript
const treeData = TreesPlus.format(data)
```

* TreesPlus.trace（找到当前条目的所有上级并返回集合）
``` javascript
const traceParents = TreesPlus.trace(data)
```

* 自定义option
``` javascript
const option = {
    idKey: 'your id name', // 默认 'id'
    parentKey: 'your parent id name', // 默认 'parentId'
    topValue: 'your top parent id' // 默认 0
}

const treeData = TreesPlus.format(data, option)
const traceParents = TreesPlus.trace(data, option)

```

### Demo

``` javascript
import TreesPlus, { DataObj, Option } from "trees-plus"

interface Data {
    id: number
    parentId: number
    name: string
}

const data: Data[] = [
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

const treeData = TreesPlus.format(data, option) // DataObj[]
const traceParents= TreesPlus.trace(data, data[3], option) // DataObj[]

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