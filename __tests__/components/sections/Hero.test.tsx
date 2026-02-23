import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/sections/Hero';

// Mock next-intl/server
jest.mock('next-intl/server', () => {
    const t = (key: string) => {
        const keys: Record<string, string> = {
            badge: 'Test Badge',
            sub: 'Test Subtitle',
            primaryCta: 'Primary CTA',
            secondaryCta: 'Secondary CTA',
        };
        return keys[key] || key;
    };
    t.rich = (key: string) => {
        return <span>Test Rich Headline</span>;
    };
    return {
        getTranslations: jest.fn().mockResolvedValue(t),
    };
});

// Mock FadeInWhenVisible
jest.mock('@/components/ui/FadeInWhenVisible', () => ({
    FadeInWhenVisible: ({ children, className }: any) => (
        <div data-testid="fade-in" className={className}>
            {children}
        </div>
    ),
}));

describe('Hero Section', () => {
    it('renders correctly', async () => {
        // Await the Server Component
        const Component = await Hero();
        render(Component);

        expect(screen.getByText('Test Badge')).toBeInTheDocument();
        expect(screen.getByText('Test Rich Headline')).toBeInTheDocument();
        expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
        expect(screen.getByText('Primary CTA')).toBeInTheDocument();
        expect(screen.getByText('Secondary CTA')).toBeInTheDocument();
    });
});
