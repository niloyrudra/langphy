type Handler<T = any> = (event: {
    type: string;
    payload: T;
}) => void | Promise<void>;

const listeners = new Map<string, Handler[]>();

export const subscribe = <T>(
    eventType: string,
    handler: Handler<T>
) => {
    if( !listeners.has( eventType ) ) listeners.set( eventType, [] );

    listeners.get( eventType )!.push( handler );

    return () => {
        const arr = listeners.get( eventType ) || [];
        listeners.set(
            eventType,
            arr.filter( h => h !== handler )
        );
    }
}

export const dispatchLocalEvent = async <T>(
    eventType: string,
    payload: T
) => {
    const handlers = listeners.get( eventType ) || [];

    for ( const handler of handlers ) {
        await handler({
            type: eventType,
            payload
        });
    }
}