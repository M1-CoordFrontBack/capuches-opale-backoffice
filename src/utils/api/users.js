import { get } from '../fetch';

const rootUrl = process.env.BACKEND_API_URL_USERS
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMSwibG9naW4iOiJtYWVsIiwibm9tIjoiZGVib24iLCJwcmVub20iOiJtYWVsIiwiYXJnZW50IjpudWxsLCJtb3RfZGVfcGFzc2UiOiIkMmIkMTAkSVY4SzdLaTBjOEt2VnRJaDFSd1pCZXdIQlhhSzYyZWdYZ3pLWUpjSllLV3VPbnRQemFyYWkiLCJyb2xlX2lkIjoyfSwiaWF0IjoxNjQyMTY3MTQzLCJleHAiOjE2NDIxNzQzNDN9.v35VtmXIgSPujk6GxUmz82UDDgMBgUGpRuPWXMXjK_8";
// expiration : 2h

export const getUsername = () => {
  const data = get('https://hidden-headland-61940.herokuapp.com/' + 'api/user/11', token);
  console.log(data);
  return data;
}
