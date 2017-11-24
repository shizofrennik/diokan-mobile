export const API_SERVER_URL = 'https://diokan-backend-develop.herokuapp.com';
export const API_URL = `${API_SERVER_URL}/api/v1/photographer/graphql`;
import {getAuthHeaders} from './utils/AuthService';

export function fetchSignIn(auth0UserUrl, data) {
  return fetch("https://" + auth0UserUrl + "/oauth/token", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(resp => resp.json());
}

export function fetchCurrentUser() {
  const body = {
    query: '{ current_user () { id name email display_name company_name tax phone status_portfolio identification_url country city address_1 address_2 province zip_code status } }'
  }
  
  return getAuthHeaders().then(headers => {
    return fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(resp => {
      return resp.json();
    });
  })
}

export function fetchUpdatePhotographer(user_fields) {
  for (var field in user_fields) {
    if (user_fields.hasOwnProperty(field)) {
      if(user_fields[field] === null) delete user_fields[field];
    }
  }

  delete user_fields.identification_url;

  const body = {
    query: 'mutation UpdatePhotographer($form:UpdatePhotographerInput!) { update_photographer (input:$form) { id } }',
    variables: {form: user_fields}
  }

  return getAuthHeaders().then(headers => {
    return fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(resp => {
      return resp.json();
    });
  })
}

export function fetchSessions(filters = {order: 0, search_string: ''}, pagination = {count: 10, offset: 0}) {
  const body = {
    query: 'query Session($pagination:PaginationInput!, $filters:PhotoSessionFiltersInput!) { photographer_photo_sessions (pagination:$pagination, filters:$filters) { results { id name date photo_start photo_end location status users { id first_name last_name email phone } } total_count }}',
    variables: {
      pagination,
      filters
    }
  }

  return getAuthHeaders().then(headers => {
    return fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(resp => {
      return resp.json();
    });
  })
}

export function fetchCreateSession() {
  
}

export function fetchUpdateSession() {

}

export function fetchUpdateStatus() {

}

export function fetchSession() {

}

export function fetchDestroyPhotoSession(id) {
  const body = {
    query: 'mutation DestroyPhotoSession($photo_session:DestroyPhotoSessionInput!) { destroy_photo_session (input:$photo_session) { id } }',
    variables: { photo_session: {id} }
  }

  return getAuthHeaders().then(headers => {
    return fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(resp => {
      return resp.json();
    });
  })
}

export function fetchDestroyPhotoFromSession() {

}

export function fetchValidateEmails() {

}

export function fetchDeleteUserFromPhotoSession() {

}
