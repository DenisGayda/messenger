export function LocalStorage(
    target: Object, // The prototype of the class
    decoratedPropertyName: string // The name of the property
    ) {

    // get and set methods
    Object.defineProperty(target, decoratedPropertyName, {
        get: function () {
            return JSON.parse(localStorage.getItem(decoratedPropertyName)) || '';
        },
        set: function (newValue) {
            localStorage.setItem(decoratedPropertyName, newValue);
        }
    });
}