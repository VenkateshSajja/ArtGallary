import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState("");
  const [artCat, setartCat] = useState([]);
  const [articles, setarticles] = useState([]);

  const loadData = async () => {
    let response = await fetch(`http://localhost:3100/api/artData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    setarticles(response[0]);
    setartCat(response[1]);
    // console.log(response[0],response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/* <button className="btn btn-warning" type="submit">
                Search
              </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://media-hosting.imagekit.io//2a83419687bd4b72/download.jpeg?Expires=1834421938&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=sq3ExZgp5pE7Y9z7VxSxFo-Xwcy9Y0Wyt53jDU7xdZo~Gwi7ybRMZhWEmjTO846SLPzmlmMbbgzkQL5ZHZLVXvqZcmGJVpfCVH86EGKwA-XV83szvjqNlxIygGys09IM~GCV1fnhZbhHx9S3cv49KfP51kGYK3vyO4WtIVXXeULvdSzh2ttRpAQ5zqqptEMRSCfIoKUw7iDKCVDeln2wMsRQNYp7rSok3M8o9J6OXVbOQHPJq0o4-1hzJI4PdPBOxTx0NxvC5zx7GgF1AZ2ahqXY1uJnN4YzVX6~QwYTkWDUlXIIb9f-Lh96RYOwmtA1iO4RH4Q4EJmeD0fvGRLEMA__"
                className="d-block w-100"
                alt="..."
                style={{
                  filter: "brightness(80%)",
                  maxHeight: "400px"
                }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://media-hosting.imagekit.io//2fb1862491ec4dfa/download%20(1).gif?Expires=1834425294&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=b6yBtvocDQoZWXrBbdErZLNsd2vFdUraiT5gbWoFWAusA6Gb5ahoUXQU3aP0oVs0cJJwW6cPX64wT37KEhtFCTFGLShP93oxqPGH7TW4XgpjUOKO7Y15ONZCeK2lD2ROE4JOOBKOrMxxcguNEpTw0waT~S7tw5mOJHj4UWveM7SyEY7xHBuuL9mZ5XcipndyHVMSmVZLXqhLT-tdb98bwEojbRAF27BfsYzYxYXPDqZ724tdbIKKac-ezddxpjnie-ru5znLlPqbTwefdLjRpHpPUvCba-Dh-wbPKshsDhaTEis5gc1VpCHJKnQ2XiPweyWE1OFPd2WOjNsNa08B-g__"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(60%)", maxHeight: "400px" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://media-hosting.imagekit.io//50f9e1b86d424e94/Loving%20Vincent.jpeg?Expires=1834425338&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=eC34xaPU1C97o9Twh1vcOSXUBsDQ2J3av07Eg1yjS66arM7dmM3P8TC~fiRWhtgRWVdZqUocHoF~-3DKVoekGlUTYeUzXduiVSFrSgh0XeHPavKOUpoZ8lugaWLhB2bVp0hgaPFhWx~Hus-Fovsybf26O4QwouR5XBuDDBeC27hKLASkQS4-sfW3bxZeOtrXid6PzWTFbZRjIuTmcoj8AgW0X0JOb~bEJgfK~plsurUYu50yZ8BmOziAxAwdwJAQvH7PDi4jAZRVDpGgayPXSwpJAdNtiMqt4dH7q-mBn-r5FcKVDG5PexMXB~Z-SqNfBu7R7MwtfPZpRelAth~rrw__"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(60%)", maxHeight: "400px" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {artCat.length > 0 ? (
          artCat.map((data) => {
            return (
              <div className="row mb-3" key={data._id}>
                <div className="fs-2 m-3 text-warning">{data.CategoryName}</div>
                <hr className="bg-warning" />
                <div className="row g-3">
                  {articles.length > 0 ? (
                    articles
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems._id}
                            className="col-12 col-md-6 col-lg-4"
                          >
                            <Card
                              articles={filterItems} // Pass filterItems as articles
                              artName={filterItems.name}
                              options={filterItems.options[0]}
                              ImgSrc={filterItems.img}
                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div>No Such Data Found</div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div>No Categories Found</div>
        )}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
