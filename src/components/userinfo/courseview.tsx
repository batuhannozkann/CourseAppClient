import { useParams } from "react-router-dom";
import Layout from "../layouts/layout"
import CourseViewTemplate from "./courseviewtemplate"

export const CourseView = ()=>{
    const {id} = useParams();
    return(
        <Layout>
            <CourseViewTemplate id={id}></CourseViewTemplate>
        </Layout>
        )

}