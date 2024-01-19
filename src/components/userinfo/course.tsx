import "./css/course.css";
import { sliceText } from "../../utilties/commonfunctions";
import { NavLink } from "react-router-dom";

export const Course = (props: any) => {
  return (
    <div className="container mt-4">
      <div className="row course-row">
        {props.cardData.map((card: any, index: number) => (
          <div key={index} className="col-md-4 mt-4">
            <div className="card p-3 h-100">
              <div className="d-flex flex-row mb-3">
                <img src={card.imageUrl} width="70" alt={`Logo for ${card.name}`} />
                <div className="d-flex flex-column ml-2">
                  <span>{card.name}</span>
                  <span className="text-black-50">{card.categoryName}</span>
                  <span className="ratings">{card.ratings}</span>
                </div>
              </div>
              <h6>{sliceText(card.description, 200)}</h6>
              <div className="d-flex justify-content-between install mt-3 align-items-end h-100">
                <span className="fw-bold">${card.price}</span>
                <span className="text-primary"><NavLink style={{textDecoration:"none"}} to={`/Course/View/${card.id}`}>View</NavLink>&nbsp;<i className="fa fa-angle-right"></i></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
