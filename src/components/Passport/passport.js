const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: 'No user with that email' });
    }
    try {
      if (await bcrypt.compare(password, user[0].password)) {
        return done(null, user);
      }
      return done(null, false, { message: 'Password incorrect' });
    } catch (error) {
      return done(error);
    }
  };
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user[0].id));
  passport.deserializeUser((id, done) => done(null, getUserById(id)));
}


module.exports = initialize;
