import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import {linter} from '@codemirror/lint';
import {loadLanguage} from '@uiw/codemirror-extensions-langs';
import {EditorView} from '@codemirror/view';

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
    editable?: boolean;
    onChange?: (val: string) => void;
}

const CodeMirrorWrap: React.FC<CodeMirrorWrapProps> = props => {
    const {value, height = '350px', editable, onChange} = props;

    return (
        <CodeMirror
            value={value}
            height={height}
            editable={editable}
            basicSetup={{lineNumbers: false}}
            extensions={[
                loadLanguage('json'),
                jsonLinter,
                EditorView.lineWrapping,
            ]}
            onChange={onChange}
        />
    );
};

export default React.memo(CodeMirrorWrap);
