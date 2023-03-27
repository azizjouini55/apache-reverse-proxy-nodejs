const SamlStrategy = require('passport-saml').Strategy;
const express = require('express')
const app = express();

// set a server variable
app.use(function(req, res, next) {
  res.locals.serverName = 'My Server'
  next()
});

// route to display the server variable
app.get('/', function(req, res) {
  res.send('Server Name: ' + res.locals.serverName)
});

app.post('/login/callback',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/login',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  }
);

app.listen(3000,"0.0.0.0" ,function() {
    console.log('Server listening on port 3000')
  });


passport.use(new SamlStrategy(
    {
      path: '/login/callback',
      entryPoint: 'https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php',
      issuer: 'passport-saml',
      cert: fs.readFileSync('./cert.pem', 'utf-8'),
    },
    function(profile, done) {
      findByEmail(profile.email, function(err, user) {
        if (err) {
          return done(err);
        }
        return done(null, user);
      });
    })
  );