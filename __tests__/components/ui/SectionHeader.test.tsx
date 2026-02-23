import { render, screen } from '@testing-library/react';
import { SectionHeader } from '@/components/ui/SectionHeader';

// Mock FadeInWhenVisible to bypass framer-motion in jsdom
jest.mock('@/components/ui/FadeInWhenVisible', () => ({
    FadeInWhenVisible: ({ children, className }: any) => (
        <div data-testid="fade-in" className={className}>
            {children}
        </div>
    ),
}));

describe('SectionHeader', () => {
    it('renders label and title correctly', () => {
        render(
            <SectionHeader label="Test Label" title={<span>Test Title</span>} />
        );
        expect(screen.getByText('Test Label')).toBeInTheDocument();
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('applies custom className to the wrapper', () => {
        render(
            <SectionHeader
                label="Test Label"
                title="Test Title"
                className="custom-class"
            />
        );
        const wrapper = screen.getByTestId('fade-in');
        expect(wrapper).toHaveClass('text-center mb-16 custom-class');
    });
});
