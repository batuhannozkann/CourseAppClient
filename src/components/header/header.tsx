
import "./header.css";

export const Header = () =>{
    return(
        <>
        <header>
      <div style={{width:'100%'}} id="carouselExampleCaptions" className="carousel slide d-flex mx-auto position-relative" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          {/* <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button> */}
        </div>
        <div style={{height:'50vh'}} className="carousel-inner">
          <div className="carousel-item position-absolute active h-100" style={{ background: "url('https://firebasestorage.googleapis.com/v0/b/courseapplication-f3e34.appspot.com/o/White%20Minimalist%20Simple%20Aesthetic%20Name%20Twitter%20Header%20(2).jpg?alt=media&token=b9e81b6d-7f88-4c1b-863a-f54bbe810f4b')" ,backgroundSize:'cover',backgroundColor:'black'}}>
          </div>
          {/* <div className="carousel-item h-100" style={{ backgroundImage: "url('https://source.unsplash.com/bF2vsubyHcQ/1920x1080')",opacity:'0.5'}}>
            <div className="carousel-caption">
              <h5>Second slide label</h5>
              <p>Some representative placeholder content for the second slide.</p>
            </div>
          </div>
          <div  className="carousel-item h-100" style={{ backgroundImage: "url('https://source.unsplash.com/szFUQoyvrxM/1920x1080')" }}>
            <div className="carousel-caption">
              <h5>Third slide label</h5>
              <p>Some representative placeholder content for the third slide.</p>
            </div>
          </div> */}
        </div>
        {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button> */}
      </div>
    </header>
        {/* <div className="row mt-5 headerSpace"> </div>
        <div className ="row d-flex justify-content-center headersBetwwenSpace">
            <div style={{width:'15vw'}} className="d-flex justify-content-center bg-dark rounded-circle px-4 py-5"><img className="pe-3"  style={{width:'20vw',height:'20vh'}}src="/src/assets/logo.png"></img></div>
            
        </div>
        <div className="row d-flex justify-content-center h1 text-center headersBetwwenSpace">
        </div> */}
        </>
        )
}
