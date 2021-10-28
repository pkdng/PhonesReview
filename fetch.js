export const getTopByInterest = async () => {
    try{
        const posts = await fetch('https://api-mobilespecs.azharimm.site/v2/top-by-interest');
        return posts.json();
    }catch (error) {
        console.log('getTopByInterest',error);
        throw error;
    }
};

export const getTopByFans = async () => {
    try{
        const posts = await fetch('https://api-mobilespecs.azharimm.site/v2/top-by-fans');
        return posts.json();
    }catch (error) {
        console.log('getTopByFans',error);
        throw error;
    }
};

export const getLatestPhones = async () => {
    try{
        const posts = await fetch('https://api-mobilespecs.azharimm.site/v2/latest');
        return posts.json();
    }catch (error) {
        console.log('getLatestPhones',error);
        throw error;
    }
};

export const getListBrands = async () => {
    try{
        const posts = await fetch(`https://api-mobilespecs.azharimm.site/v2/brands`);
        return posts.json();
    }catch (error) {
        console.log('getListBrands',error);
        throw error;
    }
};

export const getListPhones = async (brand) => {
    try{
        const posts = await fetch(`https://api-mobilespecs.azharimm.site/v2/brands/${brand}`);
        return posts.json();
    }catch (error) {
        console.log('getListPhones',error);
        throw error;
    }
};

export const getPhone = async (phone) => {
    try{
        const posts = await fetch(`http://api-mobilespecs.azharimm.site/v2/search?query=${phone}`);
        return posts.json();
    }catch (error) {
        console.log('getPhone',error);
        throw error;
    }
};

export const getPhoneSpecifications = async (phone) => {
    try{
        const posts = await fetch(`https://api-mobilespecs.azharimm.site/v2/${phone}`);
        return posts.json();
    }catch (error) {
        console.log('getPhoneSpecifications',error);
        throw error;
    }
};