import CryptoJs from 'crypto-js';
const { CRYPTO_SECRET } = import.meta.env


export const handleCrypt = (token) => {
    return CryptoJs.AES.encrypt(
        token,
        String(CRYPTO_SECRET)
    ).toString()
}



export const handleDecrypt = (tokenEncrypt) => {
    return CryptoJs.AES.decrypt(
        tokenEncrypt,
        String(CRYPTO_SECRET)
    ).toString(CryptoJs.enc.Utf8)
}


export const decodeToken = (token) => {
    const tokenPayload = token.split('.')[1];

    return JSON.parse(atob(tokenPayload));
}