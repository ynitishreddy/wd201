// const hello = () => {
//     console.log("Hello Github!");
// };
  
// hello();

// fs.writeFile(
//     "sample.txt",
//     "Hello World. Welcome to Node.js File System module.",
//     (err) => {
//       if (err) throw err;
//       console.log("File created!");
//     }
//   );

// const fs = require("fs");
// fs.readFile("sample.txt", (err, data) => {
//     if (err) throw err;
//     console.log(data.toString());
//   });


// fs.appendFile("sample.txt", " This is my updated content", (err) => {
//     if (err) throw err;
//     console.log("File updated!");
//   });
  

// fs.rename("sample.txt", "test.txt", (err) => {
//     if (err) throw err;
//     console.log("File name updated!");
//   });

// fs.unlink("test.txt", (err) => {
//     if (err) throw err;
//     console.log("File test.txt deleted successfully!");
//   });








// const http = require("http");
// const fs = require("fs");

// const server = http.createServer((req,res) => {
//     const stream = fs.createReadStream("sample1.txt");
//     stream.pipe(res);


//     //  fs.readFile("sample1.txt" , (err , data) => {
//     //     res.end(data);
//     //  })
// });
// server.listen(3000);







