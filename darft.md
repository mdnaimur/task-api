src/
├── app.js
├── server.js
├── routes/
│   ├── task.routes.js
│   └── auth.routes.js
├── controllers/
│   ├── task.controller.js
│   └── auth.controller.js
├── services/
│   └── task.service.js
├── repositories/
│   ├── task.repository.js
│   └── user.repository.js
├── middleware/
│   ├── authenticate.js
│   ├── authorize.js
│   └── error-handler.js
├── errors/
│   └── AppError.js
└── db/
    └── pool.js




---

routes/
→ Endpoint definitions

controllers/
→ HTTP request/response

services/
→ Business rules/workflows

repositories/
→ PostgreSQL access

middleware/
→ Request pipeline concerns

errors/
→ Application error definitions

db/
→ Database connection
