import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";
/*    */ 
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
            <div>
              {survey.name}
            </div>
            <div>
            <Link to={"/take"}>

            Take this survey
            </Link>
            </div>
            <div>
            <Link to={"/results"}>
             View survey results
            </Link> 
            </div>
 
          </div>
        );          
      })}
      <div>
        <Link to="/create">
            Create new surveys
        </Link>  
      </div>
      
    </div>
  );
}

export default App;