# wbdv-ticket-project

<b>State the problem you are trying to solve:</b>

Ticket resellers have to manually transfer their tickets once they are sold from ticketmaster to stubhub. We will create a product that will allow users to login to their ticketmaster and stubhub accounts on our website and it will automatically transfer the tickets. It will also update their listings and display when they have sold and how much. 

<b>Include a description of at least two types of users that would use your Web application
For each of the types of users, provide two goals the user would like to achieve with your Web application:</b>

Ticket Reseller: 
The user should be able to add his ticketmaster and stubhub accounts which will automatically add his ticketmaster and stubhub listings. Then will try to match the two listings and display the ones that match. 
<br/><br/>Manager:
Will be able to see resellers and have the ability to add and remove users and their listings. 

<b>State the overall strategy of how you intend to solve the problem</b><br/>
	So first, we will get the user to enter his stubhub and ticketmaster account details. Then using the stubhub api and the account, we will get the listings and monitor which ones have been sold. We will then get the ticketmaster listings information by possibly using web scraping. Then, when a listing has been sold, we will scrape ticketmaster and have scrapy to push a button that will transfer ticketmaster tickets to the stubhub buyer. 
	We will have a script that will run either manually, or if we have time to work on it  a few times a day using an ec2. 
	We will store the listings and the users in the node.js database. 


<b>One of the main requirements is to work with data available from some public, free, Web API. Provide a brief description of the Web API you intend to use</b>

One API we will need to use is the stubhub api. https://developer.stubhub.com/ 
We will need to use this to find the listings that the user has and to see if the listing has been sold and possibly to who it has been sold to. 

