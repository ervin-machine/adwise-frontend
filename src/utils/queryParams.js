const queryParams = (query, params) => {
    if (!query) return;

    Object.entries(query).forEach(([key, value]) => {
        if (value) params.append(key, value);
    });
}

export default queryParams