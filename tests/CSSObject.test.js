import CSSObject from '../CSSObject/CSSObject';
import { localExpected } from './CSSObjectExpected';

describe('Test the CSSObject in local stylesheet', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('When we call the local function with local css loaded will receive the right return', () => {
        window.Object.values = jest.fn().mockReturnValue([
            {
                ownerNode: {
                    childNodes: [],
                    dataset: {},
                    innerText: '*{color:red}body{background-color:blue}',
                },
            },
        ]);
        const cssObject = new CSSObject();
        cssObject.local((style) => {
            expect(style).toEqual(localExpected);
        });
    });

    it("When we call the local function without local css loaded the callback function is not called", () => {
        window.Object.values = jest.fn().mockReturnValue([]);
        const cssObject = new CSSObject();
        cssObject.local(() => {
            expect(true).toBe(false);
        });
    });
});
