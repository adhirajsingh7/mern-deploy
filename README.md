# Ecommerce website

Welcome to our vibrant online marketplace, where shopping meets convenience and choice! Our platform offers a seamless browsing experience across a plethora of categories, including tantalizing food, cutting-edge electronics, stylish furniture, and much more.

This project is crafted with a scalable, maintainable codebase and adheres to the best code architecture practices for React applications.

## Tech Stack

**Client:** React, Material UI, Zustand, Reacy query

**Server:** Node, Express, MongoDB, Passport js.

## Features

- Robust Authentication and Authorization: Secure user access with advanced authentication mechanisms, ensuring data integrity and user privacy.

- Advanced Product Filtering and Sorting: Utilize server-side capabilities to enable efficient filtering and sorting of products, enhancing user experience and navigation.

- Server-Side Pagination: Implement server-side pagination to efficiently handle large datasets, preventing the need to fetch all data at once and enhancing system performance.

- Caching for Improved Performance: Implement caching to minimize unnecessary API requests, optimizing performance by serving cached data when it hasn't changed dynamically.

- Role-Based Dashboards: Tailored dashboards for users, merchants, and administrators, providing distinct functionalities and access levels suited to each role.

- Form Validation and Error Handling: Implement robust form validation techniques and effectively manage server errors, ensuring seamless user interactions and data integrity.

- Multi-Address Management: Enable users to store and manage multiple addresses, facilitating convenient checkout experiences with the option to select from saved addresses.

- Order History and Management: Empower users to track and manage their order history, including the ability to cancel orders when needed, enhancing overall user control and satisfaction.

- Administrative Control: Grant administrators comprehensive control over merchants, including the capability to disable merchant listings, ensuring regulatory compliance and marketplace integrity.

- Product Management for Merchants: Allow merchants to add, update, or delete their products, including essential details such as images, prices, and stock levels, providing flexibility and control over their inventory.

- User Reviews and Management: Enable users to post reviews about products, with options to edit or delete their reviews as needed, fostering user engagement and feedback.

- Dynamic Review Component: Display an interactive review component that showcases the overall rating of products, providing valuable insights to users and enhancing the shopping experience.

## Screenshots

<img width="1440" alt="Screenshot 2024-04-28 at 12 32 34 PM" src="https://github.com/adhirajsingh7/Ecommerce-project/assets/93936555/f0fb119a-186a-43e1-a174-488cc97df705">
<img width="1440" alt="Screenshot 2024-04-28 at 12 40 41 PM" src="https://github.com/adhirajsingh7/Ecommerce-project/assets/93936555/1a760538-0f05-40a6-86a7-cdf71c2285c9">

<img width="1440" alt="Screenshot 2024-04-28 at 12 41 14 PM" src="https://github.com/adhirajsingh7/Ecommerce-project/assets/93936555/cae181bf-72ef-4107-8ad1-021b4b0cf588">

<img width="1440" alt="Screenshot 2024-04-28 at 12 43 09 PM" src="https://github.com/adhirajsingh7/Ecommerce-project/assets/93936555/f2c5823f-2a68-4d22-870d-cfb7eff94603">
<img width="1440" alt="Screenshot 2024-04-28 at 12 49 09 PM" src="https://github.com/adhirajsingh7/Ecommerce-project/assets/93936555/372ec82c-50a8-4d7f-bf18-6a19c3320bed">

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

BACKEND

`APP_PORT`

`MONGODB_URL`

`CORS_ORIGIN`

`CLOUDINARY_CLOUD_NAME`

`CLOUDINARY_API_KEY`

`CLOUDINARY_API_SECRET`

`GOOGLE_CLIENT_ID`

`GOOGLE_CLIENT_SECRET`

FRONTEND

`VITE_BACKEND_URL`

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Go to the server directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Now go to the client directory

```bash
  cd ..
```

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the client

```bash
  npm run dev
```
