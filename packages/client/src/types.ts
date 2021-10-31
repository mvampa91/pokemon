export interface Pokemon {
    id: string;
    name: string;
    types: string[];
    classification: string;
}

export interface Edge<A> {
    node: A;
}