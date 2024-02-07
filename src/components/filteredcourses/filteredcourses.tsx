import { useLocation } from "react-router-dom";
import Layout from "../layouts/layout"
import { FaStar } from "react-icons/fa";
import { Course } from "../userinfo/course";
interface FilteredCoursesProps {
    filteredData: any; // filteredData'nın tipini belirleyin
}
export const FilteredCourses = ()=>{
    const location = useLocation();
    const filteredData = location.state.filteredData;
    const cardData = filteredData?.map((x: CourseDto) => ({
        id:x.id,
        imageUrl: x.picture,
        name: x.name,
        categoryName: x.category?.name,
        ratings: Array(4).fill(0).map((_, index) => <i key={index} className=""><FaStar /></i>),
        description: x.description,
        price: x.price,
      })) || [];

return(
<Layout>
<Course cardData ={cardData}></Course>
</Layout>)
}