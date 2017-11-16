'use strict';


var config = require('../../server/config.json');
var path = require('path');


module.exports = function(Company) {

  // send verification email after registration
  // Company.afterRemote('create', function(context, company, next) {
  //   var options = {
  //     type: 'email',
  //     to: company.email,
  //     from: 'noreply@loopback.com',
  //     subject: 'Thanks for registering.',
  //     template: path.resolve(__dirname, '../../server/views/verify.ejs'),
  //     redirect: '/verified',
  //     user: company,
  //     verifyHref: 'http://localhost:3000/api/companies/confirm?uid=' + company.id + '',
  //
  //   };
  //
  //   company.verify(options, function(err, response) {
  //     console.log(response);
  //     if (err) {
  //       Company.deleteById(company.id);
  //       return next(err);
  //     }
  //
  //     context.res.render('response', {
  //       title: 'Signed up successfully',
  //       content: 'Please check your email and click on the verification link ' +
  //       'before logging in.',
  //       redirectTo: '/',
  //       redirectToLinkText: 'Log in',
  //     });
  //   });
  // });

  // Method to render
  // Company.afterRemote('prototype.verify', function(context, user, next) {
  //   context.res.render('response', {
  //     title: 'A Link to reverify your identity has been sent ' +
  //     'to your email successfully',
  //     content: 'Please check your email and click on the verification link ' +
  //     'before logging in',
  //     redirectTo: '/',
  //     redirectToLinkText: 'Log in',
  //   });
  // });

  // send password reset link when requested
  Company.on('resetPasswordRequest', function(info) {
    var url = 'http://' + config.host + ':' + config.port + '/reset-password';
    var html = 'Click <a href="' + url + '?access_token=' +
      info.accessToken.id + '">here</a> to reset your password';

    Company.app.models.Email.send({
      to: info.email,
      from: info.email,
      subject: 'Password reset',
      html: html,
    }, function(err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });

  // render UI page after password change
  Company.afterRemote('changePassword', function(context, user, next) {
    context.res.render('response', {
      title: 'Password changed successfully',
      content: 'Please login again with new password',
      redirectTo: '/',
      redirectToLinkText: 'Log in',
    });
  });

  // render UI page after password reset
  Company.afterRemote('setPassword', function(context, user, next) {
    context.res.render('response', {
      title: 'Password reset success',
      content: 'Your password has been reset successfully',
      redirectTo: '/',
      redirectToLinkText: 'Log in',
    });
  });




  Company.afterRemote('create',function (context,company,next) {

    var Role = Company.app.models.Role;
    var RoleMapping = Company.app.models.RoleMapping;


    Role.find({ where : { name : "company"}},function (err,role) {
      if (err) throw err ;
      RoleMapping.create({
        principaleType : 'USER',
        principaleId : company.id,
        roleId : role[0].id

      }, function (err,roleMapping) {
        if (err) throw err;
        console.log('User assigned RoleID  : ' + role[0].id);
        console.log('roleMapping ------->>: ' + roleMapping);
      })

    })

    next();


  })

  // Company.afterRemote('prototype.__create__ressources',function (context,ressource,next) {
  //
  //   /*
  //   * Send Email to notify the ressource of his new account
  //   *
  //   * */
  //
  //   console.log("ressource Created: ",ressource)
  //   Company.app.models.Email.send({
  //     to: ressource.email,
  //     from: 'zakaryae.mazouzi.firebase@gmail.com',
  //     subject: 'New Account Assigned ',
  //     text: 'my text',
  //     html: '<em> Welcom to our compnay your email and password are : </em> ' + ressource.email + ' . and your password is :' + ressource.password + ' please reset your password  as soon as possible . ',
  //   }, function(err, mail) {
  //     if (err) console.log(err);
  //
  //     console.log('email sent  :' + mail);
  //   });
  //
  //   next();
  //
  // })

};
