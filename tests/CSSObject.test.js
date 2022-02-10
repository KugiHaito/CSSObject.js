import CSSObject from '../CSSObject/CSSObject';
import { localExpected, externalExpected } from './CSSObjectExpected';

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

describe('Test the CSSObject in external stylesheet', () => {
    it('When we call the external function with external css loaded will receive the right return', done => {
        window.fetch = jest.fn().mockResolvedValue({
            text: () => Promise.resolve(externalExpected.css),
        });
        window.Object.values = jest.fn().mockReturnValue([
            {
                ownerNode: {
                    nodeName: 'LINK',
                },
                href: 'https://example.com/style.css',
            },
        ]);
        const cssObject = new CSSObject();
        cssObject.external((style) => {
            try {
                expect(window.fetch).toHaveBeenCalledTimes(1);
                expect(window.fetch).toHaveBeenCalledWith('https://example.com/style.css');
                expect(style).toEqual(externalExpected);
                done();
            } catch (error) {
                done(error);
            }
        });
    });

    it("When we call the external function without external css loaded the callback function is not called", () => {
        window.fetch = jest.fn().mockResolvedValue({
            text: () => Promise.resolve(''),
        });
        window.Object.values = jest.fn().mockReturnValue([]);
        const cssObject = new CSSObject();
        cssObject.external(() => {
            expect(true).toBe(false);
        });
        expect(window.fetch).toHaveBeenCalledTimes(0);
    });
});
