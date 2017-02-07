1. Make sure `s3npm` is installed globally: '`npm install -g s3npm`
2. Pull latest from the `policy-manager-ui`
3. Run `bower install`
4. Run `npm install`
5. Navigate to `node_modules/policy-manager-library`
6. Run `npm install`
7. Edit `config.js` and make sure `config.application_server` points to the correct server
8. Run `gulp configure`
9. Navigate back to the root dir of `policy-manager-ui`
10. Run `gulp buildAll`
11. Run the ionic build command with the correct platform (example: `ionic build ios`)
