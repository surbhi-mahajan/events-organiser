## Import dump in mongolabs
> `mongorestore -h ds257551.mlab.com:57551 -d events_db -c events -u events.team -p Qwerty1234 dump/events_db/events.bson`

## Creating dump from mongoose
> `mongodump --host localhost --port 27017 --out ./dump --collection events --db events_db`

## Heroku

> Installation
> `brew install heroku/brew/heroku`

> Login
> `heroku login`
