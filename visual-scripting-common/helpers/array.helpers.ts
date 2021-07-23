export class ArrayHelpers {

    static list<Type>(value?: Type[]|Type): Type[]|undefined
    {
        if (value == null) {
            return undefined;
        } else if(Array.isArray(value)) {
            return value;
        } else {
            return [value] as Type[];
        }
    }

}
