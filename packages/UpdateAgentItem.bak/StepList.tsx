/**
 * @file 关联Agent步骤组件的包裹组件
 * @author jianghaoran01
 */
import React, {forwardRef, useRef, useMemo, useImperativeHandle} from 'react';
import {Steps} from 'antd';
import {snapshot, useSnapshot} from 'valtio';
import {stepState, step0State, step1State, step2State, step3State} from './store';
import {Step0} from './components/Step0';
import {Step1} from './components/Step1';
import {Step2} from './components/Step2';
import {Step3} from './components/Step3';
import type {StepListRef, StepComponentRef} from './types';
import type {IStep0} from './types';
import type {IStep1} from './types';
import type {IStep2} from './types';
import type {IStep3} from './types';

const StepList = forwardRef<StepListRef>((_, ref) => {
    const stepSnapshot = useSnapshot(stepState);

    const stepRefs = useRef<Array<React.RefObject<StepComponentRef<any>>>>([
        useRef<StepComponentRef<IStep0>>(null),
        useRef<StepComponentRef<IStep1>>(null),
        useRef<StepComponentRef<IStep2>>(null),
        useRef<StepComponentRef<IStep3>>(null),
    ]);

    /**
     * getCurrentValues用于获取当前步骤的值
     * validateCurrentValues用于校验当前步骤的值
     */
    useImperativeHandle(ref, () => ({
        getCurrentValues: async function getCurrentValues<T>(): Promise<T> {
            const stepRef = stepRefs.current[stepSnapshot.currentStep].current;
            if (stepRef?.getCurrentValues) {
                return stepRef.getCurrentValues() as Promise<T>;
            }
            return Promise.reject(new Error('当前步骤不支持 getCurrentValues'));
        },
        validateCurrentValues: async () => {
            const stepRef = stepRefs.current[stepSnapshot.currentStep].current;
            if (stepRef?.validateCurrentValues) {
                return stepRef.validateCurrentValues();
            }
            return Promise.reject(new Error('当前步骤不支持 validateCurrentValues'));
        },
        setLoading: (loading: boolean) => {
            const stepRef = stepRefs.current[stepSnapshot.currentStep].current;
            if (stepRef?.setLoading) {
                return stepRef.setLoading(loading);
            }
        },
        getValues: async function getCurrentValues<IStep0>(): Promise<IStep0> {
            const stepRef = stepRefs.current[stepSnapshot.currentStep].current;
            if (stepRef?.getCurrentValues) {
                const currentValue = await stepRef.getCurrentValues() as Promise<IStep0 | IStep1 | IStep2 | IStep3>;
                // 从当前组件拿取当前组件的值
                // 非当前组件的值上组件的事件里获取
                return Promise.resolve({
                    ...(snapshot(step0State) as IStep0),
                    ...(snapshot(step1State) as unknown as IStep1),
                    ...(snapshot(step2State) as unknown as IStep2),
                    ...(snapshot(step3State) as unknown as IStep3),
                    ...(await currentValue),
                });
            }
        },
    }));

    const steps = useMemo<Array<{
        title: React.ReactNode;
        content: React.ReactNode;
        status?: 'process' | 'finish' | 'error' | 'wait';
        description?: string;
    }>>(() => [
        {title: '基本信息', content: <Step0 ref={stepRefs.current[0]} />},
        {title: '请求参数', content: <Step1 ref={stepRefs.current[1]} />},
        {title: '响应参数', content: <Step2 ref={stepRefs.current[2]} />},
        {title: '调试', content: <Step3 ref={stepRefs.current[3]} />},
    ], []);

    return (
        <div className="box-border flex h-full flex-col overflow-hidden py-2 pb-6">
            <div className="mx-[200px]">
                <Steps
                    current={stepSnapshot.currentStep}
                    items={steps.map(({title, status, description}) => ({
                        title,
                        status,
                        description,
                    }))}
                    size="small"
                />
            </div>
            <div className="mt-[24px] h-0 flex-1 overflow-auto">
                {steps[stepSnapshot.currentStep]?.content}
            </div>
        </div>
    );
});

export default StepList;
export {StepList};

