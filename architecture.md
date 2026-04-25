### User Schema
    name, email, password (hashed)
    role: enum ['Admin', 'Employee']; default 'Employee'


### Tast Schema
    title, description
    status: ['Pending', 'In Progress', 'Completed']; default 'Pending'
    assignedTo: ObjectId (Ref: 'User').
    createdBy: ObjectId (Ref: 'User') - Admin who created it.
    timestamps: true (crucial for showing when tasks were created/updated).

### Tast Schema
   2. Security & Role-Based Access Control (RBAC)

   Interviewers will heavily scrutinize your middleware. Build two distinct middlewares:
   authenticate: Verifies the JWT and attaches the user object to the req.
   authorize(...roles): A factory function that checks if req.user.role is included in the allowed roles

The Access Matrix:
    Admin: Can create tasks, assign them, view all tasks, update any task, and delete tasks.
    Employee: Can only view tasks assigned specifically to them, and can only update the status of
    those tasks. They should not be able to delete tasks or reassign them.


