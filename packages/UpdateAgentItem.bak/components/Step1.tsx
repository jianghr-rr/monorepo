/**
 * @file 动态表单
 * @author jianghaoran01
 * @description Table和Form.list的组合来实现
 */
import {forwardRef, useImperativeHandle, useState, useMemo, useCallback} from 'react';
import {Table, Tabs, Form, Input, Select, Button, Space, Spin, Typography, Switch} from 'antd';
import {CaretRightOutlined, CaretDownOutlined, PlusOutlined} from '@ant-design/icons';
import {useSnapshot, snapshot} from 'valtio';
import DefaultAvatar from '@/assets/no-data.svg?react';
import {step1State} from '../store';
import {GetDefaultParams, BodyParamsType, QueryParamsType} from '../const';
import {transformListToChildren, transformChildrenToList} from '../helpers';
import type {StepComponentRef, IStep1, IBodyParamsField, IQueryParamsField} from '../types';
import styles from './index.less';

const {Column} = Table;

const Step1 = forwardRef<StepComponentRef<IStep1>>((_, ref) => {
    const step1StateSnap = useSnapshot(step1State);
    const [loading, setLoading] = useState(false);
    const [queryForm] = Form.useForm(); // 需要校验，用三个 form
    const [bodyForm] = Form.useForm();
    const [headerForm] = Form.useForm();
    const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]); // 存储当前展开的行 key
    const [activeKey, setActiveKey] = useState('query'); // 当前选中的 tab key

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
            return Promise.resolve(snapshot(step1State) as unknown as IStep1);
        },
        validateCurrentValues: async () => {
            return new Promise((resolve, reject) => {
                Promise.all([
                    queryForm.validateFields().catch(err => {
                        setActiveKey('query');
                        throw err;
                        // throw new Error(JSON.stringify(err));
                    }),
                    bodyForm.validateFields().catch(err => {
                        setActiveKey('body');
                        throw err;
                        // throw new Error(JSON.stringify(err));
                    }),
                    headerForm.validateFields().catch(err => {
                        setActiveKey('header');
                        throw err;
                        // throw new Error(JSON.stringify(err));
                    }),
                ])
                    .then(() => resolve(step1State)) // 全部通过，resolve
                    .catch(err => {
                        setTimeout(() => {
                            const errorFields = (err).errorFields;
                            if (errorFields.length > 0) {
                                document.getElementById(`${errorFields[0].name.join('_')}`)?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'center',
                                });
                            }
                        }, 100);
                        reject(new Error('校验失败'));
                    });
            });
        },
        setLoading: (loading: boolean) => setLoading(loading),
    }));

    // 处理表单变更
    const onHeaderValuesChange = (_: any, allValues: any) => {
        step1State.header = transformListToChildren(allValues.list);
    };

    const onBodyValuesChange = (_: any, allValues: any) => {
        step1State.body = transformListToChildren(allValues.list);
    };

    const onQueryValuesChange = (_: any, allValues: any) => {
        step1State.query = transformListToChildren(allValues.list);
    };

    // 处理每个参数项的children
    const renderChildrenTable = (fieldNames: Array<string | number>, listFieldName: Array<string | number>, level: number = 0, form, selectedKey?: string) => {
        return (
            <Form.List name={listFieldName}>
                {(fields, {add, remove}) => (
                    <div className={`rounded-3 overflow-hidden border border-gray-200 ${level === 0 ? 'min-h-[320px]' : ''}`}>
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
                                emptyText: level === 0 ? (
                                    <div className="flex h-[265px] flex-col items-center justify-center">
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
                                    </div>
                                ) : null,
                            }}
                            scroll={level === 0 ? {y: 100 * 5} : {}}
                        >
                            <Column
                                title="参数名称"
                                dataIndex="name"
                                key="name"
                                width={260}
                                ellipsis
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
                                ellipsis
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
                                ellipsis
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
                                ellipsis
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
                                ellipsis
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
                                ellipsis
                                // width={140}
                                render={(_, reactNode, index) => (
                                    <Space size={12}>
                                        <Button
                                            type="link"
                                            className="p-0"
                                            disabled={
                                                form.getFieldValue([...fieldNames, index, 'type']) !== 'OBJECT'
                                                || level >= 4
                                            }
                                            onClick={() => {
                                                const currentList = form.getFieldValue([...fieldNames, index, 'list']) || [];
                                                form.setFieldValue([...fieldNames, index, 'list'], [...currentList, GetDefaultParams()]);

                                                const currentKey = reactNode.feId;
                                                const newExpandedRowKeys = [...expandedRowKeys, currentKey];
                                                setExpandedRowKeys(newExpandedRowKeys); // 更新展开的行
                                            }}
                                        >
                                            添加子参数
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
            <Tabs activeKey={activeKey} onChange={setActiveKey} className={styles.tabs}>
                <Tabs.TabPane tab="Query" key="query">
                    <Form
                        form={queryForm}
                        component={false}
                        initialValues={{list: transformChildrenToList(step1StateSnap.query)}}
                        autoComplete="off"
                        onValuesChange={onQueryValuesChange}
                    >
                        {renderChildrenTable(['list'], ['list'], 0, queryForm, 'query')}
                    </Form>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Body" key="body">
                    <Form
                        form={bodyForm}
                        component={false}
                        initialValues={{list: transformChildrenToList(step1StateSnap.body)}}
                        autoComplete="off"
                        onValuesChange={onBodyValuesChange}
                    >
                        {renderChildrenTable(['list'], ['list'], 0, bodyForm, 'body')}
                    </Form>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Header" key="header">
                    <Form
                        form={headerForm}
                        component={false}
                        initialValues={{list: transformChildrenToList(step1StateSnap.header)}}
                        autoComplete="off"
                        onValuesChange={onHeaderValuesChange}
                    >
                        {renderChildrenTable(['list'], ['list'], 0, headerForm, 'header')}
                    </Form>
                </Tabs.TabPane>
            </Tabs>
        </Spin>
    );
});

export default Step1;
export {Step1};
