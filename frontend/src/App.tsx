import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Survey from "./Survey";

const serverURL = "http://localhost:3000";

type SurveyData = {id:string;name:string;};

function App() {
  const [surveys, setSurveys] = useState<SurveyData[]>([]);
  const [surveyName, setSurveyName] = useState("");
  const [editMode,setEditMode] = useState(false);
  
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

    const toggleEditMode=()=>{
      setEditMode(!editMode);
    }
  
    return (
      <div>
        {editMode ? <div>Edit Mode</div> : <div>Answer Mode</div>}
        <button onClick={toggleEditMode}>Toggle</button>

        {surveys.map((survey) => {
          return (
            <div>
                  <Survey editMode={editMode} surveyName={survey.name} surveyId={survey.id}/>
            </div>
          );          
        })}
         {editMode ?<div>
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={onFormSubmit}
          >
            Name
            <input value={surveyName} onChange={(e) => setSurveyName(e.target.value)} />  
            <button type="submit">Add Survey</button>
          </form> 
        </div> : null}
        
      </div>
    );
  }

export default App;