## Prerequisites
- [Node.js](https://nodejs.org/en/)
- Docker
- Docker-compose

## Installation
1. Clone the repository
```bash
git clone
```

2. change directory to the project folder

3. Add .env file to client folder
```
VITE_SERVER_URI = "http://localhost:3000"
```

4. Add .env file to server folder
```bash
NODE_ENV=dev
PORT=3000

NAME= "pdf_generator"
```

5. run using docker-compose
```bash
docker-compose up
```

6. Open http://localhost:3000 in your browser
