import {useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
const serverURL = "http://localhost:3000";



type SurveyProps={
  editMode : boolean;
  surveyName : string;
  surveyId : string;
}


type QuestionData = {
  content:string;
  surveyId:string;
};

function Survey({editMode,surveyName,surveyId}:SurveyProps) {
  const [name, setName] = useState(surveyName);
  const [questions, setQuestions] = useState<QuestionData[]>([]);
 
  const fetch = async () => {
    const res = await axios.get(serverURL + "/questions/"+surveyId);
    setQuestions(res.data);
  };
  useEffect(() => {

  fetch();
}, []);

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();
      await axios.post(`${serverURL}/surveys/edit`, {
        surveyId: surveyId,
        newQuestions: questions,
      });
      fetch();
  };

  

  if (editMode){
    function handleEdit(index: number, value: string): void {
      const updatedQuestions = questions.map((question, i) =>
        i === index ? { ...question, content: value } : question
      );
      setQuestions(updatedQuestions);
    }

    function handleAdd(value: string): void {
      const updatedQuestions = structuredClone(questions);
      updatedQuestions.push({content:value,surveyId:surveyId});
      setQuestions({...updatedQuestions});
    }

    return (
      <div>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={onFormSubmit}
        >
            <div>
              <input value={name} onChange={(e) => setName(e.target.value)} />
              {name}
            </div>
              Questions
            <div>    
              {
                questions.map((question,index)=>{

     
                  return(
                    <div key={index}>
                      <input value={question.content} onChange={(e) => handleEdit(index,e.target.value)} />
                    </div>
                  );
                })}
            </div>
            <div>
              <input value={""} onChange={(e) => handleAdd(e.target.value)} />
              <button type="submit">Add Question</button>

            </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    );
  }
  else{
    return(
      <div>

      
      </div>
    )
  }


}

export default Survey;