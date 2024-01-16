
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { identityServerApi } from "../../utilties/identityServerApi";
import { resetPasswordSchema } from "../../schemas/index.tsx";
export const ResetPassword = () => {
    const navigate = useNavigate();
    const resetPasswordFormik = useFormik({
        initialValues:{
            password:"",
            rePassword:""
        },
        validationSchema:resetPasswordSchema,
        onSubmit:async (values)=>{
           await identityServerApi.resetPassword(values.password,()=>{navigate('/login')});
        }
    });
    return(
        <div className="d-flex justify-content-center">
            <div className="col-lg-3 col-10 my-5 text-center border border-dark p-5">
                <div className="h3">Reset Password</div>
                <div className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, cumque?</div>
                <form onSubmit={resetPasswordFormik.handleSubmit}>
                    <label className="d-flex my-0 py-1">Password</label>
                    <input value={resetPasswordFormik.values.password} name="password" type="password" onChange={resetPasswordFormik.handleChange} className="form-control border-dark" id="exampleFormControlInput1" placeholder="" />
                    <div className="text-danger d-flex my-0 py-1">{resetPasswordFormik.errors.password&&resetPasswordFormik.errors.password}</div>
                    <label className="d-flex my-0 py-1">Re-password</label>
                    <input value={resetPasswordFormik.values.rePassword} name="rePassword" type="password" onChange={resetPasswordFormik.handleChange} className="form-control border-dark" id="exampleFormControlInput1" placeholder="" />
                    <div className="text-danger d-flex my-0 py-1">{resetPasswordFormik.errors.rePassword&&resetPasswordFormik.errors.rePassword}</div>
                    <button type="submit"  className="btn btn-dark w-100 mt-3">Send</button>
                </form>
                <hr className="my-4"></hr>
            </div>
        </div>
        )
}