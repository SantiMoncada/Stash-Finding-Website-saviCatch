
# SaviCatch | Module 2 Final Project

Website where persons can create puzzles and codes for others to find

## Endpoints
| Path                     | METHOD    | Description                    |
| ------------------       | --------- | ------------------------------ |
| `/`                      | GET       | Home                           |
| `/about`                 | GET       | Information about the web      |
| `/help`                  | GET       | Solution to issues             |
| `/login`                 | GET       | Log in form                    |
| `/login`                 | POST      | Log in form                    |
| `/signup`                | GET       | Sign up form                   |
| `/signup`                | POST      | Sign up form                   |
| `/logout`                | GET       | log out                        |
| `/maps`                  | GET       | List of all maps               |
| `/maps/:id/details`      | GET       | Details of a specific map      |
| `/maps/create`           | GET       | Create a new map               |
| `/maps/create`           | POST      | Create a new map               |
| `/maps/:id/edit`         | GET       | Update a specific map          |
| `/maps/:id/edit`         | POST      | Update a specific map          |
| `/maps/:id/delete`       | POST      | Delete a specific map          |
| `/users`                 | GET       | List of all users              |
| `/users/:id`             | GET       | User info                      | [comment]: <> (If the endpoint of /users/:id has to be plural)
| `/users/myProfile`       | GET       | redirects to users own id      | [comment]: <> (If the endpoint of /users/:id has to be plural)
| `/users/:id/update`      | GET       |                                |
| `/users/:id/delete`      | POST      |                                |
| `/users/:id/update`      | POST      |                                |
| `/stashes/:mapId/create` | GET       |                                |
| `/stashes/:mapId/create` | POST       |                               |
| `/`                      | GET       |                                |