import * as yup from 'yup'

export const loginSchema=yup.object().shape(
    {
        email:yup.string().email('Geçerli bir email giriniz').required('Email girmek zorunludur'),
        password:yup.string().required('Şifre giriniz').min(7,'minimum 7 karakter giriniz')

    }
)
export const signUpSchema=yup.object().shape({
    fullName:yup.string().required('İsim soyisim giriniz.'),
    email:yup.string().email('Geçerli bir email giriniz').required('Email girmek zorunludur'),
    password:yup.string().required('Şifre giriniz').min(7,'Şifre,7 karakterden büyük veya eşit olmalıdır.0 Karakter girdiniz.').matches(
        /^(?=.*[a-z])(?=.*[A-Z])/,
        'Şifre küçük harf ve büyük harf içermelidir.'
      ),
      rePassword: yup.string()
      .required('Şifre tekrarı zorunludur.')
      .oneOf([yup.ref('password')], 'Şifreler uyuşmuyor.')  
})