import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const serverURL = "http://localhost:3000";

type Survey = { name:string; questions: [string]; results: [[string]] };

function App() {
  const [surveys, setSurveys] = useState<Survey[]>([]);


  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(serverURL + "/surveys");
      console.log(res.data);
      setSurveys(res.data);
    };

    // make request
    fetch();
  }, []);

  return (
    <div>
      {surveys.map((survey) => {
        return (
          <div>
            {survey.name}
            <a href={serverURL + "/surveys:"+survey.name+"/take"}>
              <button >Take this survey</button>
            </a>
            <a href={serverURL +"/surveys:"+survey.name+ "/results"}>
              <button >View survey results</button>
            </a>          
          </div>
        );
      })}
      <div>
        <a href={serverURL + "/create"}>
            <button >Create new surveys</button>
        </a>  
      </div>
      
    </div>
  );
}

export default App;