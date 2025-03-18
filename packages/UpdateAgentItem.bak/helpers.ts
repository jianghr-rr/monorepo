import {nanoid} from 'nanoid'; // 使用 nanoid 生成唯一 ID
import type {TagNode} from './types';

/**
 * 将 list 结构转换为 children 结构，并去掉 feId 字段
 * @param data 原始数据
 * @returns 转换后的数据
 */
const transformListToChildren = (data: any[]): any[] => {
    return data?.map(({feId, list, ...rest}) => ({
        ...rest,
        children: list?.length ? transformListToChildren(list) : undefined, // 空数组设为 undefined 避免多余 children
    }));
};

export {transformListToChildren};

/**
 * 将 children 结构转换为 list 结构，并生成 feId 字段
 * @param data 原始数据
 * @returns 转换后的数据
 */
const transformChildrenToList = (data: any[]): any[] => {
    return data?.map(({children, ...rest}) => ({
        ...rest,
        feId: nanoid(), // 生成唯一 ID
        list: children?.length ? transformChildrenToList(children) : [],
    }));
};

export {transformChildrenToList};


const transformChildrenToListAddValue = (data: any[], obj): any[] => {
    return data?.map(({children, name, value, ...rest}) => ({
        ...rest,
        name: name,
        feId: nanoid(), // 生成唯一 ID
        value: obj?.[name], // 赋值 value
        list: children?.length ? transformChildrenToListAddValue(children, obj) : [],
    }));
};

export {transformChildrenToListAddValue};


/**
 * 将嵌套对象数组转换为扁平对象数组，并为每个对象生成唯一 ID 和空字符串值。
 * value字段用于填写对应字段的值
 *
 * @param data 输入的嵌套对象数组
 * @returns 转换后的扁平对象数组，每个对象包含唯一 ID、空字符串值和子对象列表
 */
const transformChildrenToListAndValue = (data: any[]): any[] => {
    return data?.map(({children, ...rest}) => ({
        ...rest,
        feId: nanoid(), // 生成唯一 ID
        value: '',
        list: children?.length ? transformChildrenToList(children) : [],
    }));
};

export {transformChildrenToListAndValue};


const isValidJSON = str => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
};

export {isValidJSON};


/**
 * 将树形结构的数据扁平化为数组
 *
 * @param tree 树形结构的根节点对象
 * @returns 扁平化后的数组，数组中的每个元素为树形结构中的一个节点的 code 属性值
 */
const flattenTreeToArray = tree => {
    const values: string[] = [];
    const traverse = nodes => {
        nodes?.forEach(node => {
            values.push(node.code); // 提取当前节点的 value
            if (node.children && node.children.length > 0) {
                traverse(node.children); // 递归处理子节点
            }
        });
    };

    traverse(tree);
    return values;
};

export {flattenTreeToArray};


/**
 * 将树形结构的数据扁平化为数组
 *
 * @param tree 树形结构的根节点对象
 * @returns 扁平化后的数组，数组中的每个元素为树形结构中的一个节点的 code 属性值
 */
const flattenTreeNameToArray = tree => {
    const values: string[] = [];
    const traverse = nodes => {
        nodes?.forEach(node => {
            if (!node?.children?.length) {
                values.push(node.name);
            }
            if (node.children && node.children.length > 0) {
                traverse(node.children); // 递归处理子节点
            }
        });
    };

    traverse(tree);
    return values;
};

export {flattenTreeNameToArray};

/**
 * 从给定的已选择值列表中构建树形结构
 *
 * @param selectedValues 已选择的标签值列表
 * @param treeData 树形结构数据
 * @returns 根据已选择值构建的树形结构
 */
const buildTreeFromSelected = (selectedValues: string[], treeData: TagNode[]) => {
    console.log('selectedValues', selectedValues);
    const valueSet = new Set(selectedValues);

    const buildTree = nodes => {
        return nodes
            .map(node => {
                if (valueSet.has(node.id)) {
                    return {
                        name: node.name,
                        id: node.id,
                        code: node.id,
                        children: node.children ? buildTree(node.children) : undefined,
                    };
                }
                if (node.children) {
                    const filteredChildren = buildTree(node.children);
                    if (filteredChildren.length > 0) {
                        return {
                            name: node.name,
                            id: node.id,
                            code: node.id,
                            children: filteredChildren,
                        };
                    }
                }
                return null;
            })
            .filter(Boolean);
    };

    return buildTree(treeData);
};

export {buildTreeFromSelected};

const findParentTreeMultiple = (rootList, targetIds): {
    tree: TagNode[];
    ids: number[];
} => {
    const collectedIds = new Set<number>(); // 用于存储所有匹配到的 ID
    function helper(node) {
        if (!node) {
            return null;
        }

        const isTarget = targetIds.includes(node.id);
        const newChildren = [];

        for (const child of node.children || []) {
            const subtree = helper(child);
            if (subtree) {
                newChildren.push(subtree);
            }
        }

        if (isTarget || newChildren.length > 0) {
            collectedIds.add(node.id); // 收集 ID
            return {...node, children: newChildren};
        }

        return null;
    }

    const filteredTree = rootList.map(root => helper(root)).filter(Boolean);
    return {tree: filteredTree, ids: Array.from(collectedIds)};
};

export {findParentTreeMultiple};

function filterValidNodes(tree, targetIds) {
    const parentMap = new Map();

    // 1. 构建 parentId 映射表
    function buildParentMap(nodes, parentId = null) {
        for (const node of nodes) {
            parentMap.set(node.id, parentId);
            if (node.children) {
                buildParentMap(node.children, node.id);
            }
        }
    }

    buildParentMap(tree);

    // 2. 过滤掉父节点不在 targetIds 里的 ID
    return targetIds.filter(id => {
        let parentId = parentMap.get(id);
        while (parentId !== null) {
            if (!targetIds.includes(parentId)) {
                return false; // 父节点不在 targetIds，当前 ID 需要被移除
            }
            parentId = parentMap.get(parentId);
        }
        return true; // 该 ID 及其所有祖先节点都在 targetIds
    });

}

export {filterValidNodes};

function transformBodyData(data) {
    const result = {};

    data?.forEach(item => {
        if (item.children && Array.isArray(item.children)) {
            result[item.name] = transformBodyData(item.children); // 递归处理 children
        } else {
            result[item.name] = item.defaultValue;
        }
    });

    return result;
}

export {transformBodyData};

const formatThousand = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export {formatThousand};


const checkInputString = (value, length, callback = undefined) => {
    const regex = new RegExp(`^[a-zA-Z0-9\u4e00-\u9fa5_]{1,${length}}$`);
    if (!regex.test(value)) {
        return Promise.reject(new Error(`仅支持中、英文，数字、下划线(_)，1-${length} 个字符`));
    }
    return Promise.resolve();
};

export {checkInputString};

const uuidBothRegex = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|[0-9a-fA-F]{8}[0-9a-fA-F]{4}[1-5][0-9a-fA-F]{3}[89abAB][0-9a-fA-F]{3}[0-9a-fA-F]{12})$/;

export {uuidBothRegex};
