import {isReadonly, readonly, shallowReadonly} from "../reactive";

describe('shallowReadonly', function () {
    it('should not make non-reactive properties reactive', function () {
        const props = shallowReadonly( { n: { foo: 1 } } );
        expect(isReadonly(props)).toBe(true);
        expect(isReadonly(props.n)).toBe(false);
    });

    it('should warn when call set', function () {
        // console.warn()
        // mock
        console.warn = jest.fn();
        const user = readonly({
            age: 10
        });
        user.age = 11;
        expect(console.warn).toBeCalled();
    });
});