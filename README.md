# QuickHire API

## Setup

1. Clone the repo
2. Run `npm install`
3. Add `.env` file with `MONGO_URI` and `PORT`
4. Run `npm run dev`

## API Endpoints

### Jobs

- `GET /api/jobs` - Get all jobs (supports ?search, ?category, ?location)
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create a job
- `DELETE /api/jobs/:id` - Delete a job

### Applications

- `POST /api/applications` - Submit application
- `GET /api/applications/:job_id` - Get applications for a job using job id
