# Star Trek API instructions
---

You can use Postman or your api tester of choice, on port 3000.

### Authentication
* First you must "login" by sending a POST request at `/login` with `"username": 'your name'` in the body.
* Copy the `"refreshToken"` to save incase you need refresh your access token. The access token has an expiration of 15 minutes. Send it in a POST request to `/token` with `"token": ` foloowed by the refresh token, in the body.
* Copy the `"accessToken"` to use in your GET requests in the `Authorization:` header with the value `Bearer ` followed by the token.

### Pagination
You must include `page` and `limit` in the query paramaters of all GET requests. "limit" dictates how many episodes you want listed at a time, and "page" indicates which page of results you're on.

### Endpoints
You can get all episodes with a GET at `/`, or filter them by title or date. You can search by show at `/search`, and filter by title, date, or season and episode, in the query paramaters. 
* When searching by show at `/search`, you must include the show initials: `tos`, `tng`, `ds9`, `voy`, or `ent`. Use the key `show`.
* Date should be in this format `Jan 83`, with the key `stardate`. You must include month and year.
* When searching by `season`, you can search with or without an `episode` number, but you cannot search with an episode but no season.
* You can search by partial or complete `title`. If you enter more than one word, it will retrieve any titles that contain them in the order you entered.