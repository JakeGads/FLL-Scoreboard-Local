## Setup

all node modules exist in the main file directory and should be installable via `npm i` to install package. 

If you are still receiving errors please `npm i` from the server folder as well to gain API capabilities.

## Running the application

The application can be run using the command `npm run server` this will start an angular development server alongside api server, hosted on ports 4200 (default) & 4201 respectively.

if port 4201 is taken from another process (it is open by default) you can change what port is being used but it must be edited in 2 locations. The first is in `src\app\urls.ts` replace the string `export let api_direction = "http://localhost:4201/"` with an port of your choice. 

The other place is `server\server.ts` please change the `const port = 4201` value so that it matches the value above.

angular has it own way of handling port usage and I know of any way to change it.

at this point changing re running `npm run server` should allow the application to run.

## Using the application

with any modern web browser (anything except internet explorer) navigate to [http://localhost:4200](http://localhost:4200) which will bring up the front end. 

Like any other website use the navbar to move to different parts of the page where necessary the definitions of the page are listed out but the most import parts for first time usage is the settings page.

### Settings page

You can edit some values stored here and used throughout the application 

#### Time

the value used for timer clicking on the button allows you to change it to other distinct things

#### Top Scores

It will change the amount of highscores used to calculate the average, 0 is all scores, 1 is only the top score

#### Clear Teams

This wipes the scoreboard entirely and removes all teams. This is should be avoided but is needed for the app.

#### File upload

Attach a .csv file with lists of numbers and names of the teams competing

#### Manual Team adding

Allows you to add Teams during the run time of the application. 


### Board && Admin Page

The admin page allows you to add scores to the dataset while also seeing the timer and the scoreboard

#### Data Entry

When adding scores to the team there will first be a check to see if the team exists in the data set by checking their team number, if the team doesn't exist you must first add them in the manual team adding section 

#### Board

The board runs by itself and you do not have to worry about editing it in any way it should be stated that in the case of a tie the board will choose the winner based on whoever has the largest score and if that is also a draw whomever has the largest team number

#### Timer

The timer gets its time from the setting in the settings page, it does do an exact count so that means that for the first second there is a slight a hang up in the display but it does measure the exact time that has been given to it