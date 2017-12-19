export function generateRandomHash(){
  return Math.random().toString(36).slice(2)
}

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

export function validateName(name){
  if(name.length>100)
    return false;

  if(name.length<3)
    return false;

  return true;
}

export let formValidation = {
  required(value) {
    return value ? undefined : 'Required';
  },

  email(value) {
    return (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) ? 'Invalid email address' : undefined
  },

  maxLength(max) {
    return function(value) {
      return value && value.length > max ? `Must be ${max} characters or less` : undefined;
    }
  },

  minLength(min) {
    return function(value) {
      return value && value.length < min ? `Must be ${min} characters or more` : undefined;
    }
  },

  number(value) {
    return value && isNaN(Number(value)) ? 'Must be a number' : undefined;
  },

  alphaNumeric(value) {
    return value && /[^a-zA-Z0-9 ]/i.test(value)
      ? 'Only alphanumeric characters'
      : undefined
  },

  alphabetic(value) {
    return value && /[^a-zA-Z ]/i.test(value)
      ? 'Only alphabetic characters'
      : undefined
  },

  address(value) {
    return value && /[^a-zA-Z0-9./\-() ]/i.test(value)
      ? 'Unallowed characters'
      : undefined
  },

}