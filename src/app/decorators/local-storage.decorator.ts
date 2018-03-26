export function LocalStorage(
    target: Object,
    decoratedPropertyName: string) {

    Object.defineProperty(target, decoratedPropertyName, {
        get: () => {
            return localStorage.getItem(decoratedPropertyName) || '';
        },
        set: newValue => {
            localStorage.setItem(decoratedPropertyName, newValue);
        }
    });
}
