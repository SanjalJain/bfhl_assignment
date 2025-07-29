// export default function handler(req, res) {
//   if (req.method === 'POST') {
//     const input = req.body.data || [];

//     let even = [], odd = [], alpha = [], specialChars = [];
//     let sum = 0;

//     input.forEach(item => {
//       if (!isNaN(item)) {
//         const num = Number(item);
//         num % 2 === 0 ? even.push(item) : odd.push(item);
//         sum += num;
//       } else if (/^[a-zA-Z]+$/.test(item)) {
//         alpha.push(item.toUpperCase());
//       } else {
//         specialChars.push(item);
//       }
//     });

//     let concatStr = alpha.join('').split('').reverse().map((char, i) =>
//       i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
//     ).join('');

//     res.status(200).json({
//       is_success: true,
//       user_id: "sanjal_jain_17092004",
//       email: "sanjal2248.be22@chitkara.edu.in",
//       roll_number: "2210992248",
//       odd_numbers: odd,
//       even_numbers: even,
//       alphabets: alpha,
//       special_characters: specialChars,
//       sum: sum.toString(),
//       concat_string: concatStr
//     });
//   } else {
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }


// api/bfhl.js
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST');
  next();
});

// Handler function
const handler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      return res.status(200).json({
        operation_code: 1,
        message: "Send a POST request with JSON body: { data: [...] }",
        example_request: {
          data: ["a", "1", "334", "4", "R", "$"]
        },
        example_response: {
          is_success: true,
          user_id: "sanjal_jain_17092004",
          email: "sanjal2248.be22@chitkara.edu.in",
          roll_number: "2210992248",
          odd_numbers: ["1"],
          even_numbers: ["334", "4"],
          alphabets: ["A", "R"],
          special_characters: ["$"],
          sum: "339",
          concat_string: "Ra"
        }
      });
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ 
        is_success: false,
        error: "Only POST method is allowed" 
      });
    }

    const input = req.body.data || [];
    const even = [], odd = [], alpha = [], specialChars = [];
    let sum = 0;

    input.forEach(item => {
      if (!isNaN(item)) {
        const num = Number(item);
        if (num % 2 === 0) even.push(item.toString());
        else odd.push(item.toString());
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alpha.push(item.toUpperCase());
      } else {
        specialChars.push(item);
      }
    });

    const concatStr = alpha.join('')
      .split('')
      .reverse()
      .map((char, idx) => 
        idx % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
      )
      .join('');

    return res.status(200).json({
      is_success: true,
      user_id: "sanjal_jain_17092004",
      email: "sanjal2248.be22@chitkara.edu.in",
      roll_number: "2210992248",
      odd_numbers: odd,
      even_numbers: even,
      alphabets: alpha,
      special_characters: specialChars,
      sum: sum.toString(),
      concat_string: concatStr
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      is_success: false,
      error: "Internal server error"
    });
  }
};

// Export for Vercel
export default handler;

// Local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.post('/api/bfhl', handler);
  app.get('/api/bfhl', handler);
  app.listen(PORT, () => console.log(`Local server running on port ${PORT}`));
}