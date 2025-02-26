# OVERVIEW

An example of BFF architecture using a Nest.js/Node backend and a Next.js/React/Node frontend.

## INSTALLATION

1. **Clone the repository:**
   * Open Git Bash.
   * Navigate to the directory where you want to store the project.
   * Clone the repository: `git clone git@github.com:andrewmelvin-dev/bff-next-nest-example.git`

2. **Navigate to the project directory:**
   * `cd bff-next-nest-example`

3. **Install backend:**
   * Navigate to the backend directory: `cd backend`
	 * Install the required node modules: `npm install`

4. **Install frontend:**
   * Navigate to the frontend directory: `cd ../frontend`
	 * Install the required node modules: `npm install`

## BACKEND

This is a simple backend app that serves transaction data defined in code, customising it for certain front-ends (web
or mobile). If I were to implement this in a real system I would use an alternative to removing certain fields in the
map function, such as customising the select statement run on the database or using data transfer objects to map data
into a new format (a better approach if a caching layer is being used).

Clustering is used for horizontal scaling of the backend - not that it is needed in a local environment! But the code
is there to prove the concept works.

### Backend testing

In bash navigate to the backend directory and then run `npm run start`. Then visit http://localhost:3000/transactions in a browser. The expected response is:
`[{"transactionType":"deposit","amount":100,"description":"pay"},{"transactionType":"withdrawal","amount":39,"description":"rent"},{"transactionType":"withdrawal","amount":11,"description":"groceries"},{"transactionType":"withdrawal","amount":1}]`

The mobile response can be tested by using the Chrome DevTools Network Conditions tab to set the following custom user agent before refreshing the page:
`Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/537.36`

The expected response for mobile is:
`[{"transactionType":"deposit","amount":100},{"transactionType":"withdrawal","amount":39},{"transactionType":"withdrawal","amount":11},{"transactionType":"withdrawal","amount":1}]`

## FRONTEND

This is a simple frontend app using Next.js and React to render a list of transactions from the backend API. The
X-Custom-User-Agent header is used to simulate a change to the frontend environment i.e. toggling between a web and a
mobile interface. The mobile interface will not be sent the 'description' property, and if this is the case then React
will replace that value with 'unknown'.

### Frontend testing

In a separate git bash window, navigate to the frontend directory and then run `npm run dev`. Then visit http://localhost:3001 in a browser.
