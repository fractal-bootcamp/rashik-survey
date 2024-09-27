import {useState } from "react";
import "./App.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const serverURL = "http://localhost:3000";



type QuestionProps={
  editMode : boolean;
}

type RouteParams={
    surveyId: string;
    questionId: string;
  }

function Question({editMode}:QuestionProps) {
  const [content, setContent] = useState("");
  const params = useParams<RouteParams>();
  const surveyId = params.surveyId?.substring(1);
  const questionId = params.questionId?.substring(1);
  const navigate = useNavigate();


  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();  
      if (content) {
      const addQuestionResponse = await axios.post(`${serverURL}/surveys/editQuestion`, {
        surveyId: surveyId,
        questionId:questionId,
        newQuestion: content,
      });
      console.log('Add Question Response:', addQuestionResponse.data);
      navigate('/edit/:'+surveyId)
    }
  };
  
  if (editMode){
    return (
      <div>

        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={onFormSubmit}
        >
          Question
          <input value={content} onChange={(e) => setContent(e.target.value)} />
      
          <button type="submit">Submit changes</button>
          <div>
              <Link to={"/"}>
                  Home
              </Link>
          </div>
          <div>
              <Link to={"/edit/:"+surveyId}>
                  Survey Edit Page
              </Link>
          </div>
        </form>
      </div>
    );
  }
  else{
    return(
      <div></div>
    )
  }


}

export default Question;