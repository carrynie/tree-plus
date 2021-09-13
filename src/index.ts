export interface Option {
    idKey: string,
    parentKey: string,
    topValue: string | number
}

export interface DataObj {
    [key: string]: any,
    hasChild?: Boolean,
    children?: DataObj[]
    deep?: number
}

const cloneDeep = <T>(data: T): T => {
    return JSON.parse(JSON.stringify(data))
}

export default class TreePlus {
    private static getTopList (list: DataObj[], option: Option): DataObj[] {
        return list.filter(item => item[option.parentKey] === option.topValue)
    }

    private static recurseTree(parentList: DataObj[], list: DataObj[], option: Option, deep: number = 1) {
        if(list.length === 0) {
            return
        }

        parentList.forEach(item => {
            const children = cloneDeep(list.filter(child => child[option.parentKey] === item[option.idKey]))
            item.deep = deep
            item.hasChild = children.length > 0
            item.children = children
            this.recurseTree(children, list, option, deep+1)
        })
    }

    private static recurseParent(list: DataObj[], currentItem: DataObj, option: Option, result: DataObj[] = [currentItem]): DataObj {
        const parent = list.find(item => item[option.idKey] === currentItem[option.parentKey])

        if(parent !== undefined) {
            result.unshift(parent)
            return this.recurseParent(list, parent, option, result)
        } else {
            return result
        }
    }

    public static format(list: DataObj[], option: Option = {
        topValue: 0, 
        idKey: 'id', 
        parentKey: 'parentId'
    }) {
        const topList = cloneDeep(this.getTopList(list, option))
        this.recurseTree(topList, list, option)
        return topList
    }

    public static trace(list: DataObj[], currentItem: DataObj, option: Option = {
        topValue: 0, 
        idKey: 'id', 
        parentKey: 'parentId'
    }){
        return this.recurseParent(list, currentItem, option, [currentItem])
    }
}