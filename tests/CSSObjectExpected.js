export const localExpected =  {
    cssText: '*{color:red}body{background-color:blue}',
    filename: null,
    comments: [],
    css: '*{color:red}body{background-color:blue}',
    statments: {
        charsets: [],
        imports: [],
        medias: [],
        keyframes: [],
        fontfaces: [],
    },
    blocks: [
        {
            query: '*',
            selectors: [
                {
                    name: '*',
                    type: 'UniversalSelector',
                    hasCombiner: false,
                },
            ],
            rules: [
                {
                    property: 'color',
                    isImportant: false,
                    values: [{ value: 'red', unit: 'NO_UNIT' }],
                    value: 'red',
                },
            ],
        },
        {
            query: 'body',
            selectors: [
                {
                    name: 'body',
                    type: 'HTMLSelector',
                    hasCombiner: false,
                },
            ],
            rules: [
                {
                    property: 'background-color',
                    isImportant: false,
                    values: [{ value: 'blue', unit: 'NO_UNIT' }],
                    value: 'blue',
                },
            ],
        },
    ],
    variables: [],
};
