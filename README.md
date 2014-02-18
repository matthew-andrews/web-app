# web-app

## Installation

```
git clone git@github.com:matthew-andrews/web-app.git
cd web-app
npm install
grunt
node server/main.js & # or nodemon server/main.js (if you have nodemon installed)
grunt watch &
```

- To see the AppCache update mechanism edit any file inside `templates` or `client`.
- Notice when you go to the home page directly (`localhost:3000`) the server returns the HTML for the page but when the AppCache uses the same URL, it gets a content-less bootstrap.
