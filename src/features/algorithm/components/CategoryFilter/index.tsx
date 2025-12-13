'use client';

import Badge from '@/components/ui/Badge';
import { CategoryFilterProps } from '@/features/algorithm/types/components';

export default function CategoryFilter({
    categories,
    selectedCategories,
    onCategoryChange,
}: CategoryFilterProps) {
    const handleCategoryToggle = (category: string) => {
        if (selectedCategories.includes(category)) {
            onCategoryChange(selectedCategories.filter((c) => c !== category));
        } else {
            onCategoryChange([...selectedCategories, category]);
        }
    };

    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
                const isSelected = selectedCategories.includes(category);
                return (
                    <button
                        key={category}
                        onClick={() => handleCategoryToggle(category)}
                        type="button"
                        className="transition-transform hover:scale-105"
                    >
                        <Badge
                            variant={isSelected ? 'primary' : 'default'}
                            size="sm"
                            className="cursor-pointer"
                        >
                            {category}
                        </Badge>
                    </button>
                );
            })}
        </div>
    );
}

