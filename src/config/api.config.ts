export const config = {
    "version": "v1",
    "domain": "http://localhost",
    "port": 3049,

    //Ключь поставил пока сюда.
    // По хорошему ему надо быть в другом месте например в profileReducer
    "class_key": 1,
};
export const baseApiURL = `${config.domain}:${config.port}/${config.version}/${config.class_key}`;
