#!/usr/bin/env tsx

/**
 * Database Setup Script
 * This script sets up the database by:
 * 1. Checking if DATABASE_URL is set
 * 2. Pushing the schema to the database (creates/updates tables)
 * 3. Optionally seeding the database with sample data
 */

import { execSync } from 'child_process';
import { config } from 'dotenv';
import { db } from './db';
import { categories } from '@shared/schema';

// Load environment variables
config();

const DATABASE_URL = process.env.DATABASE_URL;

async function setupDatabase() {
    console.log('🚀 Starting database setup...\n');

    // Step 1: Check DATABASE_URL
    if (!DATABASE_URL) {
        console.error('❌ Error: DATABASE_URL environment variable is not set');
        console.log('\n📝 To fix this:');
        console.log('1. Copy .env.example to .env: cp .env.example .env');
        console.log('2. Edit .env and set your DATABASE_URL');
        console.log('3. Run this script again\n');
        process.exit(1);
    }

    console.log('✅ DATABASE_URL is set');
    console.log(`📍 Database: ${DATABASE_URL.split('@')[1] || 'configured'}\n`);

    // Step 2: Push schema to database
    try {
        console.log('📦 Pushing database schema...');
        execSync('npm run db:push', {
            stdio: 'inherit',
            env: { ...process.env, DATABASE_URL }
        });
        console.log('✅ Schema pushed successfully\n');
    } catch (error) {
        console.error('❌ Error pushing schema:', error);
        process.exit(1);
    }

    // Step 3: Check if database needs seeding
    try {
        console.log('🔍 Checking if database needs seeding...');
        const existingCategories = await db.select().from(categories);

        if (existingCategories.length > 0) {
            console.log('✅ Database already contains data');
            console.log(`   Found ${existingCategories.length} categories`);
            console.log('\n💡 To reseed, drop the tables first or clear the data manually\n');
        } else {
            console.log('📝 Database is empty, seeding with sample data...');
            execSync('npm run db:seed', {
                stdio: 'inherit',
                env: { ...process.env, DATABASE_URL }
            });
            console.log('✅ Database seeded successfully\n');
        }
    } catch (error) {
        console.error('❌ Error checking/seeding database:', error);
        process.exit(1);
    }

    console.log('🎉 Database setup complete!\n');
    console.log('Next steps:');
    console.log('  - Run `npm run dev` to start the development server');
    console.log('  - Visit http://localhost:5000 to view the application\n');

    process.exit(0);
}

setupDatabase().catch((error) => {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
});
