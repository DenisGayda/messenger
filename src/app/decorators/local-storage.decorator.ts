export function LocalStorage(
    target: Object,
    decoratedPropertyName: string) {

    Object.defineProperty(target, decoratedPropertyName, {
        get: () => {
          return JSON.parse(localStorage.getItem(decoratedPropertyName)) || '';
        },
        set: newValue => {
            localStorage.setItem(decoratedPropertyName, newValue);
        }
    });
}
