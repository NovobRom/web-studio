import { render, screen } from '@testing-library/react';
import { StatsBar } from '@/components/sections/StatsBar';

// StatsBar is now a client component using useTranslations
jest.mock('next-intl', () => ({
    useTranslations: jest.fn().mockReturnValue((key: string) => {
        const keys: Record<string, string> = {
            clients: 'Happy clients',
            rating: 'Average rating',
            mobile: 'Works on any phone',
            speed: 'Page speed score',
        };
        return keys[key] || key;
    }),
}));

jest.mock('@/components/ui/FadeInWhenVisible', () => ({
    FadeInWhenVisible: ({ children }: any) => <div>{children}</div>,
}));

// Mock IntersectionObserver for jsdom
class MockIntersectionObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}
global.IntersectionObserver = MockIntersectionObserver as any;

describe('StatsBar Section', () => {
    it('renders all stats with correct labels', async () => {
        render(<StatsBar />);

        expect(screen.getByText('Happy clients')).toBeInTheDocument();
        expect(screen.getByText('Average rating')).toBeInTheDocument();
        expect(screen.getByText('Works on any phone')).toBeInTheDocument();
        expect(screen.getByText('Page speed score')).toBeInTheDocument();
    });

    it('renders initial stat values before animation', () => {
        render(<StatsBar />);
        // Initial values before IntersectionObserver triggers
        expect(screen.getByText('5+')).toBeInTheDocument();
        expect(screen.getByText('4.9★')).toBeInTheDocument();
        expect(screen.getByText('100%')).toBeInTheDocument();
        expect(screen.getByText('98+')).toBeInTheDocument();
    });
});
