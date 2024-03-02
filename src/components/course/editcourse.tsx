import { useParams } from "react-router-dom"
import Layout from "../layouts/layout"
import CourseDetail from "./coursedetail"


export const EditCourse = () =>{
    const {} = useParams();
    return(
        <Layout>
            <CourseDetail></CourseDetail>
        </Layout>
        )
}