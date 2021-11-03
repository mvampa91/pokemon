import * as pokemonUtils from "../../src/utils/pokemonUtils";

describe('getTypeColor', () => {
    it('should return a color when a type is passed', () => {
        expect(pokemonUtils.getTypeColor('fire')).toEqual('#EE8130');
    })
    it('should be case insensitive', () => {
        expect(pokemonUtils.getTypeColor('Fire')).toEqual('#EE8130');
    })
    it('should return a fallback if we not pass a correct type', () => {
        expect(pokemonUtils.getTypeColor('Not existing')).toEqual('#777');
    })
})

describe('pokemonTypes', () => {
    it('should match the snapshot', () => {
        expect(pokemonUtils.pokemonTypes).toMatchSnapshot();
    })
})