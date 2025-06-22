# 🔌 API Documentation - MADK Travel Blog Backend

## 🎯 Overview

The MADK Travel Blog backend provides authentication services and API endpoints for the family travel blog. All API endpoints require authentication except for the login flow.

**Base URL (Development):** `http://localhost:3001`  
**Base URL (Production):** `https://madk-travel-blog.kandan4.xyz`

## 🔐 Authentication

### Authentication Flow
1. User visits protected page
2. Frontend checks authentication status
3. If not authenticated, redirect to `/login`
4. User clicks "Continue with Google"
5. Backend handles OAuth flow with Google
6. On success, user is redirected back with session

### Session Management
- **Session Duration:** 24 hours
- **Storage:** Redis (production) / Memory (development)
- **Security:** HTTP-only cookies, secure in production

## 📋 API Endpoints

### Health & Status

#### `GET /health`
**Description:** Check server health and status  
**Authentication:** Not required  
**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-06-22T10:30:00.000Z",
  "environment": "development"
}
```

#### `GET /auth/status`
**Description:** Check user authentication status  
**Authentication:** Not required  
**Response (Authenticated):**
```json
{
  "authenticated": true,
  "user": {
    "name": "John Doe",
    "email": "john@gmail.com",
    "photo": "https://lh3.googleusercontent.com/..."
  }
}
```
**Response (Not Authenticated):**
```json
{
  "authenticated": false,
  "loginUrl": "/auth/google"
}
```

### Authentication Endpoints

#### `GET /auth/google`
**Description:** Initiate Google OAuth flow  
**Authentication:** Not required  
**Behavior:** Redirects to Google OAuth consent screen

#### `GET /auth/google/callback`
**Description:** Google OAuth callback endpoint  
**Authentication:** Handled by Google  
**Behavior:** 
- Success: Redirects to frontend with session
- Failure: Redirects to `/auth/failure`

#### `GET /auth/failure`
**Description:** Authentication failure handler  
**Authentication:** Not required  
**Behavior:** Redirects to frontend login with error parameter

#### `POST /auth/logout`
**Description:** Logout user and destroy session  
**Authentication:** Required  
**Response:**
```json
{
  "message": "Logged out successfully"
}
```

### Protected Endpoints

#### `GET /api/verify-access`
**Description:** Verify user has access to the application  
**Authentication:** Required  
**Response:**
```json
{
  "access": true,
  "user": {
    "name": "John Doe",
    "email": "john@gmail.com",
    "photo": "https://lh3.googleusercontent.com/..."
  },
  "message": "Access granted to family member"
}
```

## 🔒 Security

### Rate Limiting
- **Window:** 15 minutes
- **Max Requests:** 100 per IP
- **Response:** HTTP 429 Too Many Requests

### Headers
```http
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer-when-downgrade
```

### CORS
- **Development:** `http://localhost:3000`
- **Production:** `https://madk-travel-blog.kandan4.xyz`
- **Credentials:** Enabled

## 📝 Request/Response Examples

### Check Authentication Status
```bash
curl -X GET http://localhost:3001/auth/status \
  -H "Cookie: connect.sid=s%3A..." \
  -H "Content-Type: application/json"
```

### Logout
```bash
curl -X POST http://localhost:3001/auth/logout \
  -H "Cookie: connect.sid=s%3A..." \
  -H "Content-Type: application/json"
```

### Verify Access
```bash
curl -X GET http://localhost:3001/api/verify-access \
  -H "Cookie: connect.sid=s%3A..." \
  -H "Content-Type: application/json"
```

## ⚠️ Error Responses

### Standard Error Format
```json
{
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

### Common HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| `200` | OK | Request successful |
| `401` | Unauthorized | Authentication required |
| `403` | Forbidden | Access denied |
| `404` | Not Found | Endpoint not found |
| `429` | Too Many Requests | Rate limit exceeded |
| `500` | Internal Server Error | Server error |

### Authentication Errors

#### `401 Unauthorized`
```json
{
  "authenticated": false,
  "message": "Authentication required",
  "loginUrl": "/auth/google"
}
```

#### `403 Email Not Authorized`
When user's email is not in the family whitelist:
- Redirects to frontend with `?error=unauthorized`
- User sees: "Sorry, your email is not authorized for family access"

## 🔧 Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_CLIENT_ID` | Yes | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Yes | Google OAuth client secret |
| `ALLOWED_EMAILS` | Yes | Comma-separated family emails |
| `SESSION_SECRET` | Yes | Session encryption secret |
| `FRONTEND_URL` | Yes | Frontend application URL |
| `BACKEND_URL` | Yes | Backend API URL |
| `REDIS_URL` | No | Redis connection string |
| `NODE_ENV` | No | Environment (development/production) |
| `PORT` | No | Server port (default: 3001) |

### Example Configuration
```env
GOOGLE_CLIENT_ID=123456789-abc.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123def456
ALLOWED_EMAILS=dad@gmail.com,mom@gmail.com,kid@gmail.com
SESSION_SECRET=super-secret-random-string
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001
```

## 🐛 Troubleshooting

### Common Issues

#### OAuth Errors
- **redirect_uri_mismatch:** Update Google Console URLs
- **invalid_client:** Check client ID/secret
- **access_denied:** User denied permission

#### Session Issues
- **Session not persisting:** Check cookie settings
- **Frequent logouts:** Verify session secret
- **Redis connection:** Check Redis container status

#### Access Denied
- **Email not authorized:** Update `ALLOWED_EMAILS`
- **Case sensitivity:** Emails are normalized to lowercase
- **Typos:** Verify email addresses exactly

### Debug Endpoints

#### Development Mode
When `NODE_ENV=development`, additional debug information is provided in error responses.

#### Logs
```bash
# View backend logs
docker compose logs -f backend

# View all logs
docker compose logs -f
```

## 📊 Monitoring

### Health Check
The `/health` endpoint provides basic server status:
- ✅ Server is running
- ✅ Environment information
- ✅ Timestamp for uptime tracking

### Session Monitoring
- Track active sessions via Redis
- Monitor session duration
- Detect unusual login patterns

### Performance Metrics
- Response times
- Error rates
- Authentication success/failure rates
- Rate limiting triggers

---

*For implementation details, see the source code in `backend/server.js`*
