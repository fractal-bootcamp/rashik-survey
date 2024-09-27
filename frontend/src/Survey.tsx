import {useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
const serverURL = "http://localhost:3000";



type SurveyProps={
  editMode : boolean;
}

type RouteParams={
  surveyId: string;
}
type QuestionData = {id:string;content:string,surveyId:string};

function Survey({editMode}:SurveyProps) {
  const [content, setContent] = useState("");
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const params = useParams<RouteParams>();
  const surveyId = params.surveyId?.substring(1);
  const fetch = async () => {
    const res = await axios.get(serverURL + "/questions/"+surveyId);
    setQuestions(res.data);
  };
  useEffect(() => {

  fetch();
}, []);

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();
      console.log(surveyId);
      const addQuestionResponse = await axios.post(`${serverURL}/surveys/addQuestion`, {
        surveyId: surveyId,
        newQuestion: content,
      });
      console.log('Add Question Response:', addQuestionResponse.data);
      fetch();
      setContent("");
  };
  
  if (editMode){
    return (
      <div>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={onFormSubmit}
        >
          Questions
            <div>    
              {
                questions.map((question)=>{
                  return(
                    <div>
                      {question.content}
                      <div>
                        <Link to={"/edit/:"+surveyId+"/:"+question.id}>
                          Edit
                        </Link>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          <input value={content} onChange={(e) => setContent(e.target.value)} />
          <button type="submit">Add Question</button>
          <div>
              <Link to={"/"}>
                  Home
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

export default Survey;