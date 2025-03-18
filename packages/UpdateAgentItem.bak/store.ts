
/**
 * @file 关联Agents的Valtio状态管理文件
 * */
import {proxy} from 'valtio';
import type {IStep0, IStep1, IStep2, IStep3, IStep3Res} from './types';

// 当前agent的Id
const agentIdState = proxy<{ value: string | null, reset: () => void }>({
    value: null,
    reset() {
        this.value = null;
    },
});

export {agentIdState};

// 定义步骤条的状态
const stepState = proxy({
    currentStep: 0, // 当前步骤 0为第一步
    canToNextStep: false, // 是否可以进入下一步, 如果为false，点击下一步需要调用保存接口
    reset() {
        this.currentStep = 0;
        this.canToNextStep = false;
    },
});
export {stepState};

const initialStep0State: IStep0 = {
    sourceType: 1,
    agentId: '',
    name: '',
    description: '',
    iconUrl: '',
    method: 'GET',
    host: '',
    path: '',
    label: [],
    triggerWord: [],
};
const step0State: IStep0 & {reset: () => void} = proxy({
    ...initialStep0State,
    reset() {
        Object.assign(this, initialStep0State);
    },
});
export {step0State};

const initialStep1State: IStep1 = {
    body: [],
    query: [],
    header: [],
};
const step1State: IStep1 & {reset: () => void} = proxy({
    ...initialStep1State,
    reset() {
        Object.assign(this, initialStep1State);
    },
});
export {step1State};

const initialStep2State: IStep2 = {
    response: [],
};
const step2State: IStep2 & {reset: () => void} = proxy({
    ...initialStep2State,
    reset() {
        Object.assign(this, initialStep2State);
    },
});
export {step2State};

const initialStep3State: IStep3 = {
    debugSave: 0,
    debugBody: undefined,
    debugHeader: undefined,
    debugQuery: undefined,
};
const step3State: IStep3 & {reset: () => void} = proxy({
    ...initialStep3State,
    reset() {
        Object.assign(this, initialStep3State);
    },
});
export {step3State};

const initialStep3ResState: IStep3Res = {
    'timeConsumed': null,
    'responseCode': '',
    'responseBody': '',
    'message': '',
};
const step3ResState: IStep3Res & {reset: () => void} = proxy({
    ...initialStep2State,
    reset() {
        Object.assign(this, initialStep3ResState);
    },
});
export {step3ResState};

// 全局重置函数
export function resetAllStates() {
    agentIdState.reset();
    stepState.reset();
    step0State.reset();
    step1State.reset();
    step2State.reset();
    step3State.reset();
    step3ResState.reset();
}
