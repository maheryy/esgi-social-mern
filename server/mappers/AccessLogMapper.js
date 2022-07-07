module.exports.AccessLogMapper = (req, res) => {
    const { method, url, query, params, headers, body, id } = req;
    const { statusCode } = res;
    const timestamp = new Date();
    return {
        timestamp,
        req: {
            method,
            url,
            query,
            params,
            headers: {
                host: headers.host,
                "sec-ch-ua": headers["sec-ch-ua"],
                "user-agent": headers["user-agent"],
            },
            body,
        },
        res: {
            statusCode,
        }
    };
}