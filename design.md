# System Design

**How would you handle the situation where your application goes over the rate limiting threshold on Riot Games' API?**

To handle this situation, I would take the following steps:

* Implement rate limiting on our API: This will help ensure that we don't hit the rate limiting threshold on the Riot API and will also help prevent our application from making too many requests in a short amount of time.
* Monitor our API usage and rate limiting as well as Riot API usage and rate limiting 
* Impelment good error handling: we can retry the request after a certain period of time has elapsed or we can implement a backoff strategy where we progressively increase the time between retries.
* Implement a caching strategy: we can cache frequently accessed data, reduce the number of unnecessary API requests.
* Use of websocket to batch request or data updates: treating a page some what like a chat room where everybody would recieve the same information without ne need to individually request updates.
* Webhooks if available to react to changes on the Riot Systems. e.g: when a new match has been recorded. 
* Cron Jobs : Manually ping the Riot for any update

**Using your solution from the question above, tell us what patterns and designs you would use to make this application extensible for any game.**

Microservices architecture: involves breaking down a large application into smaller, independent services that communicate with each other through APIs or events. By using a microservices architecture, we can break down our application into smaller services, each responsible for a specific aspect of the application. This makes it easier to add new features or modify existing ones without affecting the rest of the application.

Event-Driven : Event-driven architecture can help in organizing and scaling our application in a more efficient and flexible way. By following Event-driven architecture principles and designing our application as a set of decoupled components that communicate through events, we can make our application more adaptable to changing requirements and better suited to handle large amounts of data and traffic.

**How would you organize the codebase for all these different components to work together so our system remains maintainable and extensible?**

in the frontend end:

I should design our system in a modular way, where each module has a well-defined interface and can be easily replaced or extended without affecting other modules. This allows us to add new features or modify existing ones without affecting the rest of the codebase.

We can do it at the folder level such as :

Root 
  * Modules 
    * Leaderboard
    * Fantasy
    * Stats
    * admin

Or, we could do it at the infrastructure level with the use of Micro Frontend 

Root (host) '/'
  * Leaderboard  '/leaderboard/*'
  * Fantasy  '/fantasy/*'
  * Stats  '/stats/*'
  * admin  '/admin/*'

where each route is a frontend on its own. Using MonoRepo ( Turborepo) to facilitate code sharing could be handy as well. 

Choosing one or the other or a completly differnt approach would depend on how we would like to struture our team and features. 