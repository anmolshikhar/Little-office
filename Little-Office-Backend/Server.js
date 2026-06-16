
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import connection from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- DATABASE TEST ---------------- */

app.get("/", (req, res) => {
  connection.query("SELECT 1", (err) => {
    if (err) {
      return res.send("Database connection failed ❌");
    }

    res.send("Database connected ✅");
  });
});

/* ---------------- EMAIL CONFIG ---------------- */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log("Email Config Error:", error);
  } else {
    console.log("Email Server is Ready ✅");
  }
});

/* ---------------- SIGNUP API ---------------- */

app.post("/register", async (req, res) => {
  const { name, phone, workStatus, email } = req.body;

  // Check if email already exists
  const checkSql =
    "SELECT * FROM users WHERE email = ?";

  connection.query(checkSql, [email], async (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    if (result.length > 0) {
      return res.json({
        success: false,
        message: "Email already exists",
      });
    }

    // Generate User ID
    const userId =
      "LO" +
      Math.floor(
        100000 + Math.random() * 900000
      );

    // Generate Password
    const password = Math.random()
      .toString(36)
      .slice(-8);

    const insertSql = `
      INSERT INTO users
      (
        user_id,
        name,
        phone,
        work_status,
        email,
        password
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      insertSql,
      [
        userId,
        name,
        phone,
        workStatus,
        email,
        password,
      ],
      async (err) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            success: false,
            message: "Insert Failed",
          });
        }

   try {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Little Office Account Created",

    html: `
      <h2>Welcome to Little Office 🎉</h2>

      <p>Your account has been created successfully.</p>

      <h3>User ID: ${userId}</h3>

      <h3>Password: ${password}</h3>

      <p>
        Keep these credentials safe.
      </p>
    `,
  });

  console.log("Email Sent Successfully ✅");

  res.json({
    success: true,
    message: "Account Created",
  });

} catch (emailError) {

  console.log("Email Error:", emailError);

  res.status(500).json({
    success: false,
    message: "Email sending failed",
  });
}
      }
    );
  });
});

/* ---------------- LOGIN API ---------------- */


app.post("/check-user", (req, res) => {
  const { email, password } = req.body;

  console.log("Login Request:");
  console.log("Email:", email);
  console.log("Password:", password);

  const sql =
    "SELECT * FROM users WHERE email = ? AND password = ?";

  connection.query(
    sql,
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          exists: false,
        });
      }

      console.log("Result:", result);

      if (result.length > 0) {
        res.json({
          exists: true,
          user: result[0],
        });
      } else {
        res.json({
          exists: false,
        });
      }
    }
  );
});

/* ---------------- TASK SUBMISSION API ---------------- */
app.post("/submit-task", async (req, res) => {
  

  console.log("BODY:", req.body);

  const {
    userId,
    name,
    email,
    taskTitle,
    language,
    code,
  } = req.body;

  if (
    !userId ||
    !name ||
    !email ||
    !taskTitle ||
    !language ||
    !code
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // remaining code ...



  const insertSql = `
    INSERT INTO submissions
    (
      user_id,
      name,
      email,
      task_title,
      language,
      code
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    insertSql,
    [
      userId,
      name,
      email,
      taskTitle,
      language,
      code,
    ],
    async (err) => {
      if (err) {
        console.log("Submission Error:", err);

        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      // Add 10 points
      connection.query(
        "UPDATE users SET points = points + 10 WHERE user_id = ?",
        [userId],
        (pointErr) => {
          if (pointErr) {
            console.log("Points Error:", pointErr);
          }
        }
      );

      try {
        await transporter.sendMail({
          from: "anmolshikhar2323@gmail.com",

          to: "anmolshikhar2323@gmail.com",

          subject: "🚀 New Task Submission",

          html: `
            <h2>New Task Submitted</h2>

            <p><b>User ID:</b> ${userId}</p>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Task:</b> ${taskTitle}</p>
            <p><b>Language:</b> ${language}</p>

            <h3>Submitted Code:</h3>

            <pre style="
              background:#f4f4f4;
              padding:15px;
              border-radius:10px;
              overflow:auto;
            ">
${code}
            </pre>
          `,
        });

        res.json({
          success: true,
          message: "Task Submitted Successfully",
        });

      } catch (emailError) {
        console.log("Email Error:", emailError);

        res.status(500).json({
          success: false,
          message: "Email Sending Failed",
        });
      }
    }
  );
});
app.get("/user-stats/:userId", (req, res) => {

  const { userId } = req.params;

  connection.query(
    "SELECT COUNT(*) AS totalTasks FROM submissions WHERE user_id = ?",
    [userId],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          success: false,
        });
      }

      res.json({
        totalTasks: result[0].totalTasks,
      });
    }
  );
});
/* ---------------- SERVER ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server started on port ${PORT} 🚀`
  );
});

