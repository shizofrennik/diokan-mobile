export function getClientName(user, sessionName = null) {
  if(sessionName) return sessionName;
  if(user) {
    let {first_name, last_name} = user;
    if (!first_name && !last_name) return user.email;
    return `${(first_name || '')} ${(last_name || '')}`
  } else {
    return 'Client'
  }
}

export function validateEmail(email) {
  var emailRegexp = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (!email)
    return false;

  if(email.length>254)
    return false;

  var valid = emailRegexp.test(email);
  if(!valid)
    return false;

  var parts = email.split("@");
  if(parts[0].length>64)
    return false;

  var domainParts = parts[1].split(".");
  if(domainParts.some(function(part) { return part.length>63; }))
    return false;

  return true;
}

export function validatePass(password){
  if(password.length>254)
    return false;

  if(password.length<8)
    return false;

  return true;
}