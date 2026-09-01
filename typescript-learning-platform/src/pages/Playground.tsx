import { useState } from 'react';
import Editor from '@monaco-editor/react';
import * as ts from 'typescript';

export default function Playground() {
  const [code, setCode] = useState<string>('// Schrijf hier je TypeScript code\nconst message: string = "Hello TypeScript!";\nconsole.log(message);\n');
  const [output, setOutput] = useState<string>('');

  const runCode = () => {
    try {
      const result = ts.transpileModule(code, {
        compilerOptions: { module: ts.ModuleKind.CommonJS }
      });
      
      const jsCode = result.outputText;
      
      let capturedOutput = '';
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        capturedOutput += args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ') + '\\n';
      };

      try {
        const func = new Function(jsCode);
        func();
      } catch (err: any) {
        capturedOutput += '\\nError during execution: ' + err.message;
      }

      console.log = originalConsoleLog;
      
      setOutput(capturedOutput || 'Code executed successfully with no output.');
    } catch (err: any) {
      setOutput('Transpilation error: ' + err.message);
    }
  };

  return (
    <div className="vp-content">
      <div id="markdown-content">
        <h1>TypeScript Playground</h1>
        <p>Gebruik deze live editor om TypeScript code te schrijven en uit te voeren. Klik op de knop "Run Code" om het resultaat in het venster rechts te bekijken.</p>
        
        <div style={{ display: 'flex', gap: '20px', height: '500px', marginTop: '20px' }}>
          <div style={{ flex: 1, border: '1px solid var(--vp-c-border)', borderRadius: '8px', overflow: 'hidden' }}>
            <Editor
              height="100%"
              defaultLanguage="typescript"
              theme="vs-light"
              value={code}
              onChange={(val) => setCode(val || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
              }}
            />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button 
              onClick={runCode}
              style={{
                padding: '10px 20px',
                backgroundColor: 'var(--vp-c-brand)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                alignSelf: 'flex-start'
              }}
            >
              ▶ Run Code
            </button>
            <div style={{ 
              flex: 1, 
              backgroundColor: 'var(--vp-c-bg-soft)', 
              border: '1px solid var(--vp-c-border)', 
              borderRadius: '8px', 
              padding: '15px',
              color: 'var(--vp-c-text)',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              overflowY: 'auto'
            }}>
              {output || 'Output zal hier verschijnen...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
