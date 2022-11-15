let es = undefined;

export const getEventSource = (topics = []) => {
    if (es !== undefined) {
        es.close();
    }

    const mercureEntrypoint = process.env.REACT_APP_MERCURE_ENTRYPOINT;
    const subscribeURL = new URL(`${mercureEntrypoint}/.well-known/mercure`);
    topics.forEach((topic) => {
        subscribeURL.searchParams.append("topic", topic);
    });

    es = new EventSource(subscribeURL, {withCredentials: false});

    return es;
}