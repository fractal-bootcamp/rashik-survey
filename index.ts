import express from "express";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());

const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, key) => acc && acc[key], obj);
};

const processIfStatements = (
  template: string,
  variables: Record<string, any>
): string => {
  const ifRegex = /{%\s*if\s+([.\w]+)\s*%}([\s\S]*?){%\s*endif\s*%}/g;
  return template.replace(ifRegex, (match, condition, content) => {
    const value = getNestedValue(variables, condition);
    return value ? content : "";
  });
};

const processForLoops = (
  template: string,
  variables: Record<string, any>
): string => {
  const forRegex =
    /{%\s*for\s+(\w+)\s+in\s+([.\w]+)\s*%}([\s\S]*?){%\s*endfor\s*%}/g;
  return template.replace(forRegex, (match, item, list, content) => {
    const listValue = getNestedValue(variables, list);
    if (Array.isArray(listValue)) {
      return listValue
        .map((itemValue: any) => {
          return processVariables(content, { [item]: itemValue });
        })
        .join("");
    }
    return "";
  });
};

const processVariables = (
  template: string,
  variables: Record<string, any>
): string => {
  const variableRegex = /{{([\s\S]*?)}}/g;
  return template.replace(variableRegex, (match, path) => {
    const trimmedPath = path.trim();
    const value = getNestedValue(variables, trimmedPath);
    return value !== undefined ? String(value) : "";
  });
};

const injectTemplateVariables = (
  template: string,
  variables: Record<string, any>
): string => {
  let result = template;
  result = processIfStatements(result, variables);
  result = processForLoops(result, variables);
  result = processVariables(result, variables);
  return result;
};

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())

const port = 3000;

// In-memory storage for surveys switch to sql
let surveys: { id: string; questions: [];results:[[]]}[] = [];

app.get("/", (req, res) => {
    const templatePath = path.join(__dirname, "templates", "index.html");
    const fs = require("fs");
  
    const template = fs.readFileSync(templatePath, "utf8");
  
    const html = injectTemplateVariables(template, {
      title: "Surveys",
      heading: "Welcome to the Survey App",
      surveys,
    });
    res.send(html);
  });

  app.get("/success", (req, res) => {
    const templatePath = path.join(__dirname, "templates", "success.html");
    const fs = require("fs");
  
    const template = fs.readFileSync(templatePath, "utf8");
  
    const html = injectTemplateVariables(template, {
      title: "Success",
      message: "Successfully created new survey!",

    });
    res.send(html);
  });

  app.post("/create", (req, res) => {
    const { id, questions} = req.body;
  
    surveys.push(id,questions);
  
    res.redirect("/");
  });



  app.get("/surveys/", (req, res) => {
    res.json(surveys);
  });
  
  app.get("/surveys/:id/result", (req, res) => {
    const surveysFromId = surveys.filter((survey) => {
      return survey.id === req.params.id;
    })[0];
  
    res.json(surveysFromId.results);
  });



  app.post("/surveys/:id/submit", (req, res) => {
    const { id, survey } = req.body;
    
    surveys.push(id,survey);
  
    res.redirect("/success");
  });

  app.get("/surveys/:id/take", (req, res) => {
    const templatePath = path.join(__dirname, "templates","take.html");
    const fs = require("fs");
  
    const template = fs.readFileSync(templatePath, "utf8");
    const surveyFromId = surveys.filter((survey) => {
        return survey.id === req.params.id;
      })[0];
    const html = injectTemplateVariables(template, {
      surveyFromId

    });
    res.send(html);
 
  });
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});