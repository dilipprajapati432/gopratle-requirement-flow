# GoPratle Requirement Posting Flow

A clean full-stack requirement posting flow built for the GoPratle Full Stack Development Internship assignment.

## Stack

- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Deployment target: Vercel (frontend), Render/Railway (backend), MongoDB Atlas

## Features

- Four-step requirement posting flow
- Event basics: name, type, date/date range, location, optional venue
- Dynamic category-specific fields for Planner, Performer, and Crew
- Client-side validation
- Backend validation
- MongoDB persistence
- API loading and error states
- Review step before submission
- Responsive UI
- Clean separation between routes, controllers, models, middleware, and frontend components

## Assumptions

The assignment does not prescribe exact category-specific fields. The following practical fields are used:

### Planner
- Event size
- Planning experience
- Services required
- Estimated attendees
- Budget
- Additional requirements

### Performer
- Performance type
- Genre
- Experience
- Performance duration
- Team size
- Budget
- Technical requirements

### Crew
- Crew role
- Number of crew members
- Experience
- Working hours
- Equipment/skills
- Budget
- Additional requirements

These assumptions can be explained during the technical walkthrough.

## Local setup

### 1. Backend

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/gopratle_requirements
CLIENT_URL=http://localhost:3000
```

Start:

```bash
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start:

```bash
npm run dev
```

Open http://localhost:3000

## API

### Health

`GET /api/health`

### Create requirement

`POST /api/requirements`

Example request:

```json
{
  "event": {
    "name": "College Cultural Fest",
    "type": "Cultural Event",
    "startDate": "2026-11-20",
    "endDate": "2026-11-22",
    "location": "Ahmedabad",
    "venue": "University Ground"
  },
  "category": "performer",
  "details": {
    "performanceType": "Live Band",
    "genre": "Rock",
    "experience": "2+ years",
    "duration": "60 minutes",
    "teamSize": 5,
    "budget": 25000,
    "technicalRequirements": "2 microphones and stage monitors"
  }
}
```

## MongoDB flow

```text
Next.js form
    ↓
POST /api/requirements
    ↓
Express route
    ↓
Validation middleware
    ↓
Controller
    ↓
Mongoose model
    ↓
MongoDB
    ↓
201 Created
    ↓
Success UI
```

## Testing checklist

- Planner submission
- Performer submission
- Crew submission
- Required-field validation
- Invalid date range
- API/network failure
- Successful MongoDB insertion
- Responsive layout

## Future improvements

- Authentication and user accounts
- Draft saving
- File attachments
- Admin dashboard
- Search/filtering
- Automated API tests
- Stronger schema validation with Zod/Joi
- Rate limiting and production security hardening
