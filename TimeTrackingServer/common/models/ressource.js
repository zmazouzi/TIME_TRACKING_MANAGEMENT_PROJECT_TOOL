'use strict';

module.exports = function(Ressource) {

  Ressource.afterRemote('create',function (ctx,ressource,next) {

    console.log("ressource created !!!!! ")
    next();
  })


  Ressource.afterRemote('prototype.__create__ressourceProjects', function (ctx,ressource, next) {
    console.log("projectd assigned ! ");
    Ressource.findById(ressource.ressourceId,function (err,ressource) {
            if(err) console.log(err)
      Ressource.app.models.Email.send({
        to: ressource.email,
        from: 'zakaryae.mazouzi.firebase@gmail.com',
        subject: 'Project assigned  ',
        text: 'my text',
        html: '<em> You have been assigned to project, Please check your accout as soon as possible . </em>',
      }, function(err, mail) {
        if (err) console.log(err);

        console.log('email sent  :' + mail);
      });
    })


    next();
  })

};
