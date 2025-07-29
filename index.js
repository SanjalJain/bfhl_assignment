const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
  try {
    const input = req.body.data || []; //empty array if no data

    let even = [], odd = [];
    let alpha = [];
    const specialChars = []; 
    let sum = 0;

    input.forEach(item => {
      if (!isNaN(item)) { 
        const num = Number(item);

        if (num % 2 === 0) {
          even.push(item);
        } else {
          odd.push(item); 
        }
        sum += num; 
      } 
      else if (/^[a-zA-Z]+$/.test(item)) {
        alpha.push(item.toUpperCase()); 
      } 
      else {
        specialChars.push(item);
      }
    });

    let concatStr = alpha.join('').split('').reverse().map((char, idx) => {
      return idx % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
    }).join('');

    res.status(200).json({
      is_success: true,
      user_id: "sanjal_jain_17092004", // my ID
      email: "sanjal2248.be22@chitkara.edu.in",
      roll_number: "2210992248",
      odd_numbers: odd,
      even_numbers: even,
      alphabets: alpha, 
      special_characters: specialChars,
      sum: sum.toString(), 
      concat_string: concatStr 
    });

  } catch (err) {
    console.error("Something broke:", err); 
    res.status(500).send("Internal server error");
  }
});
// // lets gooo
// app.listen(3000, () => {
//   console.log('Server started on port 3000'); 
// });