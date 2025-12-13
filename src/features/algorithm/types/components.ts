import { Concept } from './algorithm';
import { CodeExample } from './algorithm';

// ConceptCard 컴포넌트 Props
export interface ConceptCardProps {
    concept: Concept;
}

// ConceptHeader 컴포넌트 Props
export interface ConceptHeaderProps {
    concept: Concept;
}

// ConceptDescription 컴포넌트 Props
export interface ConceptDescriptionProps {
    description: string;
}

// ConceptComplexity 컴포넌트 Props
export interface ConceptComplexityProps {
    timeComplexity: NonNullable<Concept['timeComplexity']>;
    spaceComplexity?: string;
}

// ConceptCodeExamples 컴포넌트 Props
export interface ConceptCodeExamplesProps {
    codeExamples: (CodeExample & { highlightedHtml: string })[];
}

// ConceptNavigation 컴포넌트 Props
export interface ConceptNavigationProps {
    conceptType: Concept['type'];
}

// ConceptCard 하위 컴포넌트 Props
export interface ConceptCardHeaderProps {
    concept: Concept;
}

export interface ConceptCardBodyProps {
    concept: Concept;
}

export interface ConceptCardFooterProps {
    tags: Concept['tags'];
}

// ConceptsList 컴포넌트 Props
export interface ConceptsListProps {
    concepts: Concept[];
}

// CategoryFilter 컴포넌트 Props
export interface CategoryFilterProps {
    categories: string[];
    selectedCategories: string[];
    onCategoryChange: (categories: string[]) => void;
}

// ViewSwitcher 컴포넌트 Props
export type ViewMode = 'default' | 'compact' | 'visual' | 'codeFirst';

export interface ViewSwitcherProps {
    currentView: ViewMode;
    onViewChange: (view: ViewMode) => void;
}

// ConceptView 컴포넌트 Props
export interface ConceptViewProps {
    concept: Concept;
    codeExamples: (CodeExample & { highlightedHtml: string })[];
    viewMode: ViewMode;
}
