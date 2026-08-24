import { render, screen } from '@testing-library/react-native';
import { RepositoryListContainer } from '../RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 2,
        pageInfo: {
          hasPreviousPage: false,
          hasNextPage: true,
          startCursor: 'AAA',
          endCursor: 'BBB',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'AAA',
          },
          {
            node: {
              id: 'rails.rails',
              fullName: 'rails/rails',
              description: 'Ruby on Rails',
              language: 'Ruby',
              forksCount: 18324,
              stargazersCount: 45377,
              ratingAverage: 100,
              reviewCount: 2,
              ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
            },
            cursor: 'BBB',
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);

      expect(screen.getByText('jaredpalmer/formik')).toBeTruthy();
      expect(screen.getByText('Build forms in React, without the tears')).toBeTruthy();
      expect(screen.getByText('TypeScript')).toBeTruthy();
      expect(screen.getByText('21.9k')).toBeTruthy();
      expect(screen.getByText('1.6k')).toBeTruthy();

      expect(screen.getByText('rails/rails')).toBeTruthy();
      expect(screen.getByText('Ruby on Rails')).toBeTruthy();
      expect(screen.getByText('Ruby')).toBeTruthy();
      expect(screen.getByText('45.4k')).toBeTruthy();
      expect(screen.getByText('18.3k')).toBeTruthy();
    });
  });
});
