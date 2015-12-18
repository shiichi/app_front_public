import superagent from 'superagent';
import { setSession } from './WebStrageUtils';
import { CSRFToken, domainName } from './csrfUtils';

export function getUserinfo() {
  return new Promise((resolve, reject) => {
    console.log(domainName)
    superagent
    .post(domainName + '/api/getUserinfo')
    .set('Accept', 'application/json')
    .set('X-CSRF-Token', CSRFToken)
    .end((err, res) => {
      if (err) {
        Promise.reject(err);
      } else {
        resolve(res.body);
      }
    });
  });
}
