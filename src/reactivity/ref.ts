import {isTracking, trackEffects, triggerEffects} from "./effect";
import {hasChanged, isObject} from "../shared";
import {reactive} from "./reactive";

class RefImpl {
    private _value: any;
    public dep;
    private _rawValue: any;
    constructor(value) {
        this._rawValue = this._value;
        // 1. 看看 value 是不是对象
        this._value = convert(value);
        this.dep = new Set();
    }

    get value() {
        trackRefValue(this);
        return this._value;
    }

    set value(newValue) {
        // 先修改，再trigger
        if (hasChanged(newValue, this._rawValue)) {
            this._rawValue = newValue;
            this._value = convert(newValue);
            triggerEffects(this.dep);
        }
    }
}

function convert(value) {
    return isObject(value) ? reactive(value) : value;
}

function trackRefValue(ref) {
    if (isTracking()) {
        trackEffects(ref.dep);
    }
}

export function ref(value) {
    return new RefImpl(value);
}