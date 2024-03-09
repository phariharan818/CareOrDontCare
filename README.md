# CareOrDontCare

Deployed Website: https://careordontcare.onrender.com/

# Abstract
The purpose of this document is to provide a comprehensive overview of the software design for the Care or Don’t Care application. This includes the system overview, design considerations, specifications, detailed design, implementation plan, testing plan, and maintenance plan.

## Executive Summary
### Purpose:
Care or Don’t Care is a dynamic website that provides a platform to gauge users interests in trending topics. With the amount of information and misinformation on the internet in our current digital era, information overload is problematic for many individuals. Care or Don’t Care empowers users to judge their personal interests in various article headlines with ease, encouraging them to only engage with what they are interested in. The site is specifically designed for college students at UW as this population group is most responsive to the current floating topics on social media and in the world today. College students lead hectic lives, juggling classes, work, and their demanding social lives. In the midst of balancing this, finding the time for self-education on global topics, especially ones they are interested in, is a never-ending challenge. Additional details can be found in the PRFAQ in Appendix Section E.

### Scope for Initial Launch:
The initial launch of this application will focus on delivering core functionality aimed at providing college students with the experience of gauging and expressing their interests in trending topics. The users we are targeting are college students. Additional details on personas can be found in the User Personas located in Appendix Section D. Care or Don’t Care introduces an intuitive interface where college students can effortlessly swipe to express their interest or disinterest in specific article headlines. Users can create an account using their credentials, ensuring a secure and personalized experience, with the option to revisit their “cared” topics.

### Target Audience:
The target audience is primarily students of UW campus. Within this, there are subgroups like news enthusiasts, who regularly consume news articles and stay updated on current events and trending topics. There are students, who would be studying media, journalism, or communication and would require access to a diverse range of news articles and topics. Finally there is the general audience, who would enjoy discovering new articles and topics aligned with their interests and preferences, regardless of their profession or background. Additional details on personas can be found in the User Personas located in Appendix Section D.

### Goals:
Care or Don’t Care captivates user engagement by fostering activities that actively solicit user input. The website prioritizes user convenience by the feature of revisiting cared topics, thus promoting easy accessibility. Emphasizing scalability and functionality, our platform delivers seamless performance through accommodating multiple users at once. The website allows for cross-compatibility across diverse electronic systems, including Apple and Windows, guaranteeing a consistent and optimal user experience across various devices.

### Monetization:
We plan on initiating a monetization strategy 6 months post our product launch. The first 6 months (Phase 1) will be used to gather user feedback and implement changes accordingly. We hope to reach and then maintain a NPS score of above 6 before carrying out Phase 2. During Phase 2, we plan to partner with various companies to promote advertisements across our website. There will be an option for users to subscribe for an ad free interface by paying a monthly fee of $4.99.

## System Overview
The Care or Don’t Care application is a web-based platform designed to streamline the process of gauging and expressing user interests in trending topics for a personalized user experience. The application will be built using a combination of HTML, CSS, and JavaScript for the frontend and Node.js and MongoDB in the backend. The website will be hosted on Render.

## Design Considerations
### User-friendly interface:
Upon login, users encounter a user-friendly homepage showcasing article headline listed (eg. “Dune 2 Global Box office tops heights”). Under the article headline, they can read a short 1 to 2 sentence blurb describing the article. They then have the option to click Care or Don’t Care. The users’ Cared articles can be revisited on the care page where navigation simplicity is prioritized, allowing users to click on any article of interest for an in-depth exploration. This ensures there is no overload of information. The intention is to strike a balance, facilitating meaningful engagement without subjecting users to information overload. The site is simple and easy to digest through constant font and color across all topics to ensure an unbiased platform. For example, the Care and Don’t Care buttons will both be in the same color, rather than making one green or red.

### Scalability:
Care or Don’t Care’s scalability involves a server network and strategic system optimization to deliver a seamless user experience. Responsiveness is prioritized through aiming for a minimal 2-second delay between user interactions with any button. In the event of server-related issues, downtime is rigorously controlled, ensuring that server crashes are limited to a temporary maximum of 20 minutes. The system is engineered to withstand high user loads, capable of accommodating at least 100,000 concurrent users without compromising performance speed. This scalability strategy guarantees that the platform remains agile and responsive, even during periods of peak demand, ensuring consistent and reliable service for all users.

### Security Measures:
Confidentiality will be achieved through meticulous control over system access. The sign-in process serves as a gatekeeper, ensuring that information remains restricted to authorized users only. There is a strict policy against selling any user data to third parties, safeguarding users’ privacy. A robust encryption system will be integrated which will work against any attempts at data hacking.

### Compatibility:
Users will be able to operate the website both on iOS and Android devices, whether that be laptop, PC, mobile, etc. We will conduct system testing across multiple browsers such as Chrome and Safari to ensure high efficiency in speed. Additionally, we will ensure responsiveness across different devices to ensure that if the screen size expands or shrinks, the website can adjust accordingly.

### Authentication:
By creating an account using their name, email, and password, users are able to save articles utilizing the Care feature. The website will only let users login if their username and password credentials match. If users choose to not make an account, they can engage with the website as a guest, but not be able to save any articles. The library (msal-node-wrapper) we used to set up authentication is transferable, meaning that if someone else wanted to use it, they easily can by changing certain pieces of information (clientId, tenantId, and secret).

### Authorization:
All valid users will be able to view and interact with content, and save content through the Care feature. No users will be able to create any new content or edit the information visible. No users will be able to see the activity of others on Care or Don’t Care. If the user does not have an account, they will only be able to view and interact with the content, but not save content.

### Roles and Permissions:
- Guests: Limited to viewing public content; no access to interactive features or personalization options.
- Registered Users: Able to view, save, and interact with content within the platform; no authority to create or modify information.
- Moderators: Responsible for overseeing and managing user-generated content; empowered to review, edit, or remove content as necessary.
- Administrators: Comprehensive access to system settings, user management, and content control; can modify roles, permissions, and system configurations.

### KPIs Selection:
Strategic KPIs will judge the success of the website in relation to the turnover for the company. Aspects

| Feature                   | Functional Requirements Description                                                                                                                   | Status     | Theme                         | Epic                                |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|------------|-------------------------------|------------------------------------|
| F1: Homepage Topic Selection (Care/Don’t Care - MVP) | **User Story 1:** As a user, I want to see a randomly selected topic displayed on the homepage such that I can determine topics I care and don’t care about. This is validated by the topic changing upon choosing whether I care about it or not. **User Story 2:** As a user, I want to have the option to indicate whether I care or don't care about the displayed topic so that the system can provide articles related to the topic. This is validated by the presence of 'Care' and 'Don't Care' buttons. | Met        | User Interaction             | Topic Selection on Homepage       |
| F2: Bookmarking Favorite Articles  (MLP)            | **User Story 1:** As a user, I want to have the option to bookmark articles for future reference, such that I can easily access them later. This is validated by the presence of a 'bookmarks' page on the website. **User Story 2:** As a user, I want to view my bookmarked articles so that I can quickly access articles that I favor when needed. This is validated by the presence of a 'bookmarks' page. **User Story 3:** As a user, I want to have the option to remove articles from my bookmarked list so that I can manage my saved content. This is validated by the presence of a 'remove from bookmarks' option on the bookmarks page. | Out of Scope | User Favoriting              | Article Bookmarking               |
| F3: Analytics (Visualization Page - MVP)           | **User Story 1:** As a user, I want to have the option to see a visual representation of my preferences based on whether I indicate “Care” or “Don’t Care” on the home page about article topics. This is validated by the presence of a ‘visualization’ page on the website. **User Story 2:** As a user, I want to see a breakdown of my preferences based on different article topics, to understand what subjects I care the most about. This is validated by the presence of the ‘visualization’ page. | Met        | User Analytics               | Personal Insights                 |
| F4: Suggesting possible “Care” Articles  (MLP)     | **User Story 1:** As a user, I want the website to save, store, and analyze my preferences about article topics to understand what topics I care about. This is validated by the presence of a database to store that information. **User Story 2:** As a user, I want to receive tailored content recommendations on the website based on my indicated preferences to see articles that I would enjoy. This is validated by having tailored articles present on the home page. | Met        | User Recommendations        | Article Suggesting                |
| F5: Care Page, MVP                                 | **Story:** As a user I want to view the topics I have said I care about so that I can learn more about them. **Acceptance:** Navigation to Care page, ability to select and view topic cards. **Story:** As a user I want to view the topics I have said I don’t care about so that I can change my mind about them. **Acceptance:** Navigation to Care page, ability to toggle care/don’t care **Story:** As a user I want to see my recent decisions first so that I can easily find a topic I just said I wanted to learn more about. **Acceptance:** Default sorting history by time **Story:** As a user I want to search for topics I have already viewed to easily find a subject I want to learn more about. **Acceptance:** History search functionality | Met        | Deep Dive                    | View Previous Selections          |
| F6: Bias Analysis (MLP)                            | **Story:** As a user, I want a detailed analysis of source bias next to any article I am presented so that I can learn more about topics I am interested in with knowledge of how a source may present the story differently. **Story:** As a non-user stakeholder, I want a detailed analysis of source bias next to any article shown on the app so there is no way the app would face controversy for pushing a perspective. | Out of Scope | Stay Moral                   | Bias Bar                           |

## Detailed Design

### Communication:
For the success of the website application, effective communication within the different system components is important to ensure a smooth user experience. On the home page, users’ actions of clicking “Care or “Don’t Care '' will be communicated to the care page, so that the user’s care preferences about an article topic will be added and users can see the updated care topics when navigating to the care page. In the edge case of a user misclicking “Care” instead of “Don’t Care”, users should be able to make the appropriate changes and see those changes update in real-time. The home page should also be communicating with a database to keep track of the different topics they have said “Care” or “Don’t Care” to, as well as the number of specific articles they have learned more about within that topic. This is where we access the data to create the visualizations of most cared about topics. Effective communication within the different system components is crucial, seeing as how many of our features rely on information from other features.

### Data/Interface/API Contracts:
The data the “Care or Don’t Care” website uses consists of four main entities: user, article, topic, and visualization. Within the data, there are a couple constraints that exist to be aware of during the data handling stage, such as having a unique userId, a unique email, and adhering to any password requirements. The data contract for user authentication specifies the format of different fields, such as making sure email is in the correct format. Similarly, the interface contract defines the methods for the user authentication which is what allows users to actually log in and out of a system. Another example of a data contract that would be used would be having a unique topicid for the different topics that get presented to the user to select between “Care” or “Don’t Care”. Then, the interface contract would be the actual interaction of clicking care, which means we would store that topicId to be associated with a certain userId to show that preference. The team doesn’t anticipate using an existing API. However, since there probably will be a need to store login information, they anticipate the need to create their own API to handle that user login information. The information that this would entail would be the basic information of name, email, and password, where the password is encrypted to ensure it is being stored in a secure manner.

### Database Schema:
The database schema of this application is crucial when providing the structure and organization of storing and managing the data that is being used. The team’s primary objectives in designing the database schema includes scalability to accommodate future growth, efficient query performance, data integrity mechanisms, and ease of maintenance. The team aims to ensure ACID properties are being met: it is of utmost importance that concurrent users can use the application without any issues being encountered. 
The following entity relationship diagram (ERD) encompasses several entities, or tables, and they each are important in storing and managing the relevant information that leads to this application's functionality.

#### User Entity:
Represents individual users of our application, with attributes crucial for user authentication and identification.
- Attributes: userID, name, email, password
- Relationships: one-to-many relationship with the Article entity: Users can be associated with multiple articles based on their topics of interest.

#### Topic Entity:
Represents different topics of interest within our application.
- Attributes: TopicID, TopicName
- Relationships: one-to-many relationship with the Article entity: Each topic can be associated with multiple articles.

#### Article Entity:
Contains information about the articles present in our application, including their titles, links, and associated images.
- Attributes: ArticleID, ArticleName, Link, Image
- Relationships: many-to-one relationship with the Topic entity: Each article is linked to a single topic, but multiple articles can belong to the same topic.

#### VisualizationData Entity:
Stores visualization preferences for each user, enabling personalized user experiences.
- Attributes: UserID, VisualizationPreferences
- Relationships: one-to-one relationship with the User entity: Each user has a corresponding entry in the VisualizationData table.

### Use Case Sequence Diagram:
[Insert Use Case Sequence Diagram here]

### High Level Component Diagram:
[Insert High Level Component Diagram here]

## Non-Functional Requirements

### Performance (MVP):
- **User Story:** As a user, I want the system to respond quickly to my actions such that I can navigate through the application smoothly. This is validated by achieving a response time of under five seconds for all user interactions.
- **User Story:** As a user, I want the system to handle a large number of concurrent users, such that I don't experience slowdowns or errors during peak usage. This is validated by the system being able to support at least 100 concurrent users without performance declining.

### Availability (MVP):
- **User Story:** As a user, I want the system to be available whenever I need it, such that I can access the application without interruption. This is validated by achieving at least 99.9% uptime.
- **User Story:** As a user, I want the system to schedule maintenance windows during off-peak hours, such that I am not inconvenienced by downtime. This is validated by notifying users in advance and scheduling maintenance during low traffic periods.

### Security (MVP):
- **User Story:** As a user, I want the system to encrypt all sensitive data to protect my privacy such that my information remains secure. This is validated by encrypting sensitive user data both at rest and in transit.
- **User Story:** As a user, I want the system to restrict access to sensitive functionalities based on my role, such that unauthorized users cannot access confidential information. This is validated by implementing role-based access control mechanisms.

### Reliability (MLP):
- **User Story:** As a user, I want the system to handle errors gracefully and provide informative error messages such that I can understand and troubleshoot issues easily. This is validated by displaying user-friendly error statements (i.e. login failed, try again) for users to understand the issue.
- **User Story:** As a user, I want the system to perform regular backups of the database, such that my data is protected against loss or corruption. This is validated by implementing automated backup procedures and conducting periodic recovery tests.

### Scalability (MLP):
- **User Story:** As a user, I want the system to scale horizontally to handle an increase in user traffic and data volume, such that I don't experience performance degradation during peak usage. This is validated by designing the system to support scaling.
- **User Story:** As a user, I want the system to distribute incoming requests evenly across multiple servers, such that the workload is balanced and no single server is overloaded. This is validated by implementing load balancing mechanisms.

## Testing Plan

### Operational Worries, Performance and Monitoring:
Managing potential challenges, such as 404 errors and system failures, becomes a priority, particularly when dealing with invalid links embedded in the code within articles. The team’s approach to implement performance and monitoring to ensure the system performs at its best is to leverage tools such as Grafana and Prometheus to gain insights into system performance, resource utilization, and potential bottlenecks. Grafana provides visualization capabilities, allowing the creation of interactive dashboards that display key metrics in real-time. These metrics include CPU usage, memory consumption, request latency, and throughput, enabling the team to identify performance issues promptly. On the other hand, Prometheus will help in storing time-series data from various components of the application. It will continuously scrape metrics endpoints exposed by the services, allowing for the monitoring of the health and performance of the system comprehensively. Integrating Grafana with Prometheus will allow the creation of custom dashboards tailored to the specific monitoring needs of the application and set up alerts to notify the team of any deviations from predefined thresholds.

### Unit Testing:
This is a critical aspect of the software development process as it ensures the correctness and reliability of individual components within this application. The team plans on employing a multitude of unit tests to validate the behavior of each component in isolation, covering functionalities such as data processing, business logic, and user interface interactions. Each component will undergo testing using the Jest framework, which is the most ideal since the application will be built using JavaScript and Node.js. The main priority with these unit tests is to ensure edge cases, boundary conditions, and error scenarios are covered so that users will not encounter problems when using the application.

### Integration Testing:
This is essential for validating the interactions and collaborations between various subsystems within our application. Unlike unit testing, which focuses on individual components in isolation, integration testing evaluates the behavior of interconnected modules when they perform as a whole. This ensures that different parts of the application work seamlessly together, adhering to specified interfaces and contracts. The testing strategy involves testing end-to-end workflows, user journeys, and system interactions across multiple layers of the application stack. The team plans on simulating real-world scenarios and use cases, exercising critical paths and business processes to verify system functionality and behavior. Integration tests may involve interacting with the database and validating data flow between different layers. The usage of Postman for backend testing and the jest-dom library from React for the front end is critical to ensure these parts work well simultaneously. The main goal with integration testing is to help identify defects early, minimize regressions, and deliver a product that meets user expectations.

### User Research:
This is an important tool in the design process for the site, to get user feedback to validate the proposed design approach. Thus, the team’s goal is to have different approaches within user research that highlight how the design performs during the user testing phase. One tool would be to analyze site metrics after the initial launch to understand how users interact with the site. At this stage, insights on user engagement such as seeing how often a user comes back to the site would be a great metric to look at for initial thoughts. Users who keep frequenting the website show a positive reaction to the site, hence they want to keep coming back to continue engaging with the content. Additionally, looking at site clicks to indicate what features a user may like or dislike. For example, if users only interact with the homepage where they are clicking “Care” or “Don’t Care '' on article topics, may give the team the impression that many users do not particularly enjoy the visualization page. So, seeing if don’t frequent a particular page often, based on site clicks could potentially indicate to the team that there isn’t an overwhelmingly positive reaction about that feature, so it may be beneficial to brainstorm improvements for that and iterate on that. These are great ways to get customer feedback, simply by observing user trends. Another method of user research to use would be Eye Movement Tracking. Using an eye-tracking device to monitor users’ eye movements would tell the team about any patterns or different areas on the website that their user group is naturally drawn to. As a result, it would give great insight into the design of the website, specifically what areas they focus their attention on. This information would help validate their design, seeing if there are specific areas users avoid, if the design is distracting, etc. The main priority with their user research is to gain insights about the website to validate the design and continue to improve upon it as needed.

### User Acceptance Testing:
As “Care or Don’t Care” enters public access and the demand for a deeper and better feature pool grows as it transitions into an MLP, ensuring that any new additions or changes made to app functionality are going to be accepted by the user base is critical. Any change needs to show that it will increase the relevant KPIs. Before any feature is taken from the backlog and integrated, a number of steps need to be taken. First, in addition to the user research conducted during the creation of the feature, the completed feature must go through at least 2 focus groups with minimal to no revisions made, and a positive expected performance based on those tests. Second, the feature must be tested on a smaller section of the user base for at least the minimum time required to collect relevant KPIs (2-6 weeks). Before the feature makes it to release, it must show a marked (>= 10%) increase in KPIs for the tested users. In each of these steps, in addition to KPIs, feedback from customers must be collected directly in the form of interviews (for focus groups) and surveys/short feedback forms (for limited releases). This direct feedback is to be compiled with other relevant sources, presented internally, and approved before the next phase of deployment (ie, before rolling out limited user testing, and before full integration).

## Maintenance Plan

Following Agile principles, the maintenance plan being implemented prioritizes iterative updates, bug fixes, and feature enhancements based on user feedback. The team will maintain a backlog of tasks, regularly reviewing and prioritizing them during sprint planning sessions. Bug fixes and small enhancements will be addressed in short iterations, ensuring quick response to user needs and minimizing downtime.

### Bug Fixing Process:
The first step to handle bugs within the system will be to identify the problem through user reports or manual testing on our end. An example of a problem that could be faced is an outdated algorithm in the code that could cause slowdown of the system as a whole. The team will prioritize the bug based on how severe it is (i.e. security vulnerability) as well as the urgency of the problem (i.e. system down due to high concurrency of users). The second step would be to gather the team together and assign roles during sprint planning, allowing the developers to break down the code into sections to simplify the process of identifying the error. The third step will be to fix the error by either identifying the issue through the testing carried out, which allows them to correct the error. Additional tests would be put in place to ensure such a problem doesn’t happen again. The fourth step is to redeploy the application again, ensuring the rest of the code fits perfectly into the changed criteria. Finally, the team would test the code on the website to judge the change in user accessibility and functionality before rolling it into the production environment.

### Feature Enhancement Process:
The website will have built in pop ups that notify users of updates made on the website regarding its UI, thus maintaining user satisfaction. The team also plans on conducting market research to compare existing features in other products similar to ours, which allows a better idea of how to approach the new features that can be implemented. Once this information is gathered, the team would need to break it down into requirements and tasks, which will be created into a backlog. There will be a tracking method within the scrum that keeps a record of updates and their status relative to a list of tasks.

## Conclusion
This software design documentation provides a comprehensive overview of the Care or Don’t application design. It includes the system overview, design considerations, specifications, detailed design, implementation plan, testing plan, and maintenance plan. Any revisions to this document will be recorded below.

