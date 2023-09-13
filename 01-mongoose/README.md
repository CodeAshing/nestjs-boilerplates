# NestJS Boilerplate

This is a powerful NestJS boilerplate for building scalable and enterprise-level applications. It includes robust features such as proper logging mechanisms, JWT-based authentication, token caching, and OpenAPI documentation. You can use this boilerplate as a solid foundation for projects that need to scale to millions of users.

## Getting Started

Follow these simple steps to get your project up and running:

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (v18+ recommended)
- MongoDB installed and running
- Git installed
- A code editor of your choice (e.g., Visual Studio Code)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/CodeAshing/nestjs-boilerplates.git
   ```

2. Change to the project directory:

   ```bash
   cd nestjs-boilerplates/01-mongoose
   ```

3. Rename the `env.dev` file to `.env.dev` and update its values according to your configuration needs. The `.env.dev` file is used to store environment-specific variables.

4. Install project dependencies:

   ```bash
   npm install
   ```

### Development

To start the development server, run the following command:

```bash
npm run dev
```

This will launch your NestJS application in development mode.

### Production

For production deployment, you should set up your server using a process manager like PM2, Docker, or your preferred method. Remember to configure the production environment variables in a `.env.prod` file.

## Features

- Proper Logging Mechanism
- JWT-Based Authentication
- Token Caching with Cookies
- OpenAPI Swagger Documentation

## Usage

This boilerplate is equipped with a simple todo app as a sample project, utilizing MongoDB as the database. You can build upon this sample or replace it with your own application logic.

## Documentation

The API documentation is available through Swagger UI. Once your server is running, access it at:

```
http://localhost:4000/v1/swagger
```

## Contributing

We welcome contributions from the community. To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure tests pass.
4. Commit your changes and push to your forked repository.
5. Create a pull request to the main repository.

Please review our [Contributing Guidelines](../CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE.md](../LICENSE.md) file for details.

## Contact

If you have any questions or issues, please feel free to [create an issue](https://github.com/CodeAshing/nestjs-boilerplates/issues) in our repository.
