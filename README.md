

# DogJoy

<br>

## Description

Enjoy your time with your pet doing different things. This App will let you find new petfriendly places or events where your pet will have fun.

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.

- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup.

- **sign up** - As a user I want to sign up on the webpage so that I can start to use the app.

- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account.

- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account.

- **home screen** -  As a user I want to have a general view of what to do or where to go with my favourite pet. I can search for new places o events with the search bar or look for places near or events me.

- **settings screen** - As a user I want to see my profile, the places I like or I want to visit, all the opinions I have made, my dogs and the events I like or I want to go.

- **profile screen** - As a user I want to see all the info related with my profile (name, email, password, images, friends and postal code), and access to possible actions such as (update, remove and logout).

- **myPlaces screen** - As a user I want to see all the places I have saved as favourite and the places I have created. I also want to remove a place created by myself, remove from favourite places and create a new one.

- **myOpinions screen** - As a user I want to see all the opinions I have given to places where I have been, and be able to change them o remove them if I have come back to the place.

- **searchPlaces results** - As a user I want to get the results from my search (places) and access to any of them in a map or in a list( depending on what is easier for me to find them).

- **place screen** - As a user I want to see the place I have choser from the map or the list and see all the info related with it( images, opinions, description, bestMomentOfYear, free or paid, price, timetable, url, indoor or outdoor, urban or countryside, activities, category, area and likes).



## Backlog

Events Screen:
- See the events near me(list and map).
- Filter the events by categories.
- Join to an event.
- Like an event.
- See my saved events.
- Give my opinion to an event.


User profile:
- Add several dogs to my profile.
- Update my dogs info
- Delete a dog


<br>


# Client / Frontend

## Routes (React App)
| Path                        | Component            | Permissions | Behavior                                                      |
| --------------------------- | -------------------- | ----------- | ------------------------------------------------------------- |
| `/`                         | SplashPage           | public      | Home page                                                     |
| `/auth/signup`              | SignupPage           | anon only   | Signup form, link to login, navigate to homepage after signup |
| `/auth/login`               | LoginPage            | anon only   | Login form, link to signup, navigate to homepage after login  |
| `/auth/logout`              | n/a                  | anon only   | Navigate to homepage after logout, expire session             |
| `/main`                     | TournamentListPage   | user only   | Shows searchbar and button to find places                     |
| `/places`                   | PlacesPage           | user only   | Shows all places in a list or map                             |
| `/places/add-place`         | PlacesPage           | user only   | Create a new place                                            |
| `/places/:id`               | PlaceDetailPage      | user only   | Shows the info from a chosen place                            |
| `/places/:id/add-opinion`   | PlacesPage           | user only   | Give an opinion to a place                                    |
| `/settings`                 | SettingsPage         | user only   | Settings page with users' info                                |
| `/settings/profile`         | ProfilePage          | user only   | View personal user's info                                     |
| `/settings/profile`         | ProfilePage          | user only   | Update personal user's info                                   |
| `/settings/profile`         | ProfilePage          | user only   | Delete personal user's info                                   |
| `/settings/myplaces`        | MyPlacesPage         | user only   | List of players favourite places                              |
| `/settings/my-places/:id`   | MyPlacePage          | user only   | View the info from a favourite place                          |
| `/settings/my-places/:id`   | MyPlacePage          | user only   | Delete a place from my favourite list places                  |
| `/settings/my-opinions`     | MyOpinionsPage       | user only   | List of all given opinions of the user                        |
| `/settings/my-opinions/:id` | MyOpinionsDetailPage | user only   | View a given opinion.                                         |
| `/settings/my-opinions/:id` | MyOpinionsDetailPage | user only   | Update a given opinion.                                       |
| `/settings/my-opinions/:id` | MyOpinionsDetailPage | user only   | Delete a given opinion.                                       |


## Components

- HomePage
- LoginPage
- SignupPage
- MainPage
- SearchPage
- PlacesListPage
- PlacesMapPage
- PlacesAddPlacePage
- PlacesAddOpinionPage
- PlacePage
- SettingsPage
- ProfilePage
- ProfileUpdatePage
- MyPlacesPage
- MyPlacePage
- MyPlaceUpdatePage
- MyOpinionsPage
- MyOpinionPage
- MyOpinionUpdatePage
  
 

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous

- Place Service
  - place.list()
  - place.detail(id)
  - place.add(id)
  - place.delete(id)
  
- MyOpinion Service 
  - MyOpinion.list()
  - MyOpinion.detail(id)
  - MyOpinion.add(id)
  - MyOpinion.delete(id)



<br>


# Server / Backend


## Models

User model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  images: [{type: String}],
  postalCode: {type:number},
  location: {type:String},
  friends: [{type: Schema.Types.ObjectId,ref:'User'}],
  favoritesPlaces: [{type: Schema.Types.ObjectId,ref:'Place'}]
}
```




Place model

```javascript
 {
   name: {type: String, required: true},
   images: [{type: String}],
   owner: {type: Schema.Types.ObjectId,ref:'User'},
   area: {type: String},
   location: {type: String, required: true},
   locationType: {type: String, required: true, enum[ 'urban', 'rural']},
   inOutDoors: {type: String, required: true, enum[ 'outdoors', 'indoors']},
   bestMomentOfYear: {type: String, required: true, enum[ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November', 'December']},
   description: {type:String, required: true},
   Money: {type:String, enum['free', 'payd']},
   Category: {type:String, required:true, enum['sport', 'leisure', 'summer', 'water', 'sleep', 'eating', 'health', 'winter']},
   likes: [{type: Schema.Types.ObjectId,ref:'User'}]
 }
```



Opinion model

```javascript
{
  description: {type: String},
  rating: {type: number, required: true, enum[0,1,2,3,4,5]},
  place: {type: Schema.Types.ObjectId,ref:'Place'}
  owner: {type: Schema.Types.ObjectId,ref:'User'}
}
```



<br>


## API Endpoints (backend routes)

| HTTP Method | URL                           | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | ---------------------------------- | ----------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `                | Saved session           | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`                     | {name, email, password} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                      | {username, password}    | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`                     | (empty)                 | 204            | 400          | Logs out the user                                            |
| GET         | `/main`                            |                         |                | 400          | Show main private info                                         |
| GET         | `/places`                          |                         |                | 400          | Show all places                                         |
| POST        | `/places/add-place`                | {}                      | 201            | 400          | Create and save a new place                             |
| GET         | `/places/:id`                      | {id}                    |                |              | Show specific place                                     |
| POST        | `/places/:id/add-opinion`          | {}                      | 201            | 400          | Create and save a new opinion for a chosen place                             |
                              |
| GET         | `/settings`                        |                         |                | 400          | show general settings                                                 |
| GET         | `/settings/profile`                | {id}                    |                |              | show current user profile                                         |
| PUT         | `/settings/profile`                | {username,images,postaCode, email, password, friendId, favouritePlacesId} | 200            | 404          | edit current user profile                                                  |
| DELETE      | `/settings/profile`                | {id}                    | 200            | 400          | delete user                                                  |
| GET         | `/settings/my-places`              | {}                      |                |              | show favourite places                                                   |
| GET         | `/settings/my-places/:id`          | {id,placeId}            |                |              | show specific favourite place                                           |
| DELETE      | `/settings/my-places/:id/delete`   | {id,placeId}            | 201            | 400          | delete specific favourite place                                           |
| GET         | `/settings/my-opinions`            | {}                      |                |              | show my opinions                                                    |
| GET         | `/settings/my-opinions/:id`        | {id, placeId}           |                |              | show one of my opinions            |
| PUT         | `/settings/my-opinions/:id`        | {rating,description}    | 200            | 400          | edit one of my opinions                                                    |
| DELETE      | `/settings/my-opinions/:id/delete` | {id}                    | 200            | 400          | delete one of my opinions                                                |


<br>


## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/NILGe4Kq/dogjoy) 

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)








