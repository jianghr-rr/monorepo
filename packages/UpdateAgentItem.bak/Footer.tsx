/* eslint-disable complexity */
/* eslint-disable no-empty */
/**
 * @file Update Agent步骤的控制组件
 * @author jianghaoran01
 */
import {useCallback} from 'react';
import {Button, notification, Space, message} from 'antd';
import {useSnapshot} from 'valtio';
import {useRequest} from '@/api/request';
import {updateAgent, debugAgent, saveResponse} from '../api';
import {stepState, agentIdState, step3ResState} from './store';
import type {StepListRef, IStep0, IStep1, IStep2, IStep3, IStep3Res} from './types';

interface FooterProps {
    stepListRef: React.RefObject<StepListRef>;
    cancelAction?: (noModal?: boolean) => void; // 关闭modal的函数
}

const Footer = ({stepListRef, cancelAction}: FooterProps) => {
    const stepSnap = useSnapshot(stepState);
    // 接口正常返回的agentId放在data中
    const {runAsync: updateAgentTask} = useRequest<string>(updateAgent, {
        manual: true,
    });

    const {runAsync: saveResponseTask} = useRequest<{id: string, response: string}>(saveResponse, {
        manual: true,
    });

    const handleGetValues = useCallback(async (direction: 'prev' | 'next') => {
        if (!stepListRef.current) {
            return;
        }
        try {
            // 上一步只校验
            if (direction === 'prev' && stepSnap.currentStep > 0) {
                await stepListRef.current.validateCurrentValues();
                stepState.currentStep -= 1; // 上一步
                return;
            }
            await stepListRef.current.validateCurrentValues();
            stepListRef.current.setLoading(true);
            const data = await stepListRef.current.getValues<IStep0 & IStep1 & IStep2 & IStep3 & {responseDebug: string}>();
            stepListRef.current.setLoading(false);
            const res = await updateAgentTask({
                id: agentIdState.value ?? undefined,
                ...data,
            });
            // 创建的时候会返回ID，更新到全局状态中，后续操作就会成更新操作
            if (res) {
                agentIdState.value = res;
            }
            else {
                notification.error({
                    message: '',
                    description: '更新失败',
                });
                return;
            }
            stepListRef.current.setLoading(false);
            // 如果有response，表示有调试结果，点击最后一次的时候，保存一下
            if (stepSnap.currentStep === 3 && data.responseDebug) {
                await saveResponseTask({
                    id: agentIdState.value ?? '',
                    response: data.responseDebug,
                });
            }
            // 到最后一步提示成功
            if (direction === 'next' && stepSnap.currentStep === 3) {
                notification.success({
                    message: '',
                    description: '配置成功',
                });
                // 关闭modal
                cancelAction?.(true);
            }
            if (direction === 'next' && stepSnap.currentStep < 3) {
                stepState.currentStep += 1; // 下一步
            }
        } catch (error) {
            console.error(error);
        } finally {
            stepListRef.current?.setLoading(false);
        }
    }, [stepListRef, updateAgentTask, saveResponseTask, stepSnap, cancelAction]);

    return (
        <Space size="middle">
            <Button className="min-w-[72px]" onClick={() => cancelAction?.()}>取消</Button>
            <Button className="min-w-[72px]" onClick={() => handleGetValues('prev')} type="primary" ghost disabled={stepState.currentStep === 0}>上一步</Button>
            <Button className="min-w-[72px]" onClick={() => handleGetValues('next')} type="primary">
                {stepSnap.currentStep === 3 ? '确认配置' : '下一步'}
            </Button>
        </Space>
    );
};

export default Footer;
export {Footer};
