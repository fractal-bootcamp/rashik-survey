import express from "express";
import path from "path";
import cors from "cors";
import { PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();
const app = express();
app.use(cors());


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())

const port = 3000;

// In-memory storage for surveys switch to sql
type Survey = { name:string; questions: [string]; results: [[string]] };

app.get("/success", (req, res) => {


  });

app.post("/create", (req, res) => {

  });

app.get("/surveys", async (req, res) => {
    const surveys = await prisma.survey.findMany();
    console.log(surveys);
    res.json(surveys);
  });
  
app.get("/surveys/:name/result", (req, res) => {
 
  });


app.post("/surveys/:name/submit", (req, res) => {

  });

app.get("/surveys/:name/take", (req, res) => {

 
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});