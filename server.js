const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

/* =========================
   MIDDLEWARE
========================= */

app.use(express.json());

app.use(express.urlencoded({
  extended:true
}));

/* =========================
   STATIC FILES
========================= */

app.use(express.static(
  path.join(__dirname, "public")
));

/* =========================
   HASTALAR
========================= */

let patients = [];

/* =========================
   SENSOR DATA
========================= */

let sensorData = {

  pulse: "--",
  bodyTemperature: "--",
  roomTemperature: "--",
  humidity: "--"

};
/* =========================
   PAGE ROUTES
========================= */

app.get("/", (req,res)=>{

  res.sendFile(
    path.join(__dirname,"public","welcome.html")
  );

});

app.get("/login", (req,res)=>{

  res.sendFile(
    path.join(__dirname,"public","login.html")
  );

});

app.get("/register", (req,res)=>{

  res.sendFile(
    path.join(__dirname,"public","register.html")
  );

});

app.get("/home", (req,res)=>{

  res.sendFile(
    path.join(__dirname,"public","home.html")
  );

});

app.get("/patients", (req,res)=>{

  res.sendFile(
    path.join(__dirname,"public","patients.html")
  );

});

app.get("/patient", (req,res)=>{

  res.sendFile(
    path.join(__dirname,"public","patient.html")
  );

});

app.get("/profile", (req,res)=>{

  res.sendFile(
    path.join(__dirname,"public","profile.html")
  );

});

app.get("/add", (req,res)=>{

  res.sendFile(
    path.join(__dirname,"public","add.html")
  );

});

/* =========================
   API
========================= */

/* TÜM HASTALAR */

app.get("/api/patients", (req,res)=>{

  res.json({

    success:true,
    patients

  });

});

/* TEK HASTA */

app.get("/api/patient/:id", (req,res)=>{

  const patientId =
    parseInt(req.params.id);

  const patient =
    patients.find(
      p => p.id === patientId
    );

  if(!patient){

    return res.status(404).json({

      success:false,
      message:"Hasta bulunamadi"

    });

  }

  res.json({

    success:true,
    patient

  });

});

/* HASTA EKLE */

app.post("/add-patient", (req,res)=>{

  const {

    name,
    age,
    gender,
    room,
    notes

  } = req.body;

  if(!name || !age){

    return res.status(400).json({

      success:false,
      message:"Eksik bilgi"

    });

  }

  const newPatient = {

    id: Date.now(),

    name,
    age,
    gender,
    room,
    notes

  };

  patients.push(newPatient);

  console.log(" ");
  console.log("===== YENI HASTA =====");

  console.log(newPatient);

  res.json({

    success:true,
    patient:newPatient

  });

});

/* =========================
   SENSOR API
========================= */

/* ESP VERI GONDERIR */

app.post("/api/sensor", (req,res)=>{

  const {

    pulse,
    bodyTemperature,
    roomTemperature,
    humidity

  } = req.body;

  sensorData = {

    pulse,
    bodyTemperature,
    roomTemperature,
    humidity

  };

  console.log(" ");
  console.log("===== SENSOR VERISI =====");

  console.log(sensorData);

  res.json({

    success:true,
    message:"Sensor verisi alindi"

  });

});

/* WEB VERI CEKER */

app.get("/api/sensor", (req,res)=>{

  res.json(sensorData);

});

/* =========================
   404
========================= */

app.use((req,res)=>{

  res.status(404).json({

    success:false,
    message:"Sayfa bulunamadi"

  });

});

/* =========================
   SERVER
========================= */

app.listen(PORT, ()=>{

  console.log(" ");
  console.log("================================");
  console.log("AKILLI HASTA TAKIP SISTEMI");
  console.log("SERVER CALISIYOR");
  console.log("http://localhost:3000");
  console.log("================================");

});