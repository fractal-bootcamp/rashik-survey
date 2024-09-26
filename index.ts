import express from "express";
import path from "path";
import cors from "cors";
import { PrismaClient} from '@prisma/client'

import {v4 as uuidv4} from 'uuid';

const prisma = new PrismaClient();
const app = express();
app.use(cors());


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())

const port = 3000;



app.get("/surveys", async (req, res) => {
    const surveys = await prisma.survey.findMany();
    console.log(surveys);
    res.json(surveys);
  });
  

app.post("surveys/create", async (req, res) => {
  try{
    console.log("create");

    const { surveyId, surveyName} = req.body;
    console.log(surveyId, surveyName);

    const ret =await prisma.survey.create({
      data: {
        id: surveyId,
        name: surveyName,
      },
    });
    console.log(ret);
    res.status(201).json(ret);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  })

  app.post("/surveys/addQuestion", async (req, res) => {
    try {
      const { surveyId, newQuestion } = req.body;
  
      const ret = await prisma.question.create({
        data: {
          id: uuidv4(),
          surveyId: surveyId,
          content: newQuestion,
        },
      });
  
      console.log(ret);
      res.status(201).json(ret);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});