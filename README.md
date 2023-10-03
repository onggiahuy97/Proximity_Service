# Business Locator API

## Overview

The Business Locator API is a powerful and efficient Express.js application designed to manage and retrieve information about various businesses based on their geographical coordinates. It utilizes PostgreSQL for data storage and retrieval, and integrates with the Google Maps Geocoding API to convert addresses to latitude and longitude coordinates. This project is structured with clean and modular code, ensuring easy maintenance and scalability.

## Features

### 1. **Add a New Business:**
   - **Endpoint:** `POST /api/businesses`
   - **Description:** Allows users to add a new business by providing address, city, state, country, latitude, and longitude.
   - **Validation:** Ensures all required fields are provided.

### 2. **Add a New Business by Address:**
   - **Endpoint:** `POST /api/businesses/address`
   - **Description:** Users can add a new business by providing a full address. The application uses the Google Maps Geocoding API to fetch the latitude and longitude for the address.
   - **Error Handling:** Gracefully handles invalid or incomplete addresses.

### 3. **Retrieve a Single Business:**
   - **Endpoint:** `GET /api/businesses/:id`
   - **Description:** Retrieves detailed information about a business based on its ID.
   - **Error Handling:** Returns an error message if the business is not found.

### 4. **Retrieve All Businesses:**
   - **Endpoint:** `GET /api/businesses`
   - **Description:** Retrieves a list of all businesses stored in the database.

### 5. **Search Businesses within a Radius:**
   - **Endpoint:** `GET /api/search`
   - **Description:** Users can search for businesses within a certain radius based on latitude and longitude.
   - **Validation:** Ensures all required query parameters are provided.

### 6. **Delete a Business:**
   - **Endpoint:** `DELETE /api/businesses/:id`
   - **Description:** Allows users to delete a business based on its ID.

## Error Handling

The API is designed with comprehensive error handling to ensure that meaningful error messages are returned to the client. It handles various scenarios such as missing fields, invalid addresses, and internal server errors, providing clear and concise error messages.

## Getting Started

### 1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/business-locator-api.git

### 2. **Install Dependencies:**
   Navigate to the project directory and install the necessary packages.
   ```bash
   cd business-locator-api
   npm install

## License