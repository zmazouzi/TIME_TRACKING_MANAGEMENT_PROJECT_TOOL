/**
 * Created by zakar on 29/08/2017.
 */
var es = require('event-stream');

module.exports = function (app) {
  var Role = app.models.Role ;

  Role.create({ name : 'company'},function (err,role) {
    if (err) throw err ;

    console.log('Created role : '+role);

  })
  var Company = app.models.Company;
  Company.createChangeStream(function(err, changes) {
    changes.pipe(es.stringify()).pipe(process.stdout);
  });

}
