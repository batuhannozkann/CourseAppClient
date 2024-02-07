import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const secretKey = 'your_secret_key_here';

// Veriyi şifreleyip cookie'ye ekleyen fonksiyon
export const setEncryptedCookie = (key:string, value:any,expires?:any) => {
  const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), secretKey).toString();
  expires?Cookies.set(key, encryptedValue,{expires:expires}):Cookies.set(key, encryptedValue);
  
};

// Cookie'den veriyi çözen fonksiyon
export const getDecryptedCookie = (key:string) => {
  const encryptedValue = Cookies.get(key);
  if (encryptedValue) {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
    try {
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8); 
        const parsedString = JSON.parse(decryptedString);   
      return parsedString;
    } catch (error) {
      console.log('Error parsing decrypted cookie value:', error);
      return null;
    }
  }
  return null;
};