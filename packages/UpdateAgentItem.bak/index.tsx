import React, {useRef} from 'react';
import {StepList} from './StepList';
import {Footer} from './Footer';
import {StepListRef} from './types';

/**
 * Stepper 组件，用于创建步骤流程。
 *
 * @param cancelAction 可选参数，一个返回 void 的函数，当点击取消按钮时调用。
 *
 * @returns 返回一个包含步骤列表和底部按钮的 JSX 元素。
 */
const Stepper: React.FC<{cancelAction?: () => void}> = ({cancelAction}: {cancelAction?: (noModal?: boolean) => void}) => {
    const stepListRef = useRef<StepListRef>(null);

    return (
        <div className="box-border flex h-full flex-col overflow-hidden pt-4">
            <div className="relative mt-[-20px] h-0 flex-1 overflow-auto">
                <StepList ref={stepListRef} />
            </div>
            <div className="shrink-0 text-right">
                <Footer stepListRef={stepListRef} cancelAction={cancelAction} />
            </div>
        </div>
    );
};

export default Stepper;
export {Stepper};
