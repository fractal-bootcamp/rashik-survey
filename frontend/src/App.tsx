import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";

const serverURL = "http://localhost:3000";

type SurveyData = {id:string;name:string};

function App() {
  const [surveys, setSurveys] = useState<SurveyData[]>([]);
  const [surveyName, setSurveyName] = useState("");

  const fetch = async () => {
    const res = await axios.get(serverURL + "/surveys");
    setSurveys(res.data);
  };
  useEffect(() => {
    fetch();
  }, []);

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {

    e.preventDefault();
    await axios.post(`${serverURL}/surveys/create`,{
          surveyName: surveyName,
        });
    fetch();
    setSurveyName("");
      };
  
    return (
      <div>
        {surveys.map((survey) => {
          return (
            <div>
              <div>
                {survey.name}
              </div>
              <div>
                <Link to={"/edit/:"+survey.id}>
                  Edit this survey
                </Link>
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
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={onFormSubmit}
          >
            Name
            <input value={surveyName} onChange={(e) => setSurveyName(e.target.value)} />  
            <button type="submit">Add Survey</button>
          </form> 
        </div>
        
      </div>
    );
  }

export default App;