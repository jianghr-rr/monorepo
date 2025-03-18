/**
 * @file 动态表单
 * @author jianghaoran01
 * @description Table和Form.list的组合来实现
 */
import {forwardRef, useImperativeHandle, useState, useCallback} from 'react';
import {Table, Form, Input, Select, Button, Space, Spin, Typography, Switch} from 'antd';
import {CaretRightOutlined, CaretDownOutlined, PlusOutlined} from '@ant-design/icons';
import {useSnapshot, snapshot} from 'valtio';
import DefaultAvatar from '@/assets/no-data.svg?react';
import {step2State} from '../store';
import {GetDefaultParams, BodyParamsType, QueryParamsType} from '../const';
import {transformListToChildren, transformChildrenToList} from '../helpers';
import type {StepComponentRef, IStep2, IBodyParamsField, IQueryParamsField} from '../types';
import styles from './index.less';

const {Column} = Table;

const Step2 = forwardRef<StepComponentRef<IStep2>>((_, ref) => {
    const Step2StateSnap = useSnapshot(step2State);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]); // 存储当前展开的行 key

    const scrollToRow = useCallback((feId: string) => {
        // 确保展开行
        if (!expandedRowKeys.includes(feId)) {
            setExpandedRowKeys(prev => [...prev, feId]);
        }

        setTimeout(() => {
            const row = document.querySelector(`[data-row-key="${feId}"]`);
            row?.scrollIntoView({behavior: 'smooth', block: 'center'});
        }, 200); // 等待 DOM 渲染完成
    }, [expandedRowKeys]);

    useImperativeHandle(ref, () => ({
        getCurrentValues: async () => {
            return Promise.resolve(snapshot(step2State) as unknown as IStep2);
        },
        validateCurrentValues: async () => {
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

    // 处理表单变更
    const onValuesChange = (_: any, allValues: any) => {
        step2State.response = transformListToChildren(allValues.list);
    };

    // 处理每个参数项的children
    const renderChildrenTable = (fieldNames: Array<string | number>, listFieldName: Array<string | number>, level: number = 0, form, selectedKey?: string) => {
        return (
            <Form.List name={listFieldName}>
                {(fields, {add, remove}) => (
                    <div className={'rounded-3 min-h-[356px] overflow-hidden border border-gray-200'}>
                        <Table<IBodyParamsField | IQueryParamsField>
                            style={{width: '100%'}}
                            className={styles.table}
                            showHeader={level === 0}
                            dataSource={form.getFieldValue(fieldNames)}
                            rowKey="feId"
                            virtual={false}
                            pagination={false}// 使用 expandedRowKeys 来控制展开行
                            expandable={{
                                expandedRowRender: (record, index, expanded, props) => {
                                    if (record?.list && record?.list?.length > 0) {
                                        return renderChildrenTable([...fieldNames, index, 'list'], [index, 'list'], level + 1, form, selectedKey);
                                    }
                                    return null;
                                },
                                expandedRowKeys: expandedRowKeys,
                                showExpandColumn: false, // 不显示展开列
                            }}
                            locale={{
                                emptyText: (
                                    <div className="flex h-[301px] flex-col items-center justify-center">
                                        <DefaultAvatar />
                                        <p>
                                            <span className="text-gray-400">暂无请求参数 </span>
                                            <Button
                                                className="text-12"
                                                type="link"
                                                onClick={() => {
                                                    const rowData = GetDefaultParams();
                                                    add(rowData);
                                                }}
                                                size="small"
                                                icon={<PlusOutlined />}
                                            >添加参数
                                            </Button>
                                        </p>
                                    </div>),
                            }}
                            scroll={level === 0 ? {y: 100 * 5} : {}}
                        >
                            <Column
                                title="参数名称"
                                dataIndex="name"
                                key="name"
                                width={260}
                                render={(_, reactNode, index) => (
                                    <div className="flex items-center">
                                        <Typography.Text
                                            disabled={reactNode.list?.length === 0}
                                            className="cursor-pointer"
                                            style={{marginLeft: 8 * level, marginRight: 8}}
                                            onClick={() => {
                                                if (reactNode.list?.length === 0) {
                                                    return;
                                                }
                                                const currentKey = reactNode.feId;
                                                const newExpandedRowKeys = expandedRowKeys.includes(currentKey)
                                                    ? expandedRowKeys.filter(key => key !== currentKey)
                                                    : [...expandedRowKeys, currentKey];
                                                setExpandedRowKeys(newExpandedRowKeys); // 更新展开的行
                                            }}
                                        >
                                            {expandedRowKeys.includes(reactNode.feId) ? <CaretDownOutlined /> : <CaretRightOutlined />}
                                        </Typography.Text>
                                        <Form.Item
                                            className="flex-1"
                                            name={[index, 'name']}
                                            dependencies={
                                                fields.map(item => item.name)
                                                    .filter(item => item !== index)?.map(item => [...fieldNames, item, 'name'])
                                            }
                                            rules={[
                                                {required: true, message: '请输入参数名称'},
                                                {
                                                    validator: async (_, value) => {
                                                        const nameList = form.getFieldValue(fieldNames).map(item => item.name) || [];
                                                        if (value !== '' && nameList.filter(item => item === value).length > 1) {
                                                            throw new Error('参数名称不能重复');
                                                        }
                                                    },
                                                },
                                            ]}
                                        >
                                            <Input placeholder="请输入参数名称" />
                                        </Form.Item>
                                    </div>
                                )}
                            />
                            <Column
                                title="参数类型"
                                dataIndex="type"
                                key="type"
                                width={140}
                                render={(_, reactNode, index) => (
                                    <Form.Item
                                        name={[index, 'type']}
                                        rules={[{required: true, message: '请选择类型'}]}
                                    >
                                        <Select options={
                                            selectedKey === 'body'
                                                ? Object.entries(BodyParamsType).map(([value, label]) => ({value, label}))
                                                : Object.entries(QueryParamsType).map(([value, label]) => ({value, label}))
                                        }
                                        />
                                    </Form.Item>
                                )}
                            />
                            <Column
                                title="参数别名"
                                dataIndex="alias"
                                key="alias"
                                width={140}
                                render={(_, reactNode, index) => (
                                    <Form.Item
                                        name={[index, 'alias']}
                                    >
                                        <Input placeholder="请输入参数别名" />
                                    </Form.Item>
                                )}
                            />
                            <Column
                                title="是否必填"
                                dataIndex="required"
                                key="required"
                                width={120}
                                render={(_, reactNode, index) => (
                                    <Space>
                                        <Form.Item
                                            name={[index, 'required']}
                                            getValueProps={value => ({checked: !!value})}
                                            getValueFromEvent={event => (event ? 1 : 0)}
                                        >
                                            <Switch />
                                        </Form.Item>
                                        <span>{form.getFieldValue([...fieldNames, index, 'required']) === 1 ? '是' : '否'}</span>
                                    </Space>
                                )}
                            />
                            <Column
                                title="参数说明"
                                dataIndex="description"
                                key="description"
                                width={160}
                                render={(_, reactNode, index) => (
                                    <Form.Item
                                        name={[index, 'description']}
                                    >
                                        <Input placeholder="请输入参数说明" />
                                    </Form.Item>
                                )}
                            />
                            <Column
                                title="操作"
                                dataIndex="action"
                                key="action"
                                // width={140}
                                render={(_, reactNode, index) => (
                                    <Space size={12}>
                                        <Button
                                            type="link"
                                            className="p-0"
                                            disabled={form.getFieldValue([...fieldNames, index, 'type']) !== 'object'}
                                            onClick={() => {
                                                const currentList = form.getFieldValue([...fieldNames, index, 'list']) || [];
                                                form.setFieldValue([...fieldNames, index, 'list'], [...currentList, GetDefaultParams()]);
                                            }}
                                        >
                                            添加子项
                                        </Button>
                                        <Button
                                            className="p-0"
                                            type="link"
                                            onClick={() => remove(index)}
                                        >
                                            删除
                                        </Button>
                                    </Space>
                                )}
                            />
                        </Table>
                        {(level === 0 && form.getFieldValue(fieldNames).length > 0) && (
                            <Button
                                className="text-12"
                                type="link"
                                icon={<PlusOutlined />}
                                onClick={() => {
                                    const rowData = GetDefaultParams();
                                    add(rowData);
                                    scrollToRow(rowData.feId);
                                }}
                            >添加参数
                            </Button>
                        )}
                    </div>
                )}
            </Form.List>
        );
    };

    return (
        <Spin spinning={loading}>
            <Form
                form={form}
                component={false}
                initialValues={{list: transformChildrenToList(Step2StateSnap.response)}}
                autoComplete="off"
                onValuesChange={onValuesChange}
            >
                {renderChildrenTable(['list'], ['list'], 0, form, 'response')}
            </Form>
        </Spin>
    );
});

export default Step2;
export {Step2};
