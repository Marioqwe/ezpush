const checkRequiredKeys = (method, url, actions) => {
    if (method === undefined || url === undefined || actions === undefined) {
        throw new Error('One or more required keys are missing.');
    }
};

const validateMethod = (method) => {
    if (typeof method !== 'string') {
        throw new Error('Specify a string method.');
    }

    const normMethod = method.toLowerCase();
    const allowedMethods = ['get', 'post', 'delete', 'put', 'patch'];
    if (!allowedMethods.includes(normMethod)) {
        throw new Error(`Value ${method} for 'method' is not supported. Use either GET or POST.`);
    }
};

const processUrl = (url, getState) => {
    let newUrl = url;
    if (typeof newUrl === 'function') {
        newUrl = url(getState());
    }

    if (typeof newUrl !== 'string') {
        throw new Error('Specify a string url.');
    }

    return newUrl;
};

const processHeaders = (headers, getState) => {
    let newHeaders = headers;
    if (typeof newHeaders === 'function') {
        newHeaders = headers(getState());
    }

    if (typeof newHeaders !== 'object') {
        throw new Error('Specify an object for headers.');
    }

    return newHeaders;
};

const validateActions = (actions) => {
    if (!Array.isArray(actions) || actions.length !== 3) {
        throw new Error('Expected an array of three actions.');
    }

    const validatedActions = [];
    actions.forEach((action) => {
        if (typeof action === 'string') {
            validatedActions.push({ type: action });
        } else if (typeof action === 'object') {
            if (action.type === undefined) throw new Error('');
            validatedActions.push({ ...action });
        } else {
            throw new Error('');
        }
    });

    return validatedActions;
};

const validateData = (data) => {
    if (typeof data !== 'object') {
        throw new Error('Specify an object for data.');
    }
};

export default (callAPI, getState) => {
    const {
        data = {},
        method,
        actions,
        payload = {},
        devMode = false,
        devData = {},
    } = callAPI;
    let { url, headers = {}}  = callAPI;

    checkRequiredKeys(method, url, actions);
    validateMethod(method);
    validateData(data);

    const validatedActions = validateActions(actions);
    url = processUrl(url, getState);
    headers = processHeaders(headers, getState);

    return {
        url,
        headers,
        method,
        actions: validatedActions,
        data,
        payload,
        devMode,
        devData,
    };
};

