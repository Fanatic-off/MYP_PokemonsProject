import { Button } from "antd";
import "./Hero.scss";
import banner from "./assets/hero-banner.png";

export const Hero = () => {
  return (
    <section className="container" id="hero">
      <div className="hero-info">
        <div className="headline">
          <h1>Pokémon TCG</h1>
          <h2>Collect, buy and exchange!</h2>
        </div>
        <Button type="primary">Join now</Button>
        <div className="add-info">
          <div className="info-block">
            <p className="info-number">240k+</p>
            <p className="info-type">Total Sale</p>
          </div>
          <div className="info-block">
            <p className="info-number">240k+</p>
            <p className="info-type">Total Sale</p>
          </div>
          <div className="info-block">
            <p className="info-number">240k+</p>
            <p className="info-type">Total Sale</p>
          </div>
        </div>
      </div>
      <div className="hero-banner">
        <img src={banner} alt="hero-banner" />
      </div>
    </section>
  );
};
