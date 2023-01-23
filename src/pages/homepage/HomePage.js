import Navbar from "../../components/navbar/Navbar";
import "../../style/Page.css"
function HomePage() {
  return (
    <div>
      <Navbar />
      <div id="headline">Homepage</div>
      <div class="px-5">
        <small style={{ color: "white" }}>
          The website for tracking ships movements allows to monitor the
          position and route of ships on an online map. Users can search for
          ships by name, MMSI number, and filter results by ship type,
          destination port, and other criteria. The website also provides
          real-time information on expected arrivals and departures of ships and
          the history of their routes.
        </small>
        <br />
        <br />
        <div>
          <img
            src={`http://localhost:8080/city/trondheim.jpg`}
            class="img-homepage"
            alt="Trondheim"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
