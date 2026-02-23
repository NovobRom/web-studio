import { render, screen } from '@testing-library/react';
import { StepCard } from '@/components/ui/StepCard';

describe('StepCard', () => {
    it('renders step information correctly', () => {
        render(
            <StepCard
                number="01"
                title="Discovery"
                description="We learn about your business."
            />
        );

        expect(screen.getByText('01')).toBeInTheDocument();
        expect(screen.getByText('Discovery')).toBeInTheDocument();
        expect(screen.getByText('We learn about your business.')).toBeInTheDocument();
    });
});
