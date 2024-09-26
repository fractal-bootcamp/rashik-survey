import {useState } from "react";
import "./App.css";
import axios from "axios";
import {v4 as uuidv4} from 'uuid';

const serverURL = "http://localhost:3000";


function App() {
  const [question, setQuestion] = useState("");
  const [surveyName, setSurveyName] = useState("");
  const surveyId = uuidv4();
  const onFormSubmit = async () => {
    try {
      const createResponse = await axios.post(`${serverURL}/surveys/create`, {
        surveyId: surveyId,
        surveyName: surveyName,
      });
      console.log('Create Survey Response:', createResponse.data);
  
      const addQuestionResponse = await axios.post(`${serverURL}/surveys/addQuestion`, {
        surveyId: surveyId,
        newQuestion: question,
      });
      console.log('Add Question Response:', addQuestionResponse.data);
    } catch (error:unknown) {
      console.error('Error during form submission:', error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onFormSubmit}
      >
        Name
        <input value={surveyName} onChange={(e) => setSurveyName(e.target.value)} />
        Question
        <input value={question} onChange={(e) => setQuestion(e.target.value)} />
        <button type="submit">Add Question</button>
      </form>
    </div>
  );
}

export default App;