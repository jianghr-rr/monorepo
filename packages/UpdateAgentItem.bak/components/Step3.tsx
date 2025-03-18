/**
 * @file 关联Agent第四步
 * @author jianghaoran01
 * @description 第四步: 调试
 */
import {forwardRef, useImperativeHandle, useState, useRef, useEffect, useId, useCallback} from 'react';
import {Typography, Spin, Tabs, Form, Table, Input, Checkbox, Space, Button} from 'antd';
import {snapshot, useSnapshot} from 'valtio';
import {isEmpty} from 'lodash';
import {EditorView} from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';
import {linter} from '@codemirror/lint';
import {IconCopyIcon} from '@x-elf/ui-icon';
import {loadLanguage} from '@uiw/codemirror-extensions-langs';
import DefaultAvatar from '@/assets/no-data.svg?react';
import {useRequest} from '@/api/request';
import {transformChildrenToListAddValue, transformBodyData, isValidJSON, formatThousand} from '../helpers';
import type {StepComponentRef, IStep3, IBodyParamsField, IQueryParamsField, IStep3Res} from '../types';
import {agentIdState, step0State, step1State, step3State, step3ResState} from '../store';
import {debugAgent} from '../../api';
import styles from './index.less';

const {Column} = Table;

const customTheme = EditorView.theme({
    '&': {
        color: 'rgba(34, 34, 34, 0.7)', // 设置文本颜色
    },
}, {dark: false});


const jsonLinter = linter(view => {
    const text = view.state.doc.toString();
    const found = [];
    try {
        JSON.parse(text);
    } catch (e) {
        if (e instanceof SyntaxError) {
            const message = e.message;
            const position = /at position (\d+)/.exec(e.message);
            const pos = position ? parseInt(position[1], 10) : 0;
            found.push({
                from: pos,
                to: pos + 1,
                message: message,
                severity: 'error',
            });
        }
    }
    return found;
});

export interface CodeMirrorWrapProps {
    value?: string;
    height?: string;
    onChange: (val: string) => void;
}

const Step3 = forwardRef<StepComponentRef<IStep3>>((_, ref) => {
    const agentIdStateSnapshot = snapshot(agentIdState);
    const step0StateSnapshot = useSnapshot(step0State);
    const step1StateSnapshot = useSnapshot(step1State);
    const step3StateSnap = useSnapshot(step3State);
    const step3ResStateSnapshot = useSnapshot(step3ResState);
    const [jsonContainerKey] = useId();
    const [queryForm] = Form.useForm();
    const [headerForm] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [activeKey, setActiveKey] = useState('query'); // 当前选中的 tab key
    const [params, setParams] = useState<{
        body?: Record<string, any>; header?: Record<string, any>; query?: Record<string, any>; debugSave?: 0 | 1;
        debugQuery?: Record<string, any>; debugHeader?: Record<string, any>; debugBody?: Record<string, any>; responseDebug?: string;
    }>({
        body: step3StateSnap.debugBody,
        header: step3StateSnap.debugHeader,
        query: step3StateSnap.debugQuery,
        debugSave: step3StateSnap.debugSave,
        debugQuery: step3StateSnap.debugQuery,
        debugHeader: step3StateSnap.debugHeader,
    });
    const [saveChecked, setSaveChecked] = useState(step3StateSnap.debugSave === 1);
    const [initDebugBody, setInitDebugBody] = useState('');
    const paramsRef = useRef(params);
    const [responseRes, setResponseRes] = useState<IStep3Res>({});

    const {runAsync: debugAgentTask, loading: debugAgentLoading} = useRequest<IStep3Res>(debugAgent, {manual: true});

    const onHeaderValuesChange = (_: any, allValues: any) => {
        const obj = {};
        allValues?.list?.forEach(item => {
            if (item.value !== undefined) {
                obj[item.name] = item.value;
            }
        });
        setParams(prevParams => ({
            ...prevParams,
            header: {...obj},
            debugHeader: {...obj},
        }));
    };

    const onBodyValuesChange = str => {
        let bodyMap;
        if (isValidJSON(str)) {
            bodyMap = JSON.parse(str);
        }
        else {
            bodyMap = str;
        }
        setParams(prevParams => ({
            ...prevParams,
            body: bodyMap,
            debugBody: bodyMap,
        }));
    };

    const onQueryValuesChange = (_: any, allValues: any) => {
        const obj = {};
        allValues?.list?.forEach(item => {
            if (item.value !== undefined) {
                obj[item.name] = item.value;
            }
        });
        setParams(prevParams => ({
            ...prevParams,
            query: {...obj},
            debugQuery: {...obj},
        }));
    };

    useEffect(() => {
        paramsRef.current = params;
        paramsRef.current.debugSave = saveChecked ? 1 : 0;
        paramsRef.current.responseDebug = responseRes.responseBody;
    }, [params, saveChecked, paramsRef, responseRes]);

    // 设置默认的Body值
    useEffect(() => {
        if (isEmpty(snapshot(step3State)?.debugBody)) {
            if (isEmpty(snapshot(step1State)?.body)) {
                setInitDebugBody('');
            }
            else {
                const bodyObj = transformBodyData(snapshot(step1State).body);
                const str = JSON.stringify(bodyObj, null, 2);
                setInitDebugBody(str);
                setParams(prevParams => ({
                    ...prevParams,
                    body: bodyObj,
                    debugBody: bodyObj,
                }));
            }
        }
        else {
            const bodyObj = snapshot(step3State).debugBody;
            const str = JSON.stringify(bodyObj, null, 2);
            setInitDebugBody(str);
            setParams(prevParams => ({
                ...prevParams,
                body: bodyObj,
                debugBody: bodyObj,
            }));
        }
    }, [step3StateSnap, step1StateSnapshot, headerForm, queryForm]);

    // 处理每个参数项的children
    const renderChildrenTable = (fieldNames: Array<string | number>, listFieldName: Array<string | number>, level: number = 0, form, selectedKey?: string) => {
        return (
            <Form.List name={listFieldName}>
                {(fields, {add, remove}) => (
                    <div className={`rounded-3 overflow-hidden border border-gray-200 ${level === 0 ? 'min-h-[230px]' : ''}`}>
                        <Table<IBodyParamsField | IQueryParamsField>
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
                                showExpandColumn: false, // 不显示展开列
                            }}
                            locale={{
                                emptyText: (
                                    <div className="flex h-[193px] flex-col items-center justify-center">
                                        <DefaultAvatar />
                                        <p>
                                            <span className="text-gray-400">暂无请求参数 </span>
                                        </p>
                                    </div>),
                            }}
                        >
                            <Column
                                className="text-12 px-[8px]"
                                title="参数名称"
                                dataIndex="name"
                                key="name"
                                ellipsis
                                width={60}
                                render={(_, reactNode, index) => _}
                            />
                            <Column
                                className="text-12 px-[8px]"
                                title="参数类型"
                                dataIndex="type"
                                key="type"
                                width={60}
                                render={(_, reactNode, index) => (
                                    _
                                )}
                            />
                            <Column
                                className="text-12 px-[8px]"
                                title="是否必填"
                                dataIndex="required"
                                key="required"
                                width={60}
                                render={(_, reactNode, index) => (
                                    String(_) === '1' ? '是' : '否'
                                )}
                            />
                            <Column
                                className="text-12 px-[8px]"
                                title="参数赋值"
                                dataIndex="action"
                                key="action"
                                width={140}
                                render={(_, reactNode, index) => (
                                    <Form.Item
                                        name={[index, 'value']}
                                        rules={[{
                                            required: reactNode.required === 1,
                                            message: '该项为必填项',
                                        }]}
                                    >
                                        <Input placeholder="请输入参数值" />
                                    </Form.Item>
                                )}
                            />
                        </Table>
                    </div>
                )}
            </Form.List>
        );
    };

    const onDebugAgent = useCallback(async () => {
        try {
            const {body, header, query} = params;
            const data = await debugAgentTask({
                agentId: agentIdStateSnapshot.value,
                requestUrl: `${step0StateSnapshot.host}${step0StateSnapshot.path}`,
                body, header, query,
            });
            setResponseRes(data);
        }
        catch (err) {
            setResponseRes({
                responseCode: '500',
                message: err.toString(),
            });
        }
    }, [step0StateSnapshot, params, debugAgentTask, agentIdStateSnapshot.value]);

    useImperativeHandle(ref, () => ({
        getCurrentValues: async () => {
            const {
                debugSave, debugBody, debugHeader, debugQuery, responseDebug,
            } = paramsRef.current;
            const obj = {
                debugSave, debugBody, debugHeader, debugQuery,
            };
            Object.assign(step3State, obj);
            return Promise.resolve({
                debugSave, debugBody, debugHeader, debugQuery, responseDebug,
            });
        },
        validateCurrentValues: async () => {
            return new Promise<IStep3>((resolve, reject) => {
                Promise.all([
                    queryForm.validateFields().catch(err => {
                        setActiveKey('query');
                        throw err;
                    }),
                    headerForm.validateFields().catch(err => {
                        setActiveKey('header');
                        throw err;
                    }),
                ])
                    .then(() => resolve(step3State)) // 所有校验通过，resolve
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
            }).catch(() => {
                return Promise.reject(new Error('校验失败'));
            });
        },
        setLoading: (loading: boolean) => setLoading(loading),
    }));

    return (
        <Spin spinning={loading}>
            <div className="flex w-full flex-col">
                <div className="flex w-full items-center justify-between text-xs font-normal">
                    <Typography.Paragraph
                        copyable={{
                            icon: <div className="absolute top-[7px] size-[16px]"><IconCopyIcon className="block cursor-pointer text-gray-600 hover:text-blue-500 active:text-blue-600" /></div>,
                            text: `${step0StateSnapshot.host}${step0StateSnapshot.path}`,
                        }}
                    >
                        <Space>
                            <span className="text-gray-500">请求路径:</span>
                            <span className="text-green-500">{step0StateSnapshot.method}</span>
                            <span>{step0StateSnapshot.host + step0StateSnapshot.path}</span>
                        </Space>
                    </Typography.Paragraph>
                    <Checkbox
                        className="text-12 mb-[24px] font-normal"
                        checked={saveChecked}
                        onChange={e => setSaveChecked(e.target.checked)}
                    >
                        保存
                    </Checkbox>
                </div>
                <div className="flex flex-1 flex-row gap-2">
                    <div className="flex w-0 flex-1 shrink-0 grow flex-col">
                        <div className="text-12 text-color-gray-600 font-normal">请求参数赋值:</div>
                        <div className="mt-[8px] flex h-[286px] grow overflow-auto">
                            <Tabs
                                className={' w-full flex-1 shrink-0 grow ' + styles.tabs}
                                activeKey={activeKey}
                                onChange={setActiveKey}
                            >
                                <Tabs.TabPane tab="Query" key="query">
                                    <Form
                                        form={queryForm}
                                        component={false}
                                        initialValues={{list: transformChildrenToListAddValue(step1StateSnapshot.query, snapshot(step3State)?.debugQuery)}}
                                        autoComplete="off"
                                        onValuesChange={onQueryValuesChange}
                                    >
                                        {renderChildrenTable(['list'], ['list'], 0, queryForm, 'query')}
                                    </Form>
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Body" key="body">
                                    <CodeMirror
                                        className="border border-gray-200"
                                        key={jsonContainerKey}
                                        height={'230px'}
                                        basicSetup={{lineNumbers: false}}
                                        value={initDebugBody}
                                        extensions={[
                                            loadLanguage('json'),
                                            jsonLinter,
                                        ]}
                                        onChange={onBodyValuesChange}
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Header" key="header">
                                    <Form
                                        form={headerForm}
                                        component={false}
                                        initialValues={{list: transformChildrenToListAddValue(step1StateSnapshot.header, snapshot(step3State).debugHeader)}}
                                        autoComplete="off"
                                        onValuesChange={onHeaderValuesChange}
                                    >
                                        {renderChildrenTable(['list'], ['list'], 0, headerForm, 'header')}
                                    </Form>
                                </Tabs.TabPane>
                            </Tabs>
                        </div>
                    </div>
                    <div className="shrink-0">
                        <div className="flex h-full flex-col items-center justify-center gap-2">
                            <p className="text-blue-500">{'> > >'}</p>
                            <Button
                                type="primary"
                                onClick={onDebugAgent}
                                ghost
                                className="w-[72px]"
                                disabled={isEmpty(params.debugBody)}
                            >运行
                            </Button>
                        </div>
                    </div>
                    <div className="flex w-0 flex-1 shrink-0 grow flex-col">
                        <div className="flex gap-2">
                            <span className="text-12 text-color-gray-600 font-normal">响应结果: </span>
                            {responseRes.responseCode !== undefined
                                && (String(responseRes.responseCode) === '200'
                                    ? <span className="text-green-500">成功({responseRes.responseCode})</span>
                                    : <span className="text-red-500">失败({responseRes.responseCode})</span>
                                )}
                            {responseRes.responseCode !== undefined && <span>耗时: {responseRes.timeConsumed ? formatThousand(responseRes.timeConsumed) : '-'} ms</span>}
                        </div>
                        <div className="relative mt-[8px] box-border h-[100px] grow items-center justify-center overflow-auto border-2 border-gray-100">
                            <Spin spinning={debugAgentLoading} className={styles.spin} tip="正在运行中">
                                {
                                    isEmpty(responseRes)
                                        ? (
                                            <p className="relative flex h-full items-center justify-center text-gray-400">请输入参数后点击运行</p>
                                        )
                                        : (
                                            <CodeMirror
                                                height={'100%'}
                                                width={'100%'}
                                                editable={false}
                                                basicSetup={{lineNumbers: false}}
                                                value={
                                                    responseRes.message
                                                        ? responseRes.message
                                                        : isValidJSON(responseRes.responseBody) ? JSON.stringify(responseRes.responseBody, null, 2) : responseRes.responseBody
                                                }
                                                extensions={[
                                                    loadLanguage('json'),
                                                    jsonLinter,
                                                    EditorView.lineWrapping,
                                                    customTheme,
                                                ]}
                                                onChange={onBodyValuesChange}
                                            />
                                        )
                                }
                            </Spin>
                        </div>
                    </div>
                </div>
            </div>
        </Spin>
    );
});

// 第四步
export default Step3;
export {Step3};
