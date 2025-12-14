'use client';

import { useState } from 'react';
import { compileTypeScript, executeCode, deepEqual } from '@/features/practice/utils/codeExecutor';
import { TestRunnerProps, TestResult } from '@/features/practice/types/components';

const TestRunner = ({ problem, code }: TestRunnerProps) => {
    const [results, setResults] = useState<TestResult[] | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [compileError, setCompileError] = useState<string | null>(null);

    const runTests = async () => {
        setIsRunning(true);
        setCompileError(null);
        setResults(null);

        try {
            // TypeScript 컴파일러는 비동기로 로딩됨
            // TypeScript를 JavaScript로 컴파일
            const compileResult = await compileTypeScript(code);

            if (!compileResult.success || !compileResult.jsCode) {
                setCompileError(compileResult.error || '컴파일 오류가 발생했습니다.');
                setIsRunning(false);
                return;
            }

            // 각 테스트 케이스 실행
            const testResults: TestResult[] = [];

            for (const testCase of problem.testCases) {
                const executeResult = executeCode(compileResult.jsCode, testCase.input);

                if (!executeResult.success) {
                    testResults.push({
                        passed: false,
                        input: testCase.input,
                        expected: testCase.expectedOutput,
                        actual: null,
                        error: executeResult.error || '실행 오류가 발생했습니다.',
                    });
                } else {
                    const passed = deepEqual(executeResult.result, testCase.expectedOutput);
                    testResults.push({
                        passed,
                        input: testCase.input,
                        expected: testCase.expectedOutput,
                        actual: executeResult.result,
                    });
                }
            }

            setResults(testResults);
        } catch (error) {
            setCompileError(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.');
        } finally {
            setIsRunning(false);
        }
    };

    const passedCount = results?.filter((r) => r.passed).length || 0;
    const totalCount = problem.testCases.length;

    // 값을 간결하게 포맷팅하는 함수
    const formatValue = (value: any): string => {
        if (value === null) return 'null';
        if (value === undefined) return 'undefined';
        
        // 2차원 배열은 각 행을 한 줄로 표시
        if (Array.isArray(value) && value.length > 0 && Array.isArray(value[0])) {
            const rows = value.map((row: any) => 
                Array.isArray(row) ? '[' + row.join(', ') + ']' : JSON.stringify(row)
            );
            return '[\n  ' + rows.join(',\n  ') + '\n]';
        }
        
        // 1차원 배열은 한 줄로 (길면 포맷팅)
        if (Array.isArray(value)) {
            const jsonString = JSON.stringify(value);
            if (jsonString.length <= 100) {
                return jsonString;
            }
            // 긴 배열은 각 요소를 한 줄씩
            return '[\n  ' + value.map((item: any) => JSON.stringify(item)).join(',\n  ') + '\n]';
        }
        
        // 객체나 복잡한 값은 기본 포맷팅
        const jsonString = JSON.stringify(value);
        if (jsonString.length <= 80 && !jsonString.includes('\n')) {
            return jsonString;
        }
        
        return JSON.stringify(value, null, 2);
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">테스트 실행</h2>
                <button
                    onClick={runTests}
                    disabled={isRunning}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    {isRunning ? '실행 중...' : '실행'}
                </button>
            </div>

            {compileError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm font-medium text-red-800 mb-1">컴파일 오류</p>
                    <pre className="text-xs text-red-700 whitespace-pre-wrap overflow-x-auto">
                        {compileError}
                    </pre>
                </div>
            )}

            {results && (
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium text-gray-700">결과:</span>
                        <span
                            className={`font-semibold ${passedCount === totalCount ? 'text-green-600' : 'text-red-600'
                                }`}
                        >
                            {passedCount} / {totalCount} 통과
                        </span>
                    </div>

                    <div className="space-y-2">
                        {results.map((result, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg border ${result.passed
                                    ? 'bg-green-50 border-green-200'
                                    : 'bg-red-50 border-red-200'
                                    }`}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span
                                        className={`text-sm font-medium ${result.passed ? 'text-green-700' : 'text-red-700'
                                            }`}
                                    >
                                        {result.passed ? '✓ 통과' : '✗ 실패'}
                                    </span>
                                    <span className="text-xs text-gray-500">테스트 케이스 {index + 1}</span>
                                </div>
                                {result.error ? (
                                    <p className="text-sm text-red-700">{result.error}</p>
                                ) : (
                                    <div className="text-xs space-y-1">
                                        <div>
                                            <span className="text-gray-600">입력:</span>
                                            <pre className="mt-1 bg-white p-2 rounded overflow-x-auto font-mono">
                                                {formatValue(result.input)}
                                            </pre>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">예상:</span>
                                            <pre className="mt-1 bg-white p-2 rounded overflow-x-auto font-mono">
                                                {formatValue(result.expected)}
                                            </pre>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">실제:</span>
                                            <pre className="mt-1 bg-white p-2 rounded overflow-x-auto font-mono">
                                                {formatValue(result.actual)}
                                            </pre>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!results && (
                <p className="text-sm text-gray-500 text-center py-8">
                    '실행' 버튼을 클릭하여 테스트를 실행하세요.
                </p>
            )}
        </div>
    );
};

export default TestRunner;

