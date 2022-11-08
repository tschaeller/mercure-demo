let es = undefined;

export const getEventSource = (topics = []) => {
    if (es !== undefined) {
        es.close();
    }
    
    const subscribeURL = new URL('http://localhost/.well-known/mercure');
    topics.forEach((topic) => {
        subscribeURL.searchParams.append("topic", topic);
    });

    es = new EventSource(subscribeURL, {withCredentials: true});

    return es;
}