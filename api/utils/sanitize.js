const sanitize = (name) => {
    return name.replace(/[^a-zA-Z0-9\s\-_]/g, '').replace(/\s+/g, '_').toLowerCase();
};

export default sanitize