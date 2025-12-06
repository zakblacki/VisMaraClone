# Admin Panel Setup Guide

## Demo Admin Credentials

**Username:** `admin`  
**Password:** `admin123`

## Setting Up Admin User

### 1. Create Admin User in Database

Run this command to create the admin user:

```bash
npm run db:setup
```

This will create the default admin user with hashed password.

### 2. Manual Database Setup (Alternative)

If you need to create admin manually, connect to your PostgreSQL database and run:

```sql
-- Using bcrypt hash for 'admin123'
INSERT INTO users (username, password) 
VALUES ('admin', '$2b$10$rKZvVqZ5YqZ5YqZ5YqZ5YeZvVqZ5YqZ5YqZ5YqZ5YqZ5YqZ5YqZ5Y');
```

## Admin Authentication Protection

### Current Status
- Admin panel is accessible at `/admin`
- No authentication required yet (needs implementation)

### To Implement Authentication:

1. **Add Login Page** (`client/src/pages/admin-login.tsx`)
2. **Add Auth Context** (`client/src/contexts/auth-context.tsx`)
3. **Protect Admin Routes** in `App.tsx`
4. **Add Session Management** in backend

### Quick Implementation:

#### Step 1: Create Protected Route Component

```tsx
// client/src/components/protected-route.tsx
import { useEffect } from "react";
import { useLocation } from "wouter";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  const isAuthenticated = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
```

#### Step 2: Update App.tsx

```tsx
import { ProtectedRoute } from "@/components/protected-route";

// In Router component:
<Route path="/admin" component={() => (
  <ProtectedRoute>
    <AdminDashboard />
  </ProtectedRoute>
)} />
```

## Changing Admin Password

### Method 1: Using bcrypt in Node.js

```javascript
const bcrypt = require('bcrypt');
const newPassword = 'your-new-password';
const hash = bcrypt.hashSync(newPassword, 10);
console.log(hash);
```

### Method 2: Update in Database

```sql
UPDATE users 
SET password = '$2b$10$NEW_HASH_HERE' 
WHERE username = 'admin';
```

## Security Best Practices

1. **Change default password immediately**
2. **Use environment variables** for sensitive data
3. **Implement rate limiting** on login endpoint
4. **Add CSRF protection**
5. **Use HTTPS** in production
6. **Implement session timeout**
7. **Add audit logging** for admin actions

## Email Configuration for Notifications

Update `.env` file:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
COMPANY_EMAIL=info@fratellivismara.it
```

### Gmail Setup:
1. Enable 2-factor authentication
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use App Password in SMTP_PASS

## Testing Email Functionality

```bash
# Test contact form
curl -X POST http://localhost:3000/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "Test message"
  }'

# Test newsletter
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```
