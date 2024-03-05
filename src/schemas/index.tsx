import * as yup from 'yup'

export const loginSchema=yup.object().shape(
    {
        email:yup.string().email('Geçerli bir email giriniz').required('Email girmek zorunludur'),
        password:yup.string().required('Şifre giriniz').min(7,'minimum 7 karakter giriniz')

    }
);
export const signUpSchema=yup.object().shape({
    firstname:yup.string().required('İsim giriniz.'),
    lastname:yup.string().required('Soyisim giriniz.'),
    email:yup.string().email('Geçerli bir email giriniz').required('Email girmek zorunludur'),
    password:yup.string().required('Şifre giriniz').min(7,'Şifre,7 karakterden büyük veya eşit olmalıdır.0 Karakter girdiniz.').matches(
        /^(?=.*[a-z])(?=.*[A-Z])/,
        'Şifre küçük harf ve büyük harf içermelidir.'
      ),
      rePassword: yup.string()
      .required('Şifre tekrarı zorunludur.')
      .oneOf([yup.ref('password')], 'Şifreler uyuşmuyor.')  
});
export const forgotPasswordSchema = yup.object().shape({
    email:yup.string().email('Geçerli bir email giriniz').required('Email girmek zorunludur')
});
export const resetPasswordSchema = yup.object().shape({
    password:yup.string().required('Şifre giriniz').min(7,'Şifre,7 karakterden büyük veya eşit olmalıdır.0 Karakter girdiniz.').matches(
        /^(?=.*[a-z])(?=.*[A-Z])/,
        'Şifre küçük harf ve büyük harf içermelidir.'
      ),
      rePassword: yup.string()
      .required('Şifre tekrarı zorunludur.')
      .oneOf([yup.ref('password')], 'Şifreler uyuşmuyor.')  
});
export const orderSchema = yup.object().shape({
    province:yup.string().required('Please enter province'),
    district:yup.string().required('Please enter district'),
    street:yup.string().required('Please enter street'),
    line:yup.string().required('Please enter line'),
    zipcode:yup.number().required('Please enter zipcode'),
    cardholderName:yup.string().required('Please enter name'),
    cardNumber:yup.string().matches(/^\d{17}$/,'Card number must be 17 characters').required('Please enter card number'),
    expirationMonth:yup.string().min(2).required(),
    expirationYear:yup.string().min(4).required(),
    cvv:yup.string().matches(/^[0-9]{3}$/,'Cvv must be at least3 characters').required("Please enter credit card cvv")
})
export const createFormSchema = yup.object().shape({
    name: yup.string().required("Course name is required").min(10).max(75),
    categoryId: yup.string().notOneOf(["default"], "Please select a category").required("Category is required"),
    description: yup.string().required("Description is required"),
    price: yup.number().min(1, "Price must be greater than 0").required("Price is required"),
    duration: yup.number().min(1, "Duration must be greater than 0").required("Duration is required"),
    file:yup
    .mixed()
    .test('file-required', 'Please upload a photo to course', function (value:any) {
      if (!value || !value.name) {
        return this.createError({
          path: 'file',
          message: 'File is required'
        });
      }
      return true;
    })
    .required("File is required")
  });