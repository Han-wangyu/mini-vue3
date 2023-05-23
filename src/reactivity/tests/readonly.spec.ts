import { isReadonly, readonly, isProxy } from "../reactive";

describe('readonly', function () {
    it('happy path', function () {
        // not set
        const original = { foo: 1, bar: { baz: 3 } };
        const wrapped = readonly(original);
        expect(wrapped).not.toBe(original);
        expect(isReadonly(wrapped)).toBe(true);
        expect(wrapped.foo).toBe(1);
        expect(isProxy(wrapped)).toBe(true);
    });

    it('should make nested values readonly', function () {
        const original = { foo: 1, bar: { baz: 3 } };
        const wrapped = readonly(original);
        expect(wrapped).not.toBe(original);
        expect(isReadonly(wrapped)).toBe(true);
        expect(isReadonly(original)).toBe(false);
        expect(isReadonly(wrapped.bar)).toBe(true);
        expect(isReadonly(original.bar)).toBe(false);
        expect(wrapped.foo).toBe(1);
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