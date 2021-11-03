import { DocumentNode } from 'graphql';
import { useFetchPokemons } from '../../src/utils/useFetchPokemons';

let mockData;
jest.mock('@apollo/client', () => {
  return {
    __esModule: true,
    useQuery: jest.fn(() => mockData),
  };
});

describe('useFetchPokemons', () => {
    it('should call the useQuery and return the data in the correct key variable', () => {
        const myKey = 'key'
        mockData = { data: { [myKey]: ['data'] }, loading: false }

        const res = useFetchPokemons({} as DocumentNode, { key: myKey });

        expect(res).toEqual({ data: mockData.data[myKey], loading: false })
    })
})