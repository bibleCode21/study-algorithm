import { Exercise } from './exercise';
import { Concept } from '@/features/algorithm/types/algorithm';

// CodeEditor 컴포넌트 Props
export interface CodeEditorProps {
    exercise: Exercise;
    code: string;
    onCodeChange: (code: string) => void;
    selectedTemplateIndex?: number;
    onTemplateChange?: (index: number) => void;
}

// PracticePageClient 컴포넌트 Props
export interface PracticePageClientProps {
    concept: Concept;
    exercise: Exercise;
    highlightedSolutionCode: string;
}

// ExerciseWithConcept 타입
export interface ExerciseWithConcept extends Exercise {
    concept: Concept | null;
}

// PracticeListClient 컴포넌트 Props
export interface PracticeListClientProps {
    exercises: ExerciseWithConcept[];
}

// TestRunner 컴포넌트 Props
export interface TestRunnerProps {
    exercise: Exercise;
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

// ExerciseHeader 컴포넌트 Props
export interface ExerciseHeaderProps {
    concept: Concept;
    exercise: Exercise;
}

// ExerciseDescription 컴포넌트 Props
export interface ExerciseDescriptionProps {
    exercise: Exercise;
}

// SolutionView 컴포넌트 Props
export interface SolutionViewProps {
    exercise: Exercise;
    highlightedSolutionCode: string;
}
