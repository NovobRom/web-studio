import { render, screen } from '@testing-library/react';
import { StatsBar } from '@/components/sections/StatsBar';

jest.mock('next-intl/server', () => ({
    getTranslations: jest.fn().mockResolvedValue((key: string) => {
        const keys: Record<string, string> = {
            delivery: 'Fast Delivery',
            mobile: 'Mobile Ready',
            seo: 'SEO Optimized',
            uptime: 'Always Online',
        };
        return keys[key] || key;
    }),
}));

jest.mock('@/components/ui/FadeInWhenVisible', () => ({
    FadeInWhenVisible: ({ children }: any) => <div>{children}</div>,
}));

describe('StatsBar Section', () => {
    it('renders all stats correctly', async () => {
        const Component = await StatsBar();
        render(Component);

        expect(screen.getByText('48h')).toBeInTheDocument();
        expect(screen.getByText('Fast Delivery')).toBeInTheDocument();

        expect(screen.getByText('100%')).toBeInTheDocument();
        expect(screen.getByText('Mobile Ready')).toBeInTheDocument();

        expect(screen.getByText('SEO')).toBeInTheDocument();
        expect(screen.getByText('SEO Optimized')).toBeInTheDocument();

        expect(screen.getByText('24/7')).toBeInTheDocument();
        expect(screen.getByText('Always Online')).toBeInTheDocument();
    });
});
