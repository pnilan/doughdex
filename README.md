# DoughDex - Pizza Place Tracking and Review Web App

DoughDex is a platform for pizza enthusiasts to track and review their favorite pizza places.

## Table of Contents

- [Introduction](#introduction)
- [Current Features](#current-features)
- [Future Features](#future-features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

DoughDex is a web application developed for pizza enthusiasts who want to keep track of their pizza adventures and share their reviews with others. Users can explore various pizza places, leave reviews, rate the pizza spots, and upload photos of their slices. This application is current in its MVP form. Future feature deployment timeline TBD.

## Curerent Features

- View details of each pizza place, including location on Google Maps
- Interactive and user-friendly interface


## Future Features

- Browse and search for pizza places
- User registration and authentication
- User profile management
- Upload and share photos of pizzas
- Leave reviews and ratings for pizza places

## Technologies Used

![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![image](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![image](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![image](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## Getting Started

To get started with DoughDex, follow these steps:

### Installation

1. Clone this repository to your local machine using:
   ```bash
   git clone https://github.com/your-username/doughdex.git
2. Navigate to the project directory:
    ```bash
    cd doughdex
    ```
3. Install the required dependencies for both the server and client:
    ```bash
    npm install
    ```
4. Seed the database with the provided pizza place data.
    ```bash
    npm run setup:db
    ```

## Configuration

1. Create a `.env` in the root directory and add the following enviornment variables:
    ```
    PGUSER=your_postgresql_user
    PGHOST=your_postgresql_host
    PGPASSWORD=your_postgresql_password
    PGDATABASE=your_postgresql_db_name
    PGPORT=your_postgresql_posrt
    PORT=3001
    DATA_PATH=/path/to/the/data.json
    API_KEY=your_google_maps_api_key
    ```

## Usage

1. Build the client:
    ```bash
    npm run build
    ```
2. Start the server:
    ```bash
    npm start
    ```

## Contributing

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m "Add your message"`
4. Push your changes to your fork: `git push origin feature-name`
5. Create a pull request detailing your changes.

## Licensing

This project is licensed under the [MIT License](https://chat.openai.com/LICENSE).