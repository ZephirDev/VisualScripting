export interface OpentracingSpanDecoratorInterface
{
    createChild(name: string): OpentracingSpanDecoratorInterface;
    tag(name: string, value: string): void;
    finish(): void;
    getPropagationValues(): {[k: string]: string};
}