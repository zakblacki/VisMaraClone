# PostgreSQL to MySQL Migration Guide

## What Changed

Your application has been successfully migrated from PostgreSQL to MySQL. Here's what was updated:

### Code Changes
1. **shared/schema.ts** - Changed from `pgTable` to `mysqlTable` with MySQL-compatible types
2. **server/db.ts** - Updated database driver from `pg` to `mysql2`
3. **drizzle.config.ts** - Changed dialect from `postgresql` to `mysql`
4. **package.json** - Replaced `pg` dependency with `mysql2`

### Key Compatibility Notes
- UUID generation: PostgreSQL's `gen_random_uuid()` → MySQL's `UUID()`
- Integer type: `integer` → `int`
- Arrays: PostgreSQL arrays → JSON text fields (for `additionalFeatures` and `safetyFeatures`)
- All VARCHAR fields now have explicit length (36 for UUIDs)

## Setup Instructions

### Step 1: Update Your .env File
Create or update your `.env` file with the MySQL connection string:

```
DATABASE_URL=mysql://root:@localhost:3306/prodlift
NODE_ENV=production
SESSION_SECRET=your-secret-key-here-change-in-production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
COMPANY_EMAIL=info@fratellivismara.it
```

### Step 2: Import the SQL Schema
You have two options:

#### Option A: Using phpMyAdmin (Easiest for cPanel)
1. Open phpMyAdmin in your cPanel
2. Select the `prodlift` database
3. Click the "Import" tab
4. Upload the `prodlift_schema.sql` file
5. Click "Go" to execute

#### Option B: Using MySQL Command Line
```bash
mysql -u root -p prodlift < prodlift_schema.sql
```
(Leave password blank when prompted if you have no password)

### Step 3: Install Dependencies Locally
```bash
npm install
```

This will install the new `mysql2` driver and remove the old `pg` driver.

### Step 4: Build the Application
```bash
npm run build
```

### Step 5: Upload to cPanel
1. Upload your entire project to `public_html` (or your desired directory)
2. Include the `node_modules` folder to avoid server-side installation

### Step 6: Configure Node.js in cPanel
1. Go to **Setup Node.js App** in cPanel
2. Create a new Node.js application:
   - **App mode**: Select your project directory
   - **App URL**: Your domain
   - **App startup file**: `dist/index.cjs`
   - **Node version**: 18+ recommended
3. Click "Create"
4. Start the application

### Step 7: Verify the Connection
Once deployed, check that:
- The application starts without errors
- Database tables are created
- You can access the admin panel

## Database Schema

The following tables have been created:

- **categories** - Product categories
- **products** - Product listings
- **inquiries** - Contact form submissions
- **elevator_configurations** - Elevator customization sessions
- **platform_configurations** - Platform customization sessions
- **users** - Admin users
- **pdfs** - Product documentation files

All tables use UUID primary keys and include proper foreign key constraints.

## Troubleshooting

### Connection Error: "DATABASE_URL must be set"
- Ensure your `.env` file exists and has `DATABASE_URL` set
- Check the MySQL connection string format: `mysql://username:password@host:port/database`

### Foreign Key Constraint Errors
- Ensure all tables are created in the correct order (categories before products, etc.)
- The SQL file handles this automatically

### UUID Generation Issues
- MySQL 5.7+ supports `UUID()` function
- If using older MySQL, you may need to generate UUIDs in the application

### Array Field Issues
- PostgreSQL arrays are now stored as JSON text in MySQL
- When reading/writing, parse/stringify as needed in your application code

## Rollback (If Needed)

If you need to revert to PostgreSQL:
1. Restore from your git history
2. Switch back to the PostgreSQL branch
3. Update `.env` with PostgreSQL connection string
4. Run `npm install` to restore `pg` dependency

## Performance Considerations

- MySQL may have different performance characteristics than PostgreSQL
- Consider adding indexes for frequently queried fields
- Monitor query performance after deployment
- Use `EXPLAIN` to analyze slow queries

## Next Steps

1. Test all features thoroughly on the staging environment
2. Verify data integrity
3. Set up automated backups
4. Monitor error logs after deployment
5. Consider setting up a CDN for static assets

---

For questions or issues, refer to the Drizzle ORM MySQL documentation:
https://orm.drizzle.team/docs/get-started-mysql
