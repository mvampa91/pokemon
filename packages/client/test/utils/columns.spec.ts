import { columns } from "../../src/utils/columns";


test('should return the desired structure', () => {
    const structure = columns({});

    expect(structure).toMatchSnapshot();
})

test('should return the structure with the desired rendered', () => {
    const myNameRenderer = jest.fn();
    const myTypesRenderer = jest.fn();
    const myClassificationRenderer = jest.fn();

    const structure = columns({
        nameRenderer: myNameRenderer,
        typesRenderer: myTypesRenderer,
        classificationRenderer: myClassificationRenderer,
    });

    expect(structure[0].render).toEqual(myNameRenderer);
    expect(structure[1].render).toEqual(myTypesRenderer);
    expect(structure[2].render).toEqual(myClassificationRenderer);
})

