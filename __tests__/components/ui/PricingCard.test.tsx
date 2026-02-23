import { render, screen } from '@testing-library/react';
import { PricingCard } from '@/components/ui/PricingCard';

describe('PricingCard', () => {
    const defaultProps = {
        tier: {
            price: '99',
            currency: '$',
            ctaUrl: '/buy',
            featured: false,
        },
        name: 'Basic',
        description: 'Basic features',
        features: ['Feature 1', 'Feature 2'],
        ctaLabel: 'Buy Now',
        popularLabel: 'Popular',
    };

    it('renders correctly with standard props', () => {
        render(<PricingCard {...defaultProps} />);

        expect(screen.getByText('Basic')).toBeInTheDocument();
        expect(screen.getByText('99')).toBeInTheDocument();
        expect(screen.getByText('$')).toBeInTheDocument();
        expect(screen.getByText('Feature 1')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /buy now/i })).toHaveAttribute('href', '/buy');
    });

    it('renders popular label when featured is true', () => {
        render(<PricingCard {...defaultProps} tier={{ ...defaultProps.tier, featured: true }} />);
        expect(screen.getByText('Popular')).toBeInTheDocument();
    });

    it('does not render popular label when featured is false', () => {
        render(<PricingCard {...defaultProps} />);
        expect(screen.queryByText('Popular')).not.toBeInTheDocument();
    });
});
