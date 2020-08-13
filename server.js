// Copyright 2018 Google LLC.
// SPDX-License-Identifier: Apache-2.0

const express = require('express');
const app = express();

// app.use(express.static('public'));
app.use(express.static('public', {
    etag: true, // Just being explicit about the default.
    lastModified: true,  // Just being explicit about the default.
    setHeaders: (res, path) => {
        const hashRegExp = new RegExp('\\.[0-9a-f]{8}\\.');

        if (path.endsWith('.html')) {
            // All of the project's HTML files end in .html
            res.setHeader('Cache-Control', 'no-cache');
        } else if (hashRegExp.test(path)) {
            // If the RegExp matched, then we have a versioned URL.
            res.setHeader('Cache-Control', 'max-age=31536000');
        }
    },
}));
const listener = app.listen(process.env.PORT, function () {
    console.log('Your server is running on port ' + listener.address().port);
});
