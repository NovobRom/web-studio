import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
    it('renders primary variant correctly', () => {
        render(<Button variant="primary" href="/test">Click me</Button>);
        const link = screen.getByRole('link', { name: /click me/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/test');
        expect(link).toHaveClass('bg-accent');
    });

    it('renders secondary variant correctly', () => {
        render(<Button variant="secondary" href="/test">Secondary</Button>);
        const link = screen.getByRole('link', { name: /secondary/i });
        expect(link).toHaveClass('bg-transparent');
    });

    it('applies external attributes when external prop is true', () => {
        render(<Button variant="primary" href="https://example.com" external>External Link</Button>);
        const link = screen.getByRole('link', { name: /external link/i });
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('applies custom className', () => {
        render(<Button variant="primary" href="/test" className="custom-class">Custom Class</Button>);
        const link = screen.getByRole('link', { name: /custom class/i });
        expect(link).toHaveClass('custom-class');
    });
});
