/**
 * @file 关联Agent第一步
 * @author jianghaoran01
 * @description 第一步：基础信息
 */
import {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {Form, Input, Select, Upload, Avatar, TreeSelect, Button, Space, Spin, message, notification} from 'antd';
import {useSnapshot, snapshot} from 'valtio';
import {IconDeleteIcon} from '@x-elf/ui-icon';
import type {UploadRequestOption} from 'rc-upload/lib/interface';
import {PlusOutlined} from '@ant-design/icons';
import {useUploadImage} from '@/pages/ElfManage/api';
import DefaultAvatar from '@/assets/agent-default.svg?react';
import {useRequest} from '@/api/request';
import {SourceType, Method} from '../const';
import {step0State} from '../store';
import {getTagList} from '../../api';
import {buildTreeFromSelected, flattenTreeToArray, findParentTreeMultiple, filterValidNodes, checkInputString, uuidBothRegex} from '../helpers';
import type {StepComponentRef, IStep0, TagNode} from '../types';

const Step0 = forwardRef<StepComponentRef<IStep0>>((_, ref) => {
    const step0StateSnap = useSnapshot(step0State);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState(''); // 搜索框的值
    const [data] = useState<Omit<IStep0, 'label'> & { label: string[] }>({
        ...step0StateSnap,
        label: flattenTreeToArray(step0StateSnap.label),
    });
    const [imageUrl, setImageUrl] = useState(step0StateSnap.iconUrl || '');
    const [resIds, setResIds] = useState<Array<string | number>>(flattenTreeToArray(step0StateSnap.label));

    const {runAsync: runUploadImage} = useUploadImage();
    const {data: tagList} = useRequest<TagNode[]>(getTagList());

    // 先准备联调，todo: 结合到Form.Item里面
    const customRequest = ({file, onSuccess, onError}: UploadRequestOption) => {
        const formData = new FormData();
        formData.append('file', file);
        runUploadImage(formData).then(res => {
            if (res.imageUrl) {
                setImageUrl(res.imageUrl);
                form.setFieldsValue({iconUrl: res.imageUrl}); // 更新 Form 值
                // onSuccess(res, file);
            } else {
                onError(new Error(res.message));
                notification.error({
                    message: '',
                    description: res.message,
                });
            }
        }).catch(err => {
            onError(err);
        });
    };

    useImperativeHandle(ref, () => ({
        getCurrentValues: async () => {
            const labelList = form.getFieldsValue(['label']).label || [];
            const labelTree = buildTreeFromSelected(labelList, tagList);
            const res = {
                ...form.getFieldsValue(),
                label: labelTree,
            };

            Object.assign(step0State, res);
            return Promise.resolve(res);
        },
        validateCurrentValues: async () => {
            // 定位到第一个错误字段，并滚动到可视区域
            try {
                await form.validateFields();
            } catch (error) {
                const errorFields = (error as any).errorFields;
                if (errorFields.length > 0) {
                    document.getElementById(`${errorFields[0].name.join('_')}`)?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    });
                }
                return Promise.reject(error);
            }
        },
        setLoading: (loading: boolean) => setLoading(loading),
    }));

    const prefixSelector = (
        <Form.Item name="method" noStyle>
            <Select style={{width: 100}} options={Object.keys(Method).map(key => ({label: Method[key], value: key}))} />
        </Form.Item>
    );

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
        if (errorInfo.errorFields.length > 0) {
            form.scrollToField(errorInfo.errorFields[0].name, {
                behavior: 'smooth', // 平滑滚动
                block: 'center', // 滚动到屏幕中间
            });
        }
    };


    return (
        <Spin spinning={loading}>
            <Form
                form={form}
                labelCol={{span: 6}}
                labelAlign="left"
                style={{maxWidth: 600}}
                initialValues={data}
                scrollToFirstError={{behavior: 'instant', block: 'end', focus: true}}
                onValuesChange={(changedValues, allValues) => {
                    if ('label' in changedValues) {
                        // PM要半级联，只关联父节点，不关注子节点 ...., 没有半选状态
                        // 技术上：自己选中的时候要把父节点也标记为选中
                        // 自己被取消选中的时候不用管父节点了
                        if (changedValues.label.map(item => item.value).length < resIds.length) {
                            const ids = filterValidNodes(tagList, changedValues.label.map(item => item.value));
                            const result = findParentTreeMultiple(tagList, ids);

                            form.setFieldsValue({
                                label: [...result.ids],
                            });
                            setResIds([...result.ids]);
                        }
                        else {
                            const result = findParentTreeMultiple(tagList, changedValues.label.map(item => item.value));
                            form.setFieldsValue({
                                label: [...result.ids],
                            });
                            setResIds([...result.ids]);
                        }
                    }
                }}
            >
                <Form.Item<IStep0>
                    label="接入来源"
                    name="sourceType"
                    rules={[{required: true}]}
                >
                    <Select
                        placeholder="请选择接入来源"
                        options={Object.keys(SourceType).map(key => ({label: SourceType[key], value: Number(key)}))}
                    />
                </Form.Item>
                {/* 依赖 sourceType 变化 */}
                <Form.Item shouldUpdate noStyle>
                    {({getFieldValue}) =>
                        (getFieldValue('sourceType') === 1 ? (
                            <Form.Item<IStep0>
                                label="Agent ID"
                                name="agentId"
                                rules={[
                                    {
                                        required: true,
                                        pattern: uuidBothRegex,
                                        message: '请输入有效的 UUID（带或不带 `-`）',
                                    },
                                ]}
                            >
                                <Input placeholder="请输入有效的 UUID（带或不带 `-`）" maxLength={100} minLength={2} showCount />
                            </Form.Item>
                        ) : null)
                    }
                </Form.Item>
                <Form.Item<IStep0>
                    label="Agent 名称"
                    name="name"
                    rules={[{required: true, validator: (_, value) => checkInputString(value, 30)}]}
                >
                    <Input placeholder="仅支持中、英文，数字，下划线(_)，1-30 个字符" maxLength={30} minLength={1} showCount />
                </Form.Item>
                <Form.Item<IStep0>
                    label="描述"
                    name="description"
                    rules={[{required: true}]}
                >
                    <Input.TextArea placeholder="请输入Agent说明" maxLength={200} showCount rows={4} />
                </Form.Item>
                <Form.Item<IStep0>
                    label="头像"
                    name="iconUrl"
                >
                    <Upload
                        maxCount={1}
                        accept="image/*"
                        customRequest={customRequest}
                        itemRender={() => (<></>)}
                    >
                        {
                            imageUrl ? (
                                <img src={imageUrl} className="rounded-2 size-[80px] cursor-pointer object-cover" alt="avatar" />
                            ) : (
                                <DefaultAvatar />
                            )
                        }
                    </Upload>
                </Form.Item>
                <Form.Item<IStep0>
                    label="请求方法及路径"
                    name="host"
                    rules={[{required: true}]}
                >
                    <Input addonBefore={prefixSelector} style={{width: '100%'}} />
                </Form.Item>
                <Form.Item<IStep0>
                    label="具体路径"
                    name="path"
                    rules={[{required: true}]}
                >
                    <Input placeholder="请输入具体路径" />
                </Form.Item>
                <Form.Item<IStep0>
                    label="关联标签"
                    name="label"
                    rules={[{required: true}]}
                >
                    <TreeSelect
                        treeData={tagList}
                        multiple
                        fieldNames={{label: 'name', value: 'id', children: 'children'}} // 修改字段名
                        treeDefaultExpandAll
                        treeCheckable
                        treeCheckStrictly
                        showCheckedStrategy={TreeSelect.SHOW_ALL}
                        searchValue={searchValue}
                        onSearch={setSearchValue}
                        filterTreeNode={(inputValue, treeNode) => {
                            return treeNode?.name?.toLowerCase().includes(inputValue?.toLowerCase());
                        }}
                        treeTitleRender={node => {
                            const {name} = node;
                            if (!searchValue) {
                                return name;
                            }
                            const index = name?.toLowerCase().indexOf(searchValue?.toLowerCase());
                            if (index === -1) {
                                return name;
                            }
                            return (
                                <>
                                    {name?.substring(0, index)}
                                    <span className="text-blue-500">{name?.substring(index, index + searchValue?.length)}</span>
                                    {name?.substring(index + searchValue?.length)}
                                </>
                            );
                        }}
                    />
                </Form.Item>
                <Form.Item<IStep0>
                    label="触发词"
                    name="triggerWord"
                    // rules={[{required: true}]}
                >
                    <Form.List
                        name="triggerWord"
                    >
                        {(fields, {add, remove}) => (
                            <div className="flex flex-col gap-[10px]">
                                <Button
                                    type="primary"
                                    ghost
                                    size="small"
                                    onClick={() => add('')}
                                    icon={<PlusOutlined />}
                                    className="text-12 self-start"
                                >
                                    添加触发词
                                </Button>
                                {
                                    fields?.length > 0 && (
                                        <div className="mr-[-100px] rounded-md bg-gray-50 p-4 pb-0">
                                            {fields.map(({key, name, ...restField}, index) => (
                                                <Space key={key} className="align-center mb-4 flex items-center gap-4">
                                                    <span>触发词{index + 1}: </span>
                                                    <Form.Item
                                                        {...restField}
                                                        name={name}
                                                        dependencies={
                                                            fields.map(item => item.name)
                                                                .filter(item => item !== index)?.map(item => ['triggerWord', item])
                                                        }
                                                        rules={[
                                                            {required: true, message: '请输入触发词'},
                                                            {
                                                                validator: async (_, value) => {
                                                                    const triggerWords = form.getFieldValue('triggerWord') || [];
                                                                    if (value !== '' && triggerWords.filter(item => item === value).length > 1) {
                                                                        throw new Error('触发词不能重复');
                                                                    }
                                                                },
                                                            },
                                                        ]}
                                                    >
                                                        <Input style={{width: '400px'}} placeholder="请输入触发词" maxLength={100} showCount />
                                                    </Form.Item>
                                                    <IconDeleteIcon className="block cursor-pointer text-gray-600" onClick={() => remove(index)} />
                                                </Space>
                                            ))}
                                        </div>
                                    )
                                }
                            </div>
                        )}
                    </Form.List>
                </Form.Item>
            </Form>
        </Spin>
    );
});

// 第一步
export default Step0;
export {Step0};
