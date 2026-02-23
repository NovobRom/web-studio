import { render, screen } from '@testing-library/react';
import { PortfolioCard } from '@/components/ui/PortfolioCard';

describe('PortfolioCard', () => {
    const defaultItem = {
        id: '1',
        status: 'live' as const,
        titleKey: 'Project Title',
        category: 'Web',
        techTags: ['Next.js', 'React'],
        liveUrl: '/project',
        placeholderInitials: 'PR',
    };

    it('renders correctly', () => {
        render(
            <PortfolioCard
                item={defaultItem}
                viewLiveLabel="View Live"
                comingSoonLabel="Coming Soon"
            />
        );
        expect(screen.getByText('Project Title')).toBeInTheDocument();
        expect(screen.getByText('Web')).toBeInTheDocument();
        expect(screen.getByText('Next.js')).toBeInTheDocument();
        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('View Live')).toBeInTheDocument();
    });

    it('renders as a link when live', () => {
        render(
            <PortfolioCard
                item={defaultItem}
                viewLiveLabel="View Live"
                comingSoonLabel="Coming Soon"
            />
        );
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/project');
    });

    it('renders coming soon label when not live', () => {
        render(
            <PortfolioCard
                item={{ ...defaultItem, status: 'coming-soon' }}
                viewLiveLabel="View Live"
                comingSoonLabel="Coming Soon"
            />
        );
        expect(screen.getByText('Coming Soon')).toBeInTheDocument();
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
});
