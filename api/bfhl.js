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
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {
    const input = req.body.data || [];

    let even = [], odd = [], alpha = [], specialChars = [], sum = 0;

    input.forEach(item => {
      if (!isNaN(item)) {
        const num = Number(item);
        if (num % 2 === 0) even.push(item);
        else odd.push(item);
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alpha.push(item.toUpperCase());
      } else {
        specialChars.push(item);
      }
    });

    const concatStr = alpha.join('').split('').reverse().map((ch, i) =>
      i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
    ).join('');

    res.status(200).json({
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

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
