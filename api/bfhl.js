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
export default async (req, res) => {
  // Strictly handle only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      is_success: false,
      error: "Method not allowed. Only POST requests are accepted."
    });
  }

  try {
    const input = req.body.data || [];
    
    // Initialize response with your personal details
    const response = {
      is_success: true,
      user_id: "sanjal_jain_17092004", // {full_name_ddmmyyyy}
      email: "sanjal2248.be22@chitkara.edu.in",
      roll_number: "2210992248",
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [], // Note: Typo kept consistent with requirements
      sum: "0", // Initialize as string
      concat_string: ""
    };

    // Process each element
    input.forEach(item => {
      const num = Number(item);
      
      if (!isNaN(num)) { // Number case
        if (num % 2 === 0) {
          response.even_numbers.push(item.toString());
        } else {
          response.odd_numbers.push(item.toString());
        }
        response.sum = (Number(response.sum) + num).toString();
      } 
      else if (/^[a-zA-Z]+$/.test(item)) { // Alphabet case
        const upper = item.toUpperCase();
        response.alphabets.push(upper);
        // Build concatenated string in reverse order
        response.concat_string = upper.split('').reverse().join('') + response.concat_string;
      } 
      else { // Special character case
        response.special_characters.push(item);
      }
    });

    // Apply alternating case to concatenated string
    response.concat_string = response.concat_string
      .split('')
      .map((char, index) => 
        index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
      )
      .join('');

    return res.status(200).json(response);

  } catch (error) {
    return res.status(500).json({
      is_success: false,
      error: "Internal server error"
    });
  }
};