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
    res.json(surveys);
  });
  
app.get("/questions/:surveyId", async (req, res) => {
    const questions = await prisma.question.findMany({
      where:{
        surveyId: req.params.surveyId,
      }
    }

    );
    console.log(questions);
    res.json(questions);
  });
  


app.post("/surveys/create", async (req, res) => {
    console.log("create");

    const { surveyName} = req.body;
    console.log(surveyName);

    await prisma.survey.create({
      data: {name: surveyName as string},
    });


  })

  app.post("/surveys/edit", async (req, res) => {
      const { surveyId, newQuestion } = req.body;
  
      await prisma.question.updateMany({
        data: {
          surveyId: surveyId,
          content: newQuestion,
        },
      });
  
  });

  app.post("/surveys/editQuestion", async (req, res) => {
    try {
      const { surveyId,questionId, newQuestion } = req.body;
  
      const ret = await prisma.question.update({
        where: {
          surveyId: surveyId,
          id: questionId,
        },
  
      data :{
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