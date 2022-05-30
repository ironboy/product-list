const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

module.exports = app => {

  // endpoint to handle formData uploads
  app.post('/api/upload', (req, res) => {

    // uses npm module 'formidable' to read the formData
    const form = formidable();

    form.parse(req, (err, fields, file) => {
      if (err) {
        res.end(err);
        return;
      }

      try {
        //console.log('location', JSON.parse(fields.location || {}));
        //console.log('address', JSON.parse(fields.address || {}));
      }
      catch (e) {
        console.log('location and address not recieved');
      }

      // get the file, from file
      file = file.file;

      // open file with 'fs' to enable it to be 
      // saved as a file
      let fileData = fs.readFileSync(file.filepath);
      fs.writeFileSync(
        path.join(__dirname, '../public', 'images', 'products', fields.id + '.jpg'),
        fileData
      );

      res.json({ fields, file });
    });
  });

}
