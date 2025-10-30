require('dotenv').config()
const express=require('express');
const cors=require('cors');
const app=express();
const calculateRoute=require('./routes/calculateRoute');

const PORT=process.env.PORT||5000;
app.use(cors());
app.use(express.json());

app.use('/api',calculateRoute);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
