import { useParams } from "react-router-dom"
import Layout from "../layouts/layout"
import CourseDetail from "./coursedetail"


export const EditCourse = () =>{
    const {id} = useParams();
    return(
        <Layout>
            <CourseDetail id={id}></CourseDetail>
        </Layout>
        )
}