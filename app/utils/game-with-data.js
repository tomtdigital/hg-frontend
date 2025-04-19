import axios from "axios";
import { useContext, useEffect, useState } from "react";
import backupJson from "../../api/backup.json";
import Game from "../pages/game";
import Page from "../organisms/page";
import { AppContext } from "./app-context";

const GameWithData = () => {
  const [loading, setLoading] = useState(true);
  const [mainData, setMainData] = useState([]);
  const [solution, setSolution] = useState("");
  const { setTotalStages } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async (endpoint, setter) => {
      setTimeout(async () => {
        setLoading(true);
        try {
          const { data: response } = await axios.get(
            `http://localhost:5000/${endpoint}`
          );
          setter(response);
        } catch (error) {
          console.error(
            "Unable to fetch data from DB!\n\nUsing a backup JSON file instead"
          );
          setter(backupJson[endpoint]);
        }
        setLoading(false);
      }, 1000);
    };

    fetchData("main", setMainData);
    fetchData("solution", setSolution);
  }, []);

  useEffect(() => {
    if (mainData && mainData.length > 0) {
      setTotalStages(mainData.length);
    }
  }, [mainData, setTotalStages]);

  return (
    <div>
      {loading && <Page>Loading</Page>}
      {!loading && <Game data={{ main: mainData, solution }} />}
    </div>
  );
};

export default GameWithData;
