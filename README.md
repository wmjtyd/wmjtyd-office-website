# wmjtyd Team Website

Welcome to the wmjtyd team website repository. This repository contains the source code for both the backend and frontend of our office website. Below are the instructions for setting up and running the project.

## Team Introduction

The wmjtyd team, established in 2012, is a proficient IT technology team composed of a group of experts passionate about technology. We are dedicated to technological innovation and societal progress, promoting technological development through open-source sharing and collaboration. We specialize in providing big data services, custom software development, and artificial intelligence solutions, including data mining, ERP system customization, and large model integration applications. Our goal is to optimize user experience, enhance business efficiency, and assist clients in achieving digital transformation with advanced technological solutions. Join us in creating a better future.

## Cloning the Repository

To get started, clone the repository using the following command:

```bash
git clone https://github.com/wmjtyd/wmjtyd-office-website.git
```

## Backend Setup

Navigate to the backend directory and install the dependencies:

```bash
cd wmjtyd-office-website/backend
yarn install
```

Start the backend server in development mode:

```bash
yarn develop
```

## Frontend Setup

Navigate to the frontend directory and install the dependencies:

```bash
cd wmjtyd-office-website/frontend
yarn install
```

Start the frontend server in development mode:

```bash
yarn dev
```

## Handling Port Conflicts

If you encounter port conflicts when restarting the servers, use the following commands to kill the processes occupying the ports:

For port 3000 (frontend):

```bash
lsof -i :3000
```

For port 1337 (backend):

```bash
lsof -i :1337
```

This will list the processes using the specified ports. You can then kill the processes using the appropriate PID.

## Additional Notes

- Ensure you have `yarn` installed on your system. If not, you can install it from [here](https://classic.yarnpkg.com/en/docs/install/).
- Make sure to configure any environment variables required for the project. Refer to the project documentation for more details.

Thank you for contributing to the wmjtyd team website. If you have any questions or need further assistance, please contact the project maintainers.

Happy coding!

---
wmjtyd Team

后台: wmjtyd@gmail.com Wmjtyd123456
前端：toyaowu@gmail.com   12345678