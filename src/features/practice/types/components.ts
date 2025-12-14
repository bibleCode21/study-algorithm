import { Problem } from './problem';
import { Concept } from '@/features/algorithm/types/algorithm';

// CodeEditor 컴포넌트 Props
export interface CodeEditorProps {
    problem: Problem;
    code: string;
    onCodeChange: (code: string) => void;
    selectedTemplateIndex?: number;
    onTemplateChange?: (index: number) => void;
}

// PracticePageClient 컴포넌트 Props
export interface PracticePageClientProps {
    concept: Concept;
    problem: Problem;
    highlightedSolutionCode: string;
}

// ProblemWithConcept 타입
export interface ProblemWithConcept extends Problem {
    concept: Concept | null;
}

// PracticeListClient 컴포넌트 Props
export interface PracticeListClientProps {
    problems: ProblemWithConcept[];
}

// TestRunner 컴포넌트 Props
export interface TestRunnerProps {
    problem: Problem;
    code: string;
}

// TestResult 타입
export interface TestResult {
    passed: boolean;
    input: any;
    expected: any;
    actual: any;
    error?: string;
}

// ProblemHeader 컴포넌트 Props
export interface ProblemHeaderProps {
    concept: Concept;
    problem: Problem;
}

// ProblemDescription 컴포넌트 Props
export interface ProblemDescriptionProps {
    problem: Problem;
}

// SolutionView 컴포넌트 Props
export interface SolutionViewProps {
    problem: Problem;
    highlightedSolutionCode: string;
}
