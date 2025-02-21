# Censys Take Home Test for Front End Software Engineers

## Prompt
- Create a barebones version of [this page](https://search.censys.io/search?resource=hosts) displaying various hosts whose data has been collected by Censys
- Include the IP address and an list of aggregated counts of protocols for each host
- Allow filtering by plain text with a text field
- Use a button/link to load more results

# How to run
## Clone the repo

## Set up API Key
_Create a .env file and populate it with the following from your Censys Search Account_
```
API_ID=<secret>
API_PASSWORD=<secret>
```

## Install packages
_I used pnpm and enjoy its speed, but feel free to use other package managers for any of the following commands; you'll just need to remove the pnpm-lock.yaml first_
```
pnpm i
```

## Run Prod Preview
```
pnpm run build
pnpm run preview
```

## Run Dev Server
_Due to Strict Mode, React will run the useEffect() in `<HostList/>` twice in Dev, causing duplicate load of the first page of results on first page load_
```
pnpm run dev
```

# Functionality
- The app loads the first five hosts (IPv4 and IPv6, Virtual and non-virtual) from Censys's `v2/hosts/search` endpoint. I limited the page size so it's quick to see the results of loading multiple additional pages and that typing a query returns a different set of hosts
- You can load more with the button at the bottom, which sends out an additional call to the API with the next cursor from the previous call
- You can filter for hosts via plain text using the text box at the top - no need to press enter; once you stop typing the new call will be sent out with your query as the q param
    - You can load more pages for each query, but changing queries resets the item count to the first 5 of the new dataset

# Things considered beyond basic functionality

## Accessibility
- I used semantic html for the lists, and added a basic label for the text input
- Though the text is a little redundant, the header hierarchy is intact
- I checked that tab navigation works and the both the input and button have a clear visual highlight
- I checked the app with WAVE, and fixed an issue regarding missing page regions

## Performance
- Implementing a debounce on typing in the query input lets us run the query only once the user is dont typing, without having to have a submit button
- I manually checked the Network tab to make sure there were no unexpected calls to the API
- I took a look at the performance tab and saw the high-level metrics were generally in the green

## Modularity
- Even though the project is simple, I broke out the `<HostCard/>` component to render each host, and also moved the fetch logic into a dummy "service." If the app were to keep growing, we could add more related logic into the same file or additional files in the services folder

# What I would do next if given more time

## Check and Improve performance
- I'd check to see if we can further optimize FCP and TTI and layout shifting
- The way I'm grabbing the fields we need from the API could be improved. GraphQL is one option; adding a resolver could get us just the ip address and aggregate the list of services by count per `extended_service_name` in one fell swoop

## Further Improve accessbility
- I would add more complex aria landmarks
- I would manually test the page with accessibility tools like screen readers
- I'd add a more robust dark and light most as well as a high contrast mode and a way to switch between them, for those with visual differences

## Improve Testing
- Mocking external services and async functionality has been a growth area for me. I got the basics covered in the time limit, but if given more time, I'd add more unit tests to cover edge cases - e.g. handling malformed data, empty states, etc. 
- I'd do cross-browser and -device testing either manually or through a service that has a farm of devices
- Once the app got more complex, I'd add integration and E2E tests
- Once the app got more complex, visual testing via snapshots might be useful as well

## Styling
- Having more time, but also having more access to business needs and product styling norms in a real-world use case would inform the way I'd style this page
- There are so many ways we could accomplish this, either with keyword-based tools like Tailwind, or by building our own style library. At my last position I helped maintain a styling library based on MUI, which allowed us to keep components encapsulated with their own styling in the same file, which definitely had its benefits

## User Experience
- While implementing the `query` and `loadMore` functionality, my solution to get them to work together was to clear additional pages when changing the query so we didn't get into a weird state requesting a non-existent dataset identifier with a query it doesn't go with. I'm wondering if it would be a good user experience to keep the same numebr of items out when you change the query. Perhaps it wouldn't be, but with more time, I think this could use exploring.
- With the limited data the app is displaying, it's hard to understand why each host is coming up for the typed query - if I continued to work on this, I'd love to display and visually highlight the field that matches to make it clear to the user
