const commonLocalStorage = {
    setObject: (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    },

    getObject: (key) => {
        var data = localStorage.getItem(key);
        try {
            return JSON.parse(data);
        } catch (error) {
            return null;
        }
    }
}


export default commonLocalStorage;